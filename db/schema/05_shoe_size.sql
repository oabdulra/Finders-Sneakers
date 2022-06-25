-- Shoe Size Table --

DROP TABLE IF EXISTS shoe_size CASCADE;

CREATE TABLE shoe_size (
  id SERIAL PRIMARY KEY NOT NULL,
  size INT NOT NULL,
  gender VARCHAR(255) NOT NULL
)
