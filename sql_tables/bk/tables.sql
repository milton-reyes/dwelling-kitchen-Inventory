-- Added comment

















-- public.products definition

-- Drop table

-- DROP TABLE public.products;
/*
CREATE TABLE public.products (
	product_id serial NOT NULL,
	type_name varchar(80) NULL,
	stock int4 NULL,
	shelf_life varchar(80) NULL,
	ingredients varchar(80) NULL,
	date_purchased date NULL,
	quantity int4 NULL,
	"name" varchar(80) NULL,
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


CREATE TABLE public.food_groceries (
	id serial NOT NULL,
	upc varchar(12) NOT NULL,
	name varchar(40) NOT NULL,
	weight numeric(6,2) NULL,
	notes varchar(40) NULL,
	CONSTRAINT food_groceries_pkey PRIMARY KEY (upc,name)
);

CREATE TABLE public.brands (
	id serial NOT NULL,
	brand varchar(40) UNIQUE NOT NULL,
	CONSTRAINT brands_pkey PRIMARY KEY (id)
);

CREATE TABLE public.foods_brands (
	id serial NOT NULL,
	brand_id int4 NOT NULL,
	upc varchar(12) NOT NULL,
	name varchar(40) NOT NULL,
	--upc_name varchar(52) NOT NULL,
	weight numeric(6,2) NULL,
	CONSTRAINT foods_brands_pkey PRIMARY KEY (id),
	FOREIGN KEY (brand_id) REFERENCES brands (id),
	--FOREIGN KEY (upc,name) REFERENCES food_groceries (food_groceries_pkey)
	FOREIGN KEY (upc,name) REFERENCES food_groceries (upc,name)
);

CREATE TABLE public.recipes (
	id serial NOT NULL,
	recipe varchar(40) NULL,
	CONSTRAINT recipes_pkey PRIMARY KEY (id)
);

CREATE TABLE public.foods_recipes (
	id serial NOT NULL,
	upc varchar(12) NOT NULL,
	name varchar(40) NOT NULL,
	recipe_id int4 NOT NULL,
	measurement numeric(6,2) NULL,
	notes varchar(300) NULL,
	PROCEDURE varchar(300) NULL,
	CONSTRAINT foods_recipes_pkey PRIMARY KEY (id),
	FOREIGN KEY (recipe_id) REFERENCES recipes (id),
	FOREIGN KEY (upc,name) REFERENCES food_groceries (upc,name)
);

CREATE TABLE public.retailers (
	id serial NOT NULL,
	store varchar(40),
	CONSTRAINT retailers_pkey PRIMARY KEY (id)
);

CREATE TABLE public.foods_retailers (
	id serial NOT NULL,
	store_id int4 NOT NULL,
	upc varchar(12) NOT NULL,
	name varchar(40) NOT NULL,
	price numeric(6,2) NULL,
	CONSTRAINT foods_stores_pkey PRIMARY KEY (id),
	FOREIGN KEY (store_id) REFERENCES retailers (id),
	FOREIGN KEY (upc,name) REFERENCES food_groceries (upc,name)
);

CREATE TABLE public.brands_retailers (
	id serial NOT NULL,
	brand_id int4 NOT NULL,
	store_id int4 NOT NULL,
	CONSTRAINT brands_retailers_pkey PRIMARY KEY (id)
);

CREATE TABLE public.storages (
	id serial NOT NULL,
	store varchar(40),
	CONSTRAINT storages_pkey PRIMARY KEY (id)
);

CREATE TABLE public.foods_storages (
	id serial NOT NULL,
	storages_id int4 NOT NULL,
	upc varchar(12) NOT NULL,
	name varchar(40) NOT NULL,
	quantity int4 NULL,
	date_purchased date NULL,
	shelf_life varchar(80) NULL,
	CONSTRAINT foods_storages_pkey PRIMARY KEY (id),
	FOREIGN KEY (storages_id) REFERENCES storages (id),
	FOREIGN KEY (upc,name) REFERENCES food_groceries (upc,name)
);

CREATE TABLE public.categories (
	id serial NOT NULL,
	category varchar(40),
	CONSTRAINT categories_pkey PRIMARY KEY (id)
);

CREATE TABLE public.foods_categories (
	id serial NOT NULL,
	categories_id int4 NOT NULL,
	upc varchar(12) NOT NULL,
	name varchar(40) NOT NULL,
	CONSTRAINT foods_categories_pkey PRIMARY KEY (id),
	FOREIGN KEY (categories_id) REFERENCES categories (id),
	FOREIGN KEY (upc,name) REFERENCES food_groceries (upc,name)
);












