const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const passport = require("passport");
(async function () {
  await mongoose.connect("mongodb://localhost/my_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
})();

const User = new Schema({
  email: { type: String },
  password: { type: String },
});
const UserModel = mongoose.model("User", User);
/*UserModel.findOne({ email: "djillou500@gmail.com" }, function (err, docs) {
  if (err) {
    console.log(err);
  } else {
    console.log(docs);
  }
});*/
/*bcrypt.hash("w", 10, function (err, hash) {
  var new_user = new UserModel({
    email: "djillou500@gmail.com",
    password: hash,
  });
  new_user.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});*/

passport.serializeUser((user, done) => {
  done(null, user.email);
});
passport.deserializeUser((email, done) => {
  UserModel.findOne({ email: email }, (err, user) => {
    done(err, user);
  });
});
passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallBack: true,
    },
    async (email, password, done) => {
      UserModel.findOne({ email: email }, function (err, user) {
        if (err) throw err;
        if (user == null) return done(null, false);
        if (err) throw err;
        bcrypt.compare(password, user.password, function (err, result) {
          if (result == true) return done(null, user);
          else return done(null, false);
        });
      });
    }
  )
);
module.exports = passport;
