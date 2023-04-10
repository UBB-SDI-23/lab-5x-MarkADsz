from faker import Faker

fake = Faker()

with open('populateDepartments.sql', 'w') as f:
    # delete all the existing records
    print('TRUNCATE TABLE animalshelter_departments RESTART IDENTITY CASCADE;', file=f)

    # generate new records to insert
    for i in range(1000):
        if (i % 100 == 0):
            print(f'Generated {i * 1000} records')

        values = []
        for j in range(1000):
            # generate a new fake department name that has a length between 1 and 50
            department_name = fake.word()[:50]
            department_name = department_name.replace("'", "''")

            # generate a fake specialty that has a length between 1 and 50
            specialty = department_name+"Speciality"

            # generate a fake number of animals between 0 and 1000
            nr_of_animals = fake.random_int(min=1, max=1000)

            # generate a fake number of personnel between 0 and 1000
            nr_of_personnel = fake.random_int(min=1, max=1000)

            # generate a fake available places between 0 and 1000
            available_places = fake.random_int(min=0, max=1000)

            values.append(
                f'(\'{department_name}\', \'{specialty}\', {nr_of_animals}, {nr_of_personnel}, {available_places})'
            )

        print(
            f'INSERT INTO animalshelter_departments ("departmentName", speciality, "nrOfAnimals", "nrOfPersonnel", "availablePlaces") VALUES {", ".join(values)};',
            file=f)
