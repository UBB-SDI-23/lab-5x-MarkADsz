from django.db.models import Avg
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from animalshelter.models import CareTakers, Departments
from animalshelter.serializers import CareTakerSerializer, CareTakerSerializerDetail, CareTakerDTOSerializer


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