/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // display form to register
  router.get("/register", (req, res) => {
    res.render("register");
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
      req.session.userId = user.id;
      res.redirect("/sneakers", {userID: req.session.user_id});
    })
    .catch(e => res.send(e));
  });

  // display form to login
  router.get("/login", (req, res) => {
    res.render("login", {userID: req.session.user_id});
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
        req.session.userId = user.id;
        res.redirect("/sneakers", {userID: req.session.user_id});
      })
      .catch(e => {
        res.send(e);
      })
  });

  // logout of account
  router.post("/logout", (req, res) => {
    req.session.userId = null;
    res.redirect("/sneakers", {userID: req.session.user_id});
  });

  return router;
};
