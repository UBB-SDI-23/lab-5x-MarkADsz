# Generated by Django 4.1.7 on 2023-03-18 13:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Departments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('departmentName', models.CharField(max_length=50)),
                ('speciality', models.CharField(max_length=50)),
                ('nrOfAnimals', models.IntegerField()),
                ('nrOfPersonnel', models.IntegerField()),
                ('availablePlaces', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='ShelteredAnimals',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('commonName', models.CharField(max_length=50)),
                ('givenName', models.CharField(max_length=50)),
                ('weight', models.IntegerField()),
                ('height', models.IntegerField()),
                ('isHealthy', models.CharField(max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='CareTakers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstName', models.CharField(max_length=50)),
                ('lastName', models.CharField(max_length=50)),
                ('yearsExperience', models.IntegerField()),
                ('isVolunteer', models.CharField(max_length=5)),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='departmentCareTakers', to='animalshelter.departments')),
            ],
        ),
    ]
