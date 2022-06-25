/* OSAMA: need these functions from db.js :
 - function getMyFavs(userId) ==> returns array of sneaker objects
 - function getUserWithId(userId) ==> returns user object
 - function addToMyFavs(sneakerObject) ==> add new sneaker to favs db
 - function deleteFromMyFavs(sneakerObject) ==> remove sneaker from favs db
*/
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
  router.post("/", (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
      res.error("error");
      return;
    }
    db.addToMyFavs({...req.body, owner_id: user_id})
      .then(() => {
        res.redirect("/");
      })
      .catch(e => res.send(e));
  });

  // delete sneaker ad from favs collection
  router.post("/:id/delete", (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
      res.error("error");
      return;
    }
    db.deleteFromMyFavs(req.query)
      .then(() => {
        res.redirect("/");
      })
      .catch(e => res.send(e));
  });

  return router;
};
