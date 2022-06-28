const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // display user's favourited ads
  router.get("/", (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
      res.error("error");
      return;
    }
    db.getMyFavs(user_id)
      .then(myfavs => {
        db.getUserWithId(user_id)
          .then(user => {
            res.render("my_favs", {myfavs, user});
          })
          .catch(e => res.send(e));
      })
      .catch(e => res.send(e));
  });

  // add sneaker ad to favs collection
  router.post("/:id", (req, res) => {
    const user_id = req.session.user_id;
    const sneakerId = req.params.id;
    if (!user_id) {
      res.error("error");
      return;
    }
    db.addToMyFavs(sneakerId, user_id)
      .then(() => {
        res.redirect("/myfavs");
      })
      .catch(e => res.send(e));
  });

  // delete sneaker ad from favs collection
  router.post("/:id/delete", (req, res) => {
    const sneakerId = req.params.id;
    const user_id = req.session.user_id;
    if (!user_id) {
      res.error("error");
      return;
    }
    db.deleteFromMyFavs(sneakerId)
      .then(() => {
        res.redirect("/myfavs");
      })
      .catch(e => res.send(e));
  });

  return router;
};
