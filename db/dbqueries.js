const { resolveInclude } = require("ejs");
const dbParams = require("../lib/db");

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


const getMyCollection = function(userId) {

  const queryString = `
  SELECT posted_ads.*
  FROM posted_ads
  JOIN shoe_size ON posted_ads.size_id = shoe_size.id
  JOIN shoe_brands ON posted_ads.brand_id = shoe_brands.id
  WHERE owner_id = $1
  GROUP BY posted_ads.id
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

const getAllSneakers = function(options) {

  const queryParams = [];

  let queryString = `
  SELECT posted_ads.*
  FROM posted_ads
  JOIN shoe_size ON posted_ads.size_id = shoe_size.id
  JOIN shoe_brands ON posted_ads.brand_id = shoe_brands.id;`;

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price}`);
    queryString += `${queryOp(queryParams)} price >=  $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price * 100}`);
    queryString += `${queryOp(queryParams)} price <=  $${queryParams.length}`;
  }

  queryString += `
  GROUP BY posted_ads.id
  ORDER BY price;`;

  return db.query(queryString, queryParams)
  .then((result) =>
      result.rows )
  .catch((err) => {
    console.log(err.message);
  });
}

exports.getAllSneakers = getAllSneakers;

const getOneSneaker = function(sneakerId) {

};

const addOneSneaker = function (sneakerObject) {

  const queryString = `
  INSERT INTO posted_ads (owner_id, title, ad_photo, ad_description, price, size_id, brand_id, post_date, ad_sold)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING *`;

  const queryParams = [
    sneakerObject.owner_id,
    sneakerObject.title,
    sneakerObject.ad_photo,
    sneakerObject.ad_description,
    sneakerObject.price,
    sneakerObject.size_id,
    sneakerObject.brand_id,
    sneakerObject.post_date,
    sneakerObject.ad_sold
  ];

   //returns query as a final step
   return db.query(queryString, queryParams)
   .then((result) => {
      result.rows.length;
   })
   .catch((err) => {
     console.log(err.message);
   });

};

exports.addOneSneaker = addOneSneaker;

const deleteOneSneaker = function (sneakerAd) {

  const queryString = `DELETE FROM posted_ads WHERE id = $1`;

  return db.query(queryString, sneakerAd)
        .then((result) => {
          result.redirect("/")
        })
        .catch((err) => {
          console.log(err.message);
        })

};

exports.deleteOneSneaker = deleteOneSneaker;


/*
const contactSeller = function (messageObject) {

};
*/
