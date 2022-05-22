const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/register", (req, res) => {
  res.render("site/register");
});

router.post("/register", (req, res) => {
  User.create(req.body, (error, user) => {
    req.session.sessionFlashSuccess = {
      type: "alert alert-success",
      message: `Hoşgeldin..${user.username} Lütfen giriş yap`,
    };
    res.redirect("/users/login");
  });
});
router.get("/login", (req, res) => {
  res.render("site/login");
});
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (user) {
      if (user.password == password) {
        req.session.userId = user._id; //kullanıcı giriş yapmışsa, bunu kaydediyoruz (npm session kütüphanesi ile)
        req.session.sessionFlashSuccess = {
          type: "alert alert-success",
          message: "GİRİŞ BAŞARILI",
        };
        res.redirect("/");
      } else {
        req.session.sessionFlashSuccess = {
          type: "alert alert-danger",
          message: "HATALI GİRİŞ",
        };
        res.redirect("/users/login");
      }
    } else {
      req.session.sessionFlashSuccess = {
        type: "alert alert-danger",
        message: "LÜTFEN ÜYE OLUNUZ",
      };
      res.redirect("/users/register");
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
module.exports = router;
