from django.db import models

class ShelteredAnimals(models.Model):
    commonName=models.CharField(max_length=50)
    givenName=models.CharField(max_length=50)
    weight=models.IntegerField()
    height=models.IntegerField()
    isHealthy=models.CharField(max_length=5)
    description=models.CharField(max_length=20000,default='no description')

class Departments(models.Model):
    departmentName = models.CharField(max_length=50)
    speciality = models.CharField(max_length=50)
    nrOfAnimals = models.IntegerField()
    nrOfPersonnel = models.IntegerField()
    availablePlaces= models.IntegerField()

    def __str__(self):
        return self.departmentName
    # def get_nr_caretakers(self):
    #     return self.departmentCareTakers.count()

class CareTakers(models.Model):
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    department = models.ForeignKey(Departments,on_delete=models.CASCADE,related_name='departmentCareTakers')
    yearsExperience = models.IntegerField()
    isVolunteer = models.CharField(max_length=5)

    def __str__(self):
        return self.firstName + " " + self.lastName

class TakeCare(models.Model):
    animal = models.ForeignKey(ShelteredAnimals,on_delete=models.CASCADE,related_name='allCareTakers')
    caretaker = models.ForeignKey(CareTakers,on_delete=models.CASCADE,related_name='animalsInCare')
    caringMonths = models.IntegerField()
    shift= models.CharField(max_length=50)
    # def __str__(self):
    #     return self.givenName+" is a "+ self.commonName+" and wheighs "+str(self.weight)+ ", is of height "+str(self.height)+"cm, and is healthy:"+self.isHealthy

