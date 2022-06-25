const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // display user's favourited ads
  router.get("/", (req, res) => {
    //ADD CODE
  });

  // add sneaker ad to favs collection
  router.post("/", (req, res) => {
    //ADD CODE
  });

  // delete sneaker ad from favs collection
  router.post("/:id/delete", (req, res) => {
    //ADD CODE
  });

  return router;
};
