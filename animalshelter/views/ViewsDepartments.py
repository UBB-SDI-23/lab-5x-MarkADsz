from django.db.models import Count, Avg
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from animalshelter.models import Departments, CareTakers
from animalshelter.serializers import DepartmentSerializer, DepartmentSerializerDetail, DepartmentDTOSerializer

from .Pagination import CustomPagination


@extend_schema(responses=DepartmentSerializer)
@api_view(['GET', 'POST'])
def department_list(request):

    if request.method == 'GET':
        "get all drinks, serialize them  return json"
        departments=Departments.objects.all()
        paginator= CustomPagination()
        paginated_departments=paginator.paginate_queryset(departments,request)
        serializer=DepartmentSerializer(paginated_departments,many=True)
        return paginator.get_paginated_response(serializer.data)

    if request.method == 'POST':
        serializer=DepartmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors)


@extend_schema(responses=DepartmentSerializerDetail)
@api_view(['GET', 'PUT', 'DELETE'])
def department_detail(request , id):
    try:
        department=Departments.objects.get(pk=id) #GETS FROM url
    except Departments.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer=DepartmentSerializerDetail(department)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer=DepartmentSerializer(department,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        department.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DepCareTakersNrDTO:
    def __init__(self,departmentName, speciality, nrOfAnimals,nrOfPersonnel,availablePlaces, avg_caretakers,nr_caretakers,current_caretakers):
        self.departmentName = departmentName
        self.speciality = speciality
        self.nrOfAnimals = nrOfAnimals
        self.nrOfPersonnel=nrOfPersonnel
        self.availablePlaces=availablePlaces
        self.avg_caretakers=avg_caretakers
        self.nr_caretakers = nr_caretakers
        self.current_caretakers=current_caretakers


@extend_schema(responses=DepartmentDTOSerializer)
@api_view(['GET'])
def departments_ordered_by_caretakers(request):
    departments=Departments.objects.annotate(count_caretakers=Count('departmentCareTakers__department'))
    #avg_caretakers = Departments.objects.all().aggregate(Avg('departmentCareTakers'))['departmentCareTakers__avg']
    avg_caretakers=departments.aggregate(Avg('count_caretakers'))['count_caretakers__avg']
    caretakers=CareTakers.objects.all()
    department_dtos = []
    caretindep=[]
    for department in departments:
        caretindep = []
        for caret in caretakers:
            if caret.department_id== department.id:
                caretindep.append(caret)
        department_dto = DepCareTakersNrDTO(
            departmentName=department.departmentName,
            speciality=department.speciality,
            nrOfAnimals=department.nrOfAnimals,
            nrOfPersonnel=department.nrOfPersonnel,
            availablePlaces=department.availablePlaces,
            avg_caretakers=avg_caretakers,
            nr_caretakers=department.count_caretakers,
            current_caretakers=caretindep
        )
        department_dtos.append(department_dto)
    department_dtos_sorted = sorted(department_dtos, key=lambda x: x.nr_caretakers)
    serializer = DepartmentDTOSerializer(department_dtos_sorted, many=True)
    return Response(serializer.data)


@extend_schema(responses=DepartmentSerializer)
@api_view(['GET'])
def departments_autocomplete(request):
    serializer_class = DepartmentSerializer
    query = request.query_params.get('query', None)
    if query:
        departments = Departments.objects.filter(departmentName__icontains=query).order_by('departmentName')[:20]
    else:
        departments = Departments.objects.all()[:20]
    serializer = DepartmentSerializer(departments, many=True)
    return Response(serializer.data)