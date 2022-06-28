-- Favourite Ads Table --

DROP TABLE IF EXISTS favourite_ads CASCADE;

CREATE TABLE favourite_ads (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  item_id INTEGER REFERENCES posted_ads(id) NOT NULL
);
