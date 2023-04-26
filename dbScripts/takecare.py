from faker import Faker

fake = Faker()

with open('populateTakeCare.sql', 'w') as f:
    # delete all the existing records from the table
    print('TRUNCATE TABLE animalshelter_takecare RESTART IDENTITY CASCADE;', file=f)


    # disable animal and caretaker foreign key constraints
    print(
        'ALTER TABLE animalshelter_takecare DROP CONSTRAINT animalshelter_takeca_animal_id_fc13da62_fk_animalshe;',
        file=f)
    print(
        'ALTER TABLE animalshelter_takecare DROP CONSTRAINT animalshelter_takeca_caretaker_id_60d33ea1_fk_animalshe;',
        file=f)

    # disable the index on animal id
    print('DROP INDEX animalshelter_takecare_animal_id_fc13da62;', file=f)

    # disable the index on caretaker id
    print('DROP INDEX animalshelter_takecare_caretaker_id_60d33ea1;', file=f)

    # generate new records to insert
    for i in range(10000):
        if (i % 1000 == 0):
            print(f'Generated {i * 10000} records')


        caretaker_id_generated = fake.random_int(min=i * 100 + 1, max=(i + 1) * 100)

        values = []
        for j in range(1000):

            caringMonths = fake.random_int(min=1, max=100)

            # generate a random shift
            shiftEx = fake.random_element(elements=('Morning', 'Afternoon','Evening','Night'))

            # generate a random animal_id
            animal_id_generated = fake.random_int(min=j * 1000 + 1, max=(j + 1) * 1000)

            # add it to the batch of inserts
            values.append(
                f'({caringMonths}, \'{shiftEx}\', {animal_id_generated}, {caretaker_id_generated})'
            )

        # execute the batch of inserts
        print(
            f'INSERT INTO animalshelter_takecare ("caringMonths", "shift", "animal_id", "caretaker_id") VALUES {", ".join(values)};',
            file=f)

    # enable fk
    print(
        'ALTER TABLE animalshelter_takecare ADD CONSTRAINT animalshelter_takeca_animal_id_fc13da62_fk_animalshe FOREIGN KEY (animal_id) REFERENCES animalshelter_shelteredanimals(id);',
        file=f)
    print(
        'ALTER TABLE animalshelter_takecare ADD CONSTRAINT animalshelter_takeca_caretaker_id_60d33ea1_fk_animalshe FOREIGN KEY (caretaker_id) REFERENCES animalshelter_caretakers (id);',
        file=f)