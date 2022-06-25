-- Ads Table --


DROP TABLE IF EXISTS posted_ads CASCADE;

CREATE TABLE posted_ads (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id BIGINT REFERENCES users(id) NOT NULL,

  title VARCHAR(255) NOT NULL,
  ad_photo VARCHAR(255) NOT NULL,
  ad_description TEXT,
  price INTEGER NOT NULL,
  size_id INTEGER REFERENCES shoe_size(id) NOT NULL,
  brand_id INTEGER REFERENCES shoe_brands(id) NOT NULL,
  post_date DATE NOT NULL,

  ad_sold BOOLEAN NOT NULL DEFAULT FALSE
);
