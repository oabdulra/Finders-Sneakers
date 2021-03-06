// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

// PG database
const db = require("./db/dbqueries");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(cookieSession({
  name: "session",
  keys: ["key 1"]
}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const sneakersRoutes = require("./routes/sneakers");
const myCollectionRoutes = require("./routes/my-collection");
const myFavsRoutes = require("./routes/my-favs");
const messages = require("./routes/messages");

// Mount all resource routes
app.use("/users", usersRoutes(db));
app.use("/sneakers", sneakersRoutes(db));
app.use("/mycollection", myCollectionRoutes(db));
app.use("/myfavs", myFavsRoutes(db));
app.use("/messages", messages(db));

app.get("/", (req, res) => {
  db.getMostFavourited(limit = 5)
    .then(sneakers => {
      const user_id = req.session.user_id;
      if (!user_id) {
        return res.render("sneakers", {sneakers, user: null});
      }
      db.getUserWithId(user_id)
        .then(user => {
          res.render("index", {user, sneakers});
        })
        .catch(e => res.send(e));
    })
    .catch(e => res.send(e));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
