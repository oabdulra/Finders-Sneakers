const { resolveInclude } = require("ejs");
const dbParams = require("../lib/db");


const getMyCollection = function(userId) {

  const queryString = `
  SELECT posted_ads.*
  FROM posted_ads
  WHERE owner_id = $1
  `;

  return db.query(queryString, userId)
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

  const queryString = 'DELETE FROM posted_ads WHERE id = $1';

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
