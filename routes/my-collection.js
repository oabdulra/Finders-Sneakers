const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // display user's own ads
  router.get("/", (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
      res.error("error");
      return;
    }
    db.getMyCollection(user_id)
      .then(collection => {
        db.getUserWithId(user_id)
          .then(user => {
            res.render("my_collection", {collection, user});
          })
          .catch(e => res.send(e));
      })
      .catch(e => res.send(e));
  });

  return router;
};
