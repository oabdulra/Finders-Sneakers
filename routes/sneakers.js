const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // if have time, implement about page

  // display all sneaker ads
  router.get("/", (req, res) => {
    db.getAllSneakers(req.query)
    .then(sneakers => {
      const user_id = req.session.user_id;
      if (!user_id) {
        res.render("sneakers", {sneakers, user: null})
      }
      const user = db.user;
      res.render("sneakers", {sneakers, user: {id: user.id, email: user.email}});
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  });

  // display individual sneaker ad
  router.get("/:id", (req, res) => {
    db.getOneSneaker(req.query)
    .then(sneaker => {
      const user_id = req.session.user_id;
      if (!user_id) {
        res.render("sneakers_show", {sneaker, user: null});
      }
      const user = db.user;
      res.render("sneakers_show", {sneaker, user: {id: user.id, email: user.email}});
    })
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
