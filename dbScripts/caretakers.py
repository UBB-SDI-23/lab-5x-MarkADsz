from faker import Faker
import random

fake = Faker()

with open('populateCareTakers.sql', 'w') as f:
    # delete all the existing records
    print('TRUNCATE TABLE animalshelter_caretakers RESTART IDENTITY CASCADE;', file=f)

    # generate new records to insert
    for i in range(1000):
        if (i % 100 == 0):
            print(f'Generated {i * 1000} records')

        values = []
        for j in range(1000):
            # generate a new fake first name that has a length between 1 and 50
            first_name = fake.first_name()[:50]
            first_name = first_name.replace("'", "''")

            # generate a new fake last name that has a length between 1 and 50
            last_name = fake.last_name()[:50]
            last_name = last_name.replace("'", "''")

            # select a random department id from 1 to 1000000
            department_id = fake.random_int(min=1, max=1000000)

            # generate a fake years of experience between 0 and 50
            years_experience = fake.random_int(min=0, max=50)

            # generate a fake isVolunteer value ('Yes' or 'No')
            is_volunteer = fake.random_element(elements=('Yes', 'No'))

            values.append(
                f'(\'{first_name}\', \'{last_name}\', {department_id}, {years_experience}, \'{is_volunteer}\')'
            )

        print(
            f'INSERT INTO animalshelter_caretakers ("firstName", "lastName", "department_id", "yearsExperience", "isVolunteer") VALUES {", ".join(values)};',
            file=f)