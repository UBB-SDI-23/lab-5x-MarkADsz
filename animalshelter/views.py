from django.http import JsonResponse
from .models import ShelteredAnimals
from .serializers import ShelteredAnimalsSerializers
from .serializers import ShelteredAnimalsSerializerDetail
from .models import Departments
from .models import CareTakers
from .models import TakeCare
from .serializers import DepartmentSerializer
from .serializers import DepartmentSerializerDetail
from .serializers import CareTakerSerializer
from .serializers import CareTakerSerializerDetail
from .serializers import TakeCareSerializer
from .serializers import TakeCareSerializerDetail
from .serializers import CareTakerDTOSerializer
from .serializers import DepartmentDTOSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from django.db.models import Avg, Count, OuterRef, Subquery, Q, Case, When, \
    IntegerField, Exists
from rest_framework import generics


#########################################################___ANIMALS___#########################################################
@extend_schema(responses=ShelteredAnimalsSerializers)
@api_view(['GET', 'POST'])
def animal_list(request):

    if request.method == 'GET':
        "get all drinks, serialize them  return json"
        animals=ShelteredAnimals.objects.all()
        serializer=ShelteredAnimalsSerializers(animals,many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer=ShelteredAnimalsSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors)
@extend_schema(responses=ShelteredAnimalsSerializerDetail)
@api_view(['GET', 'PUT', 'DELETE'])
def animal_detail(request , id):
    try:
        animal=ShelteredAnimals.objects.get(pk=id) #GETS FROM url
    except ShelteredAnimals.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer=ShelteredAnimalsSerializerDetail(animal)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer=ShelteredAnimalsSerializerDetail(animal,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        animal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
#########################################################___DEPARTMENTS___#########################################################
@extend_schema(responses=DepartmentSerializer)
@api_view(['GET', 'POST'])
def department_list(request):

    if request.method == 'GET':
        "get all drinks, serialize them  return json"
        departments=Departments.objects.all()
        serializer=DepartmentSerializer(departments,many=True)
        return Response(serializer.data)

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

#########################################################___CARETAKERS___#########################################################
@extend_schema(responses=CareTakerSerializer)
@api_view(['GET', 'POST'])
def caretaker_list(request):

    if request.method == 'GET':
        years_of_experience = request.query_params.get('years_of_experience_greater_than', None)
        if years_of_experience is not None:
            caretakers = CareTakers.objects.filter(yearsExperience__gt=years_of_experience)
        else:
            caretakers = CareTakers.objects.all()
        "get all drinks, serialize them  return json"
        #caretakers=CareTakers.objects.all()
        serializer=CareTakerSerializer(caretakers,many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer=CareTakerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors)

@extend_schema(responses=CareTakerSerializerDetail)
@api_view(['GET', 'PUT', 'DELETE'])
def caretaker_detail(request , id):
    try:
        caretaker=CareTakers.objects.get(pk=id) #GETS FROM url
    except Departments.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer=CareTakerSerializerDetail(caretaker)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer=CareTakerSerializerDetail(caretaker,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        caretaker.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#########################################################___TAKECARE___#########################################################

@extend_schema(responses=TakeCareSerializer)
@api_view(['GET', 'POST'])
def takecare_list(request):

    if request.method == 'GET':
        "get all drinks, serialize them  return json"
        takecare=TakeCare.objects.all()
        serializer=TakeCareSerializer(takecare,many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer=TakeCareSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)

@extend_schema(responses=TakeCareSerializerDetail)
@api_view(['GET', 'PUT', 'DELETE'])
def takecare_detail(request , id):
    try:
        takecare=TakeCare.objects.get(pk=id) #GETS FROM url
    except TakeCare.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer=TakeCareSerializerDetail(takecare)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer=TakeCareSerializerDetail(takecare,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        takecare.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#########################################################___CARETAKER SORTED AVERAGE___#########################################################

class CareTakerAvgDTO:
    def __init__(self, firstName, lastName, department_id,yearsExperience,isVolunteer, avg_years_experience):
        self.firstName = firstName
        self.lastName = lastName
        self.department_id = department_id
        self.yearsExperience=yearsExperience
        self.isVolunteer=isVolunteer
        self.avg_years_experience = avg_years_experience

def get_average_years_experience():
    return CareTakers.objects.all().aggregate(Avg('yearsExperience'))['yearsExperience__avg']

@extend_schema(responses=CareTakerDTOSerializer)
@api_view(['GET'])
def caretaker_list_ordered_by_avg_years_experience(request):
    caretakers = CareTakers.objects.all()
    avg_years_experience = get_average_years_experience()
    caretaker_dtos = []
    for caretaker in caretakers:
        caretaker_dto = CareTakerAvgDTO(
                firstName=caretaker.firstName,
                lastName=caretaker.lastName,
                department_id=caretaker.department_id,
                yearsExperience=caretaker.yearsExperience,
                isVolunteer=caretaker.isVolunteer,
                avg_years_experience=avg_years_experience
            )
        caretaker_dtos.append(caretaker_dto)
    caretaker_dtos_sorted = sorted(caretaker_dtos, key=lambda x: x.yearsExperience)
    serializer = CareTakerDTOSerializer(caretaker_dtos_sorted, many=True)
    return Response(serializer.data)

#########################################################___DEPARTMENTS SORTED NR CARETAKERS___#########################################################
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

# def get_dep_caretakers():
#     return Departments.objects.values().annotate(count_caretakers=Count('departmentCareTakers__department'))

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
##############################################################___BULK ADD___############################################################################################

@extend_schema(responses=TakeCareSerializer)
@api_view(['POST'])
def add_bulk_caretakers_to_animal(request,id):
    if request.method == 'POST':
        data = request.data
        newitems=[]
        for item in data:
            caretaker_id = item.get('caretaker')
            caring_months = item.get('caringMonths')
            shift = item.get('shift')
            newtakecare=TakeCare.objects.create(
                animal= ShelteredAnimals.objects.get(id=id),
                caretaker=CareTakers.objects.get(id=caretaker_id),
                caringMonths=caring_months,
                shift=shift
            )
            newtakecare.save()
            newitems.append(newtakecare)
        serializers=TakeCareSerializer(newitems,many=True)
        return Response(serializers.data)
