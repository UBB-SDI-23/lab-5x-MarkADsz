from django.test import TestCase
import random
from animalshelter.models import CareTakers
from animalshelter.models import Departments

# from unittest import TestCase
from rest_framework.test import APIRequestFactory, APITestCase
from animalshelter.views import caretaker_list

class CareTakersExperienceGreaterThanAverageModelTestcase(TestCase):
    @classmethod
    def setUpTestData(cls):
        Departments.objects.create(departmentName="depTest", speciality="s", nrOfAnimals=2, nrOfPersonnel=3,availablePlaces=3)
        number_of_caretakers = 100
        for ct in range(number_of_caretakers):
            CareTakers.objects.create(firstName=f"FirstName{ct}", lastName=f"LastName{ct}", department_id= 1, yearsExperience=ct,isVolunteer="No")

    def test_url_exists(self):
        response = self.client.get("/caretakers/?years_of_experience_greater_than=15")
        self.assertEqual(response.status_code, 200)

    def test_count_correctly_returned(self):
        response = self.client.get("/caretakers/?years_of_experience_greater_than=15")
        self.assertEqual(len(response.data), 100-15-1)

class DepartmentsOrderedByCareTakerModelTestcase(TestCase):
    expected_dep_order = {}
    @classmethod

    def setUpTestData(cls):
        number_of_departments=15
        for dp in range(number_of_departments):
            Departments.objects.create(departmentName=f"depTest{dp}", speciality=f"s{dp}", nrOfAnimals=2, nrOfPersonnel=3,availablePlaces=3)
            # We initialize our expected result dataset
            cls.expected_dep_order[f"depTest{dp}"] = 0
        number_of_caretakers = 100

        #We choose for each caretaker a random department
        for ct in range(number_of_caretakers):
            randomDep = random.randint(0, number_of_departments-1)
            CareTakers.objects.create(firstName=f"FirstName{ct}", lastName=f"LastName{ct}", department_id= randomDep+1, yearsExperience=ct,isVolunteer="No")
            cls.expected_dep_order[f"depTest{randomDep}"]+=1

    def test_url_exists(self):
        response = self.client.get("/departments_ordered_by_caretakers/")
        self.assertEqual(response.status_code, 200)

    def test_order_correctly_returned(self):
        response = self.client.get("/departments_ordered_by_caretakers/")
        self.expected_dep_order = dict(sorted(self.expected_dep_order.items(), key=lambda item: item[1]))
        # print(self.expected_dep_order)
        response = self.client.get("/departments_ordered_by_caretakers/")
        # print(response.data)
        self.assertQuerysetEqual(response.data, self.expected_dep_order, lambda x: x['departmentName'])
