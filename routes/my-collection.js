const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // display user's own ads
  router.get("/", (req, res) => {

  });

  // delete user's own ad from my collections
  router.post("/:id/delete", (req, res) => {

  });

  // delete user's own ad from my collections
  router.post("/:id/delete", (req, res) => {

  });

  return router;
};
