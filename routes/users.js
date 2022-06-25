const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // display form to register
  router.get("/register", (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
      res.render("register", {user: null});
    }
    const user = db.user;
    res.render("register", {user: {id: user.id, email: user.email}});
  });

  // create new user
  router.post("/register", (req, res) => {
    const user = req.body;
    db.addUser(user)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.user_id = user.id;
      res.redirect("/sneakers", {user: {id: user.id, email: user.email}});
    })
    .catch(e => res.send(e));
  });

  // display form to login
  router.get("/login", (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
      res.render("login", {user: null});
    }
    const user = db.user;
    res.render("login", {user: {id: user.id, email: user.email}});
  });

  // check if user exists with given email
  const login =  function(email) {
    return db.getUserWithEmail(email)
    .then(user => {
      if (user.email) {
        return user;
      }
      return null;
    })
    .catch(e => {
      res.send(e);
    });
  }
  exports.login = login;

  // login to existing account
  router.post("/login", (req, res) => {
    const {email} = req.body;
    login(email)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.user_id = user.id;
        res.redirect("/sneakers", {user: {id: user.id, email: user.email}});
      })
      .catch(e => {
        res.send(e);
      })
  });

  // logout of account
  router.post("/logout", (req, res) => {
    req.session.user_id = null;
    res.redirect("/sneakers", {user: null});
  });

  return router;
};
