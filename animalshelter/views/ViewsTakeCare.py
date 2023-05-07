from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from animalshelter.models import TakeCare, ShelteredAnimals, CareTakers
from animalshelter.serializers import TakeCareSerializer, TakeCareSerializerDetail
from .Pagination import CustomPagination

@extend_schema(responses=TakeCareSerializer)
@api_view(['GET', 'POST'])
def takecare_list(request):

    if request.method == 'GET':
        "get all drinks, serialize them  return json"
        takecare=TakeCare.objects.all()
        paginator = CustomPagination()
        paginated_departments = paginator.paginate_queryset(takecare, request)
        serializer = TakeCareSerializer(paginated_departments, many=True)
        return paginator.get_paginated_response(serializer.data)

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