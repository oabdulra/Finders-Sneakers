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
        db.getUserWithId(user_id)
          .then(user => {
            res.render("sneakers", {sneakers, user});
          })
          .catch(e => res.send(e));
      })
      .catch(e => res.send(e));
  });

  // display form to create new sneaker ad
  router.get("/new", (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
      res.send({error: "error"});
    }
    db.getUserWithId(user_id)
      .then(user => {
        res.render("sneakers_new", {user});
      })
      .catch(e => res.send(e));
  });

  // display individual sneaker ad
  router.get("/:id", (req, res) => {
    const sneakerId = req.params.id;
    db.getOneSneaker(sneakerId)
      .then(sneaker => {
        const user_id = req.session.user_id;
        if (!user_id) {
          res.render("sneakers_show", {sneaker, user: null});
        }
        db.getUserWithId(user_id)
          .then(user => {
            res.render("sneakers_show", {sneaker, user});
          })
          .catch(e => res.send(e));
      })
      .catch(e => res.send(e));
  });

  // display form to contact seller
  router.get("/:id/contact", (req, res) => {
    const sneakerId = req.params.id;
    db.getOneSneaker(sneakerId)
      .then(sneaker => {
        const user_id = req.session.user_id;
        if (!user_id) {
          res.send({error: "error"});
        }
        db.getUserWithId(user_id)
          .then(user => {
            res.render("sneakers_show_contact", {sneaker, user});
          })
          .catch(e => res.send(e));
      })
      .catch(e => res.send(e));
  });

  // create new ad
  router.post("/", (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
      res.send({error: "error"});
    }

    db.addNewSneaker({...req.body, owner_id: user_id})
      .then(sneaker => {
        res.redirect(`/sneakers/${sneaker.id}`);
      })
      .catch(e => res.send("error"));
  });

  // delete ad
  router.post("/:id/delete", (req, res) => {
    const sneakerId = req.params.id;

    const user_id = req.session.user_id;
    if (!user_id) {
      res.send({error: "error"});
    }
    db.deleteOneSneaker(sneakerId)
      .then(() => {
        res.redirect("/sneakers");
      })
      .catch(e => res.send(e));
  });

  // mark ad as sold
  router.post("/:id/sold", (req, res) => {
    const sneakerId = req.params.id;
    const user_id = req.session.user_id;
    if (!user_id) {
      res.send({error: "error"});
    }
    db.markSneakerAsSold(sneakerId)
      .then(() => {
        res.redirect("/mycollection");
      })
      .catch(e => res.send(e));
  });

  // contact seller associated with sneaker ad
  router.post("/:id", (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
      res.send({error: "error"});
    }
    if (req.body) {
      res.redirect("/sneakers");
    } else {
      res.send({error: "error"});
    }
  });

  return router;
};
