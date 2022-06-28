const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // display messages
  router.get("/", (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
      res.error("error");
      return;
    }
    db.getUserWithId(user_id)
    .then(user => {
      res.render("messages", {user});
    })
    .catch(e => res.send(e));
  })


  return router;
};
