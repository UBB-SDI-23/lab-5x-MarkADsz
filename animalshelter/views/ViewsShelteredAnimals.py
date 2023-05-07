from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from animalshelter.models import ShelteredAnimals
from animalshelter.serializers import ShelteredAnimalsSerializers, ShelteredAnimalsSerializerDetail
from .Pagination import CustomPagination

@extend_schema(responses=ShelteredAnimalsSerializers)
@api_view(['GET', 'POST'])
def animal_list(request):

    if request.method == 'GET':
        "get all drinks, serialize them  return json"
        animals=ShelteredAnimals.objects.all()
        paginator = CustomPagination()
        paginated_animals = paginator.paginate_queryset(animals, request)
        serializer = ShelteredAnimalsSerializers(paginated_animals, many=True)
        return paginator.get_paginated_response(serializer.data)


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

@extend_schema(responses=ShelteredAnimalsSerializers)
@api_view(['GET'])
def animals_autocomplete(request):
    serializer_class = ShelteredAnimalsSerializers
    query = request.query_params.get('query', None)
    if query:
        animals = ShelteredAnimals.objects.filter(
            Q(commonName__icontains=query) | Q(givenName__icontains=query)
        ).order_by('givenName')[:20]
    else:
        animals = ShelteredAnimals.objects.all()[:20]
    serializer = ShelteredAnimalsSerializers(animals, many=True)
    return Response(serializer.data)
