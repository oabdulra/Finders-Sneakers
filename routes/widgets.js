/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // display info about app and team
  router.get("/about", (req, res) => {
    res.render("about", {userID: req.session.user_id});
  });

  // display all sneaker ads
  router.get("/sneakers", (req, res) => {
    db.getAllSneakers(req.query)
    .then(properties => {
      const templateVars = {
        properties: properties,
        userID: req.session.user_id
      }
      res.render("sneakers", templateVars);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  });

  // display individual sneaker ad
  router.get("/sneakers/:id", (req, res) => {
    db.getAllSneakers(req.query)
    .then(properties => {
      const templateVars = {
        properties: properties,
        userID: req.session.user_id
      }
      res.render("sneakers", templateVars);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  });

  // display form to contact seller
  router.get("/sneakers/:id/contact", (req, res) => {
    res.render("sneakers_show_contact", {userID: req.session.user_id});
  });

  // display form to create new sneaker ad
  router.get("/sneakers/new", (req, res) => {
    res.render("sneakers_new", {userID: req.session.user_id});
  });

  // display user's own ads
  router.get("/mycollection", (req, res) => {

  });

  // display user's favourited ads
  router.get("/myfavs", (req, res) => {

  });

  // create new ad
  router.post("/sneakers", (req, res) => {

  });

  // contact seller associated with sneaker ad
  router.post("/sneakers/:id", (req, res) => {

  });

  // delete user's own ad from my collections
  router.post("/mycollection/:id/delete", (req, res) => {

  });

  // add sneaker ad to favs collection
  router.post("/myfavs", (req, res) => {

  });

  return router;
};
