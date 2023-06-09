# Generated by Django 4.1.7 on 2023-03-27 16:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('animalshelter', '0002_takecare'),
    ]

    operations = [
        migrations.AlterField(
            model_name='takecare',
            name='animal',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='allCareTakers', to='animalshelter.shelteredanimals'),
        ),
        migrations.AlterField(
            model_name='takecare',
            name='caretaker',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='animalsInCare', to='animalshelter.caretakers'),
        ),
    ]
