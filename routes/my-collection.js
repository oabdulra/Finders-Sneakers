const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // display user's own ads
  router.get("/", (req, res) => {
    //ADD CODE
  });

  // delete user's own ad from my collections
  router.post("/:id/delete", (req, res) => {
    //ADD CODE
  });

  // delete user's own ad from my collections
  router.post("/:id/delete", (req, res) => {
    //ADD CODE
  });

  return router;
};
