-- public.products definition

-- Drop table

-- First full table of imagined data collected for a specific
-- product
-- DROP TABLE public.products;
/*
CREATE TABLE public.products (
	product_id serial NOT NULL,
	type_food varchar(80) NULL,
	stock int4 NULL,
	shelf_life varchar(80) NULL,
	ingredients varchar(80) NULL,
	date_purchased date NULL,
	quantity int4 NULL,
	food varchar(80) NULL,
	brand varchar(80) NULL,
	notes varchar(80) NULL,
	shop varchar(80) NULL,
	placed varchar(80) NULL,
	price numeric(6,2) NULL,
	weight numeric(6,2) NULL,
	category varchar(80) NULL,
	upc varchar(12) NULL,
	CONSTRAINT product_id PRIMARY KEY (product_id)
);*/

-- ###################################################################
-- ---------------- DROPPING TABLES LIKE FLIES -----------------
-- TODO add a Nutrition Facts tables in a future far, far away
-- TODO add a UPC table with id, upc, brand_id

DROP TABLE IF EXISTS public.foods_recipes cascade;
DROP TABLE IF EXISTS public.recipes cascade;
DROP TABLE IF EXISTS public.brands_retailers cascade;
DROP TABLE IF EXISTS public.foods_categories cascade;
DROP TABLE IF EXISTS public.categories cascade;
DROP TABLE IF EXISTS public.foods_storages cascade;
DROP TABLE IF EXISTS public.storages cascade;
DROP TABLE IF EXISTS public.foods_retailers cascade;
DROP TABLE IF EXISTS public.retailers cascade;
DROP TABLE IF EXISTS public.foods_brands cascade;
DROP TABLE IF EXISTS public.brands cascade;
DROP TABLE IF EXISTS public.food_groceries cascade;
-- ----------------------------------------------------------------------
-- ####################################################################

-- ------------------- Where magic happens ----------------------------

-- separate categories allow for adding and removing categories
-- without compromising the rest of the related data
CREATE TABLE public.categories (
	id serial NOT NULL,
	category varchar(40) unique not null,
	CONSTRAINT categories_pkey PRIMARY KEY (id)
);

-- separate brands allow for adding/removing brands
-- withoug compromising the rest of the data
CREATE TABLE public.brands (
	id serial NOT NULL,
	brand varchar(40) UNIQUE NOT NULL,
	CONSTRAINT brands_pkey PRIMARY KEY (id)
);

-- separate recipes allow modifying recipes without
-- touching related data, recipes and foods_recipes
-- will need some extra love
CREATE TABLE public.recipes (
	id serial NOT NULL,
	recipe varchar(40) unique not null,
	CONSTRAINT recipes_pkey PRIMARY KEY (id)
);

-- separate retailers table allow for modifying 
-- individual retailers without touching related data
CREATE TABLE public.retailers (
	id serial NOT NULL,
	retailer varchar(40) unique not null,
	CONSTRAINT retailers_pkey PRIMARY KEY (id)
);

-- separate storage areas allow for adding or removing
-- more storage spaces without compromising related data
CREATE TABLE public.storages (
	id serial NOT NULL,
	storage varchar(40) unique not null,
	CONSTRAINT storages_pkey PRIMARY KEY (id)
);

-- junction table for relating brands and retailers
CREATE TABLE public.brands_retailers (
	brand_id int4 NOT NULL,
	retailer_id int4 NOT NULL,
	CONSTRAINT brands_retailers_pkey PRIMARY KEY (brand_id,retailer_id),
	FOREIGN KEY (brand_id) REFERENCES brands (id),
	FOREIGN KEY (retailer_id) REFERENCES retailers (id)
);

-- main food table will probably rethink this in a future
-- when I decide to add not food groceries. My main focus right
-- now is with food groceries so basically this is the main
-- table
CREATE TABLE public.food_groceries (
	food varchar(40) NOT NULL,
	upc_food varchar(52) UNIQUE NOT NULL,
	notes varchar(40) NULL,
	CONSTRAINT food_groceries_pkey PRIMARY KEY (food,upc_food)
);

-- junction table relating foods and brands and additional
-- columns to the foods_brands because different brands
-- probably have different product quantity resulting in
-- different weights by brand, the measure unit will be
-- in english system and then probably add a method in js
-- to convert to metric
CREATE TABLE public.foods_brands (
	brand_id int4 NOT NULL,
	upc_food varchar(52) UNIQUE NOT NULL,
	weight numeric(6,2) NULL,
	measure_unit varchar(6),
	CONSTRAINT foods_brands_pkey PRIMARY KEY (brand_id,upc_food),
	FOREIGN KEY (brand_id) REFERENCES brands (id),
	FOREIGN KEY (upc_food) REFERENCES food_groceries (upc_food)
);

-- separate foods_recipes allow modifying recipes without
-- touching related data, recipes and foods_recipes
-- will need some extra love
CREATE TABLE public.foods_recipes (
	recipe_id int4 NOT NULL,
	upc_food varchar(52) NOT NULL,
	measurement numeric(6,2) NULL,
	measure_unit varchar(6),
	notes varchar(300) NULL,
	instructions varchar(300) NULL,
	CONSTRAINT foods_recipes_pkey PRIMARY KEY (recipe_id,upc_food),
	FOREIGN KEY (recipe_id) REFERENCES recipes (id),
	FOREIGN KEY (upc_food) REFERENCES food_groceries (upc_food)
);

-- junction table for relating foods and retailers
-- adding the price property allows to add different 
-- prices that change retailer by retailer
-- will probably implement a discount feature in a future
CREATE TABLE public.foods_retailers (
	retailer_id int4 NOT NULL,
	upc_food varchar(52) UNIQUE NOT NULL,
	price numeric(6,2) NULL,
	CONSTRAINT foods_stores_pkey PRIMARY KEY (retailer_id,upc_food),
	FOREIGN KEY (retailer_id) REFERENCES retailers (id),
	FOREIGN KEY (upc_food) REFERENCES food_groceries (upc_food)
);

-- junction table for relating foods and storage places
-- in your dwelling, this will allow for future implementation
-- of required temperature of a product and better calculation
-- of shelf life and also identifying where did you placed or
-- where should your grocery be put away
CREATE TABLE public.foods_storages (
	storages_id int4 NOT NULL,
	upc_food varchar(52) UNIQUE NOT NULL,
	quantity int4 NULL,
	date_purchased date NULL,
	shelf_life varchar(80) NULL,
	CONSTRAINT foods_storages_pkey PRIMARY KEY (storages_id,upc_food),
	FOREIGN KEY (storages_id) REFERENCES storages (id),
	FOREIGN KEY (upc_food) REFERENCES food_groceries (upc_food)
);

-- junction table for relating foods and categories
-- categories allow for classification of food goods and
-- to give priority at the time of purchasing a good at a
-- retailer
CREATE TABLE public.foods_categories (
	categories_id int4 NOT NULL,
	upc_food varchar(52) UNIQUE NOT NULL,
	CONSTRAINT foods_categories_pkey PRIMARY KEY (categories_id,upc_food),
	FOREIGN KEY (categories_id) REFERENCES categories (id),
	FOREIGN KEY (upc_food) REFERENCES food_groceries (upc_food)
);

-- #######################################################################################
-- ------------------------------------ ROLES -------------------------------------------
-- creating roles for security purposes
CREATE ROLE node_app_role LOGIN PASSWORD '';
-- role permissions
GRANT SELECT, UPDATE, INSERT ON ALL TABLES IN SCHEMA public TO node_app_role;
-- I needed to add this extra permission to the role in order to be able to insert into
-- without it, if you have a serial column, inserting using a restricted role will produce
-- permission denied on serial column because it is blocking permissions to nextval() on role
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO node_app_role;


-- ###########################################################################################
-- ------------------------------- QUERIES --------------------------------------------------
-- query for json object
-- will need another bracket for recipes available, will implement in a future far, far away

SELECT
     categories.category
     ,fg.food
     ,brands.brand
     ,fg.notes
     ,foods_brands.weight, foods_brands.measure_unit
     ,foods_storages.date_purchased
     ,retailers.retailer
     ,foods_retailers.price
     ,storages.storage
     ,foods_storages.quantity ,foods_storages.shelf_life
 FROM food_groceries fg
 LEFT JOIN foods_categories ON fg.upc_food = foods_categories.upc_food
 LEFT JOIN foods_brands ON fg.upc_food = foods_brands.upc_food
 LEFT JOIN foods_retailers ON fg.upc_food = foods_retailers.upc_food
 LEFT JOIN foods_storages ON fg.upc_food = foods_storages.upc_food
 LEFT JOIN categories ON foods_categories.categories_id = categories.id
 LEFT JOIN retailers ON foods_retailers.retailer_id = retailers.id
 LEFT JOIN storages ON foods_storages.storages_id = storages.id
 LEFT JOIN brands ON foods_brands.brand_id = brands.id
 

BEGIN;
INSERT INTO food_groceries (food,upc_food,notes) VALUES ('Hummus','007096910136Hummus','With garlic');
INSERT INTO foods_categories (categories_id ,upc_food ) VALUES (5,'007096910136Hummus');
INSERT INTO foods_brands (brand_id ,upc_food ,weight ,measure_unit ) VALUES (8,'007096910136Hummus',0.0,'L');
INSERT INTO foods_storages (storages_id ,upc_food ,date_purchased ,quantity ,shelf_life ) 
VALUES (1,'007096910136Hummus','2020-01-01',1,'2 weeks');
INSERT INTO foods_retailers (retailer_id ,upc_food ,price ) VALUES (1,'007096910136Hummus',3.14);
COMMIT;




