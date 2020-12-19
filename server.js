import { createRequire } from "module";
const require = createRequire(import.meta.url);
import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema.js";

import mongoose from "mongoose";

const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
import cors from "cors";
const corsOptions = {
  origin: "http://localhost:1234",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
const PORT = 8080;

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passport-config.cjs");

app.post("/connection", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.json({ message: "nope!" });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.json({
          message: "working!",
          link: "/accueil",
          connected: req.user,
        });
        console.log(req.user);
      });
    }
  })(req, res, next);
});
app.post(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: false,
  })
);

app.listen(PORT, () => console.log("Server started on " + PORT));
