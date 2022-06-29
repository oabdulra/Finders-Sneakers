const { resolveInclude } = require("ejs");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
db.connect();


//helper function to determine the type of operator needed
const queryOp = (queryParams) => {
  let queryString = ` `;
  if (queryParams.length > 1) {
    queryString += `AND `;
  } else {
    queryString += `WHERE `;
  }
  return queryString;
}

const addUser = function(user) {

  const queryString = `
  INSERT INTO users (name, email)
  VALUES ($1, $2)
  RETURNING *`;

  const queryParams = [
    user.name,
    user.email
  ];

   //returns query as a final step
   return db.query(queryString, queryParams)
   .then((result) => {
      return result.rows[0];
   })
   .catch((err) => {
     console.log(err.message);
   });

};

exports.addUser = addUser;

const getMyCollection = function(userId) {

  const queryString = `
  SELECT posted_ads.id, posted_ads.owner_id, posted_ads.title, posted_ads.ad_photo, posted_ads.ad_description, posted_ads.price, posted_ads.post_date, posted_ads.ad_sold, shoe_size.size, shoe_brands.brand_name
  FROM posted_ads
  JOIN shoe_size ON posted_ads.size_id = shoe_size.id
  JOIN shoe_brands ON posted_ads.brand_id = shoe_brands.id
  WHERE posted_ads.owner_id = $1
  ORDER BY posted_ads.post_date;
  `;

  return db.query(queryString, [userId])
          .then((result) => {
            return result.rows;
          })
          .catch((err) => {
            console.log(err.message);
          });

};

exports.getMyCollection = getMyCollection;

const getUserWithId = function(userId) {

  const queryString = `SELECT * FROM users WHERE id = $1`;

  return db.query(queryString, [userId])
         .then((result) => {
          if (result.rows) {
            return result.rows[0];
          } else {
            return null;
          }
         })
         .catch((err) => {
          console.log(err.message);
         });

};

exports.getUserWithId = getUserWithId;

const getUserWithEmail = function(email) {
  const queryString = `SELECT * FROM users WHERE email = $1`;

  return db.query(queryString, [email])
         .then((result) => {
          if (result.rows) {
            return result.rows[0];
          } else {
            return null;
          }
         })
         .catch((err) => {
          console.log(err.message);
         });
};

exports.getUserWithEmail = getUserWithEmail;

const getAllSneakers = function(options) {

  const queryParams = [];

  let queryString = `
  SELECT posted_ads.id, posted_ads.owner_id, posted_ads.title, posted_ads.ad_photo, posted_ads.ad_description, posted_ads.price, posted_ads.post_date, posted_ads.ad_sold, shoe_size.size, shoe_brands.brand_name
  FROM posted_ads
  JOIN shoe_size ON posted_ads.size_id = shoe_size.id
  JOIN shoe_brands ON posted_ads.brand_id = shoe_brands.id`;

  if (options.minimum_price) {
    queryParams.push(`${options.minimum_price}`);
    queryString += `${queryOp(queryParams)} price >=  $${queryParams.length}`;
  }

  if (options.maximum_price) {
    queryParams.push(`${options.maximum_price}`);
    queryString += `${queryOp(queryParams)} price <=  $${queryParams.length}`;
  }

  queryString += `

  ORDER BY price;`;

  return db.query(queryString, queryParams)
  .then((result) => {
    if (result.rows) {
      return result.rows;
    } else {
      return null;
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
}

exports.getAllSneakers = getAllSneakers;

const getOneSneaker = function(sneakerId) {

  const queryString = `
  SELECT posted_ads.id, posted_ads.owner_id, posted_ads.title, posted_ads.ad_photo, posted_ads.ad_description, posted_ads.price, posted_ads.post_date, posted_ads.ad_sold, shoe_size.size, shoe_brands.brand_name
  FROM posted_ads
  JOIN shoe_size ON posted_ads.size_id = shoe_size.id
  JOIN shoe_brands ON posted_ads.brand_id = shoe_brands.id
  WHERE posted_ads.id = $1
  `;

  return db.query(queryString, [sneakerId])
          .then((result) => {
            if (result.rows) {
              return result.rows[0];
            } else {
              return null;
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
};
exports.getOneSneaker = getOneSneaker;

const addNewSneaker = function (sneakerObject, owner_id) {

  const queryString = `
  INSERT INTO posted_ads (owner_id, title, ad_photo, ad_description, price, size_id, brand_id, post_date, ad_sold)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING *`;

  const queryParams = [];
  queryParams.push(
    sneakerObject.owner_id,
    `${sneakerObject.title}`,
    `${sneakerObject.ad_photo}`,
    `${sneakerObject.ad_description}`,
    Number(sneakerObject.price),
    Number(sneakerObject.size_id),
    Number(sneakerObject.brand_id),
    '2022-06-28',
    false
  );

   //returns query as a final step
   return db.query(queryString, queryParams)
   .then((result) => {
      return result.rows[0];
   })
   .catch((err) => {
     console.log(err.message);
   });

};

exports.addNewSneaker = addNewSneaker;

const deleteOneSneaker = function (sneakerId) {

  const queryString = `
  DELETE FROM posted_ads WHERE id = $1
  RETURNING *
  `;

  return db.query(queryString, [sneakerId])
        .then((result) => {
          return result.rows[0];
        })
        .catch((err) => {
          console.log(err.message);
        })

};

exports.deleteOneSneaker = deleteOneSneaker;

const getMyFavs = function (userId) {

  const queryString = `
  SELECT favourite_ads.id, posted_ads.title, posted_ads.ad_photo, posted_ads.ad_description, posted_ads.price, posted_ads.post_date, posted_ads.ad_sold,shoe_size.size, shoe_size.gender, shoe_brands.brand_name
  FROM favourite_ads
  JOIN posted_ads ON favourite_ads.item_id = posted_ads.id
  JOIN shoe_size ON posted_ads.size_id = shoe_size.id
  JOIN shoe_brands ON posted_ads.brand_id = shoe_brands.id
  WHERE favourite_ads.user_id = $1
  GROUP BY favourite_ads.id, posted_ads.id , shoe_size.id, shoe_brands.id
  ORDER BY favourite_ads.id;
  `;

  return db.query(queryString, [userId])
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });

};

exports.getMyFavs = getMyFavs;

const addToMyFavs = function (sneakerId, owner_id) {

  const queryString = `
    INSERT INTO favourite_ads (user_id, item_id)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const queryParams = [
    owner_id,
    Number(sneakerId)
  ];
  console.log(queryParams)

   //returns query as a final step
   return db.query(queryString, queryParams)
   .then((result) => {
      return result.rows[0];
   })
   .catch((err) => {
     console.log(err.message);
   });
};

exports.addToMyFavs = addToMyFavs;

const getMostFavourited = function () {

  const queryString = `
  SELECT favourite_ads.id AS fave_ads, posted_ads.id AS id, posted_ads.title, posted_ads.ad_photo, posted_ads.ad_description, posted_ads.price, posted_ads.post_date, posted_ads.ad_sold,shoe_size.size, shoe_brands.brand_name
  FROM favourite_ads
  JOIN posted_ads ON favourite_ads.item_id = posted_ads.id
  JOIN shoe_size ON posted_ads.size_id = shoe_size.id
  JOIN shoe_brands ON posted_ads.brand_id = shoe_brands.id
  GROUP BY favourite_ads.id, posted_ads.id , shoe_size.id, shoe_brands.id
  ORDER BY COUNT(favourite_ads.item_id) DESC
  LIMIT 5;
  `;

  return db.query(queryString)
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });

};

exports.getMostFavourited = getMostFavourited;

const deleteFromMyFavs= function (sneakerId) {

  const queryString = `
  DELETE FROM favourite_ads WHERE id = $1
  RETURNING *
  `;

  return db.query(queryString, [sneakerId])
        .then((result) => {
          return result.rows[0];
        })
        .catch((err) => {
          console.log(err.message);
        })


};

exports.deleteFromMyFavs = deleteFromMyFavs;

const markSneakerAsSold = function(sneakerId) {
  const queryString = `
  UPDATE posted_ads
  SET ad_sold = true
  WHERE id = $1
  RETURNING *`;

   //returns query as a final step
   return db.query(queryString, [sneakerId])
   .then((result) => {
      return result.rows[0];
   })
   .catch((err) => {
     console.log(err.message);
   });
};

exports.markSneakerAsSold = markSneakerAsSold;

/* stretch goal
const contactSeller = function (messageObject) {
};
*/
