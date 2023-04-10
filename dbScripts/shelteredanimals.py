from faker import Faker

fake = Faker()

with open('populateShelteredAnimals.sql', 'w') as f:
    # delete all the existing records
    print('TRUNCATE TABLE animalshelter_shelteredanimals RESTART IDENTITY CASCADE;', file=f)

    # generate new records to insert
    for i in range(1000):
        if (i % 100 == 0):
            print(f'Generated {i * 1000} records')

        values = []
        for j in range(1000):
            # generate a new fake common name that has a length between 1 and 50
            common_name = fake.word()[:50]
            common_name = common_name.replace("'", "''")

            # generate a new fake given name that has a length between 1 and 50
            given_name = fake.word()[:50]
            given_name = given_name.replace("'", "''")

            # generate a fake weight between 1 and 100
            weight = fake.random_int(min=1, max=100)

            # generate a fake height between 1 and 200
            height = fake.random_int(min=1, max=200)

            # generate a fake isHealthy field with value Yes or No
            is_healthy = fake.random_element(elements=('Yes', 'No'))

            words = [fake.word() for i in range(100)]
            description=' '.join(words)


            values.append(
                f'(\'{common_name}\', \'{given_name}\', {weight}, {height}, \'{is_healthy}\',\'{description}.\')'
            )

        print(
            f'INSERT INTO animalshelter_shelteredanimals  ("commonName", "givenName", weight, height, "isHealthy", description) VALUES {", ".join(values)};',
            file=f)