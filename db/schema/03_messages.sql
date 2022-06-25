-- Messages Table --

DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  ad_owner INTEGER REFERENCES posted_ads(owner_id) NOT NULL,
  ad_buyer INTEGER REFERENCES users(id) NOT NULL,
  message TEXT
);
