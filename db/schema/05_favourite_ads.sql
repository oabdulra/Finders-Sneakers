-- Favourite Ads Table --

DROP TABLE IF EXISTS favourite_ads CASCADE;

CREATE TABLE favourite_ads (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES posted_ads(id) ON DELETE CASCADE
);
