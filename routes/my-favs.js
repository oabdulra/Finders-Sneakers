const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // display user's favourited ads
  router.get("/", (req, res) => {

  });

  // add sneaker ad to favs collection
  router.post("/", (req, res) => {

  });

  // delete sneaker ad from favs collection
  router.post("/:id/delete", (req, res) => {

  });

  return router;
};
