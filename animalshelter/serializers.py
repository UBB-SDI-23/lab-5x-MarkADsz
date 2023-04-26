from rest_framework import serializers
from .models import ShelteredAnimals
from .models import Departments
from .models import CareTakers
from .models import TakeCare
from rest_framework.validators import UniqueTogetherValidator

class ShelteredAnimalsSerializers(serializers.ModelSerializer):
    class Meta:
        "Metadata Describing the Model"
        model= ShelteredAnimals
        fields=['id','commonName','givenName','weight','height','isHealthy','description']

    def validate_weight(self,value):
        if value < 0:
            raise serializers.ValidationError("Weight should be a positive integer")
        return value



class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departments
        fields = ['id', 'departmentName', 'speciality', 'nrOfAnimals', 'nrOfPersonnel', 'availablePlaces']

    def validate_nrOfAnimals(self,value):
        if value <= 0:
            raise serializers.ValidationError("There should be at least one animal in a department")
        return value

class CareTakerSerializer(serializers.ModelSerializer):
    department_id=serializers.IntegerField()
    firstName = serializers.CharField(max_length=50)
    lastName = serializers.CharField(max_length=50)
    yearsExperience = serializers.IntegerField()
    isVolunteer = serializers.CharField(max_length=5)
    # if()
    # department = DepartmentSerializer(read_only=True)

    def validate_isVolunteer(self, value):
        if value not in ['Yes', 'No']:
            raise serializers.ValidationError("isVolunteer must be either 'Yes' or 'No'")
        return value

    class Meta:
        model = CareTakers
        fields = ['id', 'firstName', 'lastName', 'department_id', 'yearsExperience', 'isVolunteer']


class TakeCareSerializer(serializers.ModelSerializer):
    caretaker_id = serializers.IntegerField()
    animal_id = serializers.IntegerField()

    class Meta:
        model = TakeCare
        fields = ['id', 'caretaker_id', 'animal_id','caringMonths', 'shift']
        validators = [
            UniqueTogetherValidator(
                queryset=TakeCare.objects.all(),
                fields=['caretaker_id', 'animal_id']
            ) ]

class ShelteredAnimalsSerializerDetail(serializers.ModelSerializer):
    allCareTakers=TakeCareSerializer(many=True)
    class Meta:
        "Metadata Describing the Model"
        model= ShelteredAnimals
        fields=['id','commonName','givenName','weight','height','isHealthy','description','allCareTakers']

    def validate_weight(self,value):
        if value < 0:
            raise serializers.ValidationError("Weight should be a positive integer")
        return value

class CareTakerSerializerDetail(serializers.ModelSerializer):
    department_id=serializers.IntegerField(write_only=True)
    firstName = serializers.CharField(max_length=50)
    lastName = serializers.CharField(max_length=50)
    yearsExperience = serializers.IntegerField()
    isVolunteer = serializers.CharField(max_length=5)
    department = DepartmentSerializer(read_only=True)
    animalsInCare=TakeCareSerializer(many=True)

    class Meta:
        model = CareTakers
        fields = ['id', 'firstName', 'lastName', 'department' ,'department_id', 'yearsExperience', 'isVolunteer','animalsInCare']


class CareTakerDTOSerializer(serializers.Serializer):
    department_id = serializers.IntegerField(write_only=True)
    firstName = serializers.CharField(max_length=50)
    lastName = serializers.CharField(max_length=50)
    yearsExperience = serializers.IntegerField()
    isVolunteer = serializers.CharField(max_length=5)
    avg_years_experience = serializers.FloatField()
    class Meta:
        model = CareTakers
        fields = ['id', 'firstName', 'lastName','department_id', 'yearsExperience', 'isVolunteer','avg_years_experience']


class DepartmentDTOSerializer(serializers.ModelSerializer):
    departmentName = serializers.CharField(max_length=50)
    speciality = serializers.CharField(max_length=50)
    nrOfAnimals = serializers.IntegerField()
    nrOfPersonnel = serializers.IntegerField()
    availablePlaces = serializers.IntegerField()
    nr_caretakers = serializers.IntegerField()
    avg_caretakers= serializers.FloatField()
    current_caretakers=CareTakerSerializer(many=True)
    class Meta:
        model = Departments
        fields = ['id', 'departmentName', 'speciality', 'nrOfAnimals', 'nrOfPersonnel', 'availablePlaces','avg_caretakers','nr_caretakers','current_caretakers']

class DepartmentSerializerDetail(serializers.ModelSerializer):
    departmentCareTakers = CareTakerSerializer(many=True)
    class Meta:
        model = Departments
        fields = ['id', 'departmentName', 'speciality', 'nrOfAnimals', 'nrOfPersonnel', 'availablePlaces','departmentCareTakers']


class TakeCareSerializerDetail(serializers.ModelSerializer):
    caretaker = CareTakerSerializer(read_only=True)
    animal = ShelteredAnimalsSerializers(read_only=True)
    caretaker_id = serializers.IntegerField(write_only=True)
    animal_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = TakeCare
        fields = ['id', 'caretaker_id', 'animal_id','caretaker','animal','caringMonths', 'shift']