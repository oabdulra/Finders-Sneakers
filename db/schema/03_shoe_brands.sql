-- Shoe Brand Table --

DROP TABLE IF EXISTS shoe_brands CASCADE;

CREATE TABLE shoe_brands (
  id SERIAL PRIMARY KEY NOT NULL,
  brand_name VARCHAR(255) NOT NULL
);
