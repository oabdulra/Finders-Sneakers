-- Shoe Size Table --

DROP TABLE IF EXISTS shoe_size CASCADE;

CREATE TABLE shoe_size (
  id SERIAL PRIMARY KEY NOT NULL,
  gender CHAR NOT NULL,
  size INT NOT NULL
)
