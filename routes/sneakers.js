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
          res.render("sneakers", {sneakers, user: null});
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
      });
  });

  // display form to contact seller
  router.get("/:id/contact", (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
      res.send({error: "error"});
    }
    const user = db.user;
    res.render("sneakers_show_contact", {user: {id: user.id, email: user.email}});
  });

  // display form to create new sneaker ad
  router.get("/new", (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
      res.send({error: "error"});
    }
    const user = db.user;
    res.render("sneakers_new", {user: {id: user.id, email: user.email}});
  });

  // create new ad
  router.post("/", (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
      res.send({error: "error"});
    }
    db.addNewSneaker({...req.body, owner_id: user_id})
    .then(sneaker => {
      res.redirect(`/${sneaker.id}`);
    })
    .catch(e => res.send(e));
  });

  // contact seller associated with sneaker ad
  router.post("/:id", (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
      res.send({error: "error"});
    }
    db.contactSeller({...req.body})
    .then(() => {
      alert("message sent to seller");
      res.redirect("/");
    })
    .catch(e => res.send(e));
  });

  return router;
};
