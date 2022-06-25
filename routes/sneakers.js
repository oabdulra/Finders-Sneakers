const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // display info about app and team
  router.get("/about", (req, res) => {
    res.render("about", {userID: req.session.user_id});
  });

  // display all sneaker ads
  router.get("/", (req, res) => {
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
  router.get("/:id", (req, res) => {
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
  router.get("/:id/contact", (req, res) => {
    res.render("sneakers_show_contact", {userID: req.session.user_id});
  });

  // display form to create new sneaker ad
  router.get("/new", (req, res) => {
    res.render("sneakers_new", {userID: req.session.user_id});
  });

  // create new ad
  router.post("/", (req, res) => {
    //ADD CODE
  });

  // contact seller associated with sneaker ad
  router.post("/:id", (req, res) => {
    //ADD CODE
  });

  return router;
};
