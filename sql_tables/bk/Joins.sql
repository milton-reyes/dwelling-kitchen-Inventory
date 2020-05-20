/* Joins */
/* Joins allow us to combine result sets horizontally */
/* When defining a JOIN, we join a standard query to a 'new' TABLE

/* There are a variety of types of joins, but for demos sake we will
   start with left join (left outer join) */

SELECT * FROM pets;
SELECT * FROM pet_owners;
SELECT * FROM people;

INSERT INTO pet_owners
INSERT INTO pet_owners (pet_id, poeple_id) VALUES
    (1, 1), (1, 2), (2, 3), (4, 4), (4, 3);

SELECT * FROM pets.*, people.first_name "owner_name"
    LEFT JOIN pet_owners ON pets.id = pet_owners.pet_id
    LEFT JOIN people ON pet_owners.poeple_id = people.id;