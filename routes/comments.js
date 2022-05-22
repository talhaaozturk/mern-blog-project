const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

router.post("/:id", (req, res) => {
  Comment.create(req.body, (error, post) => console.log(post));
  res.redirect("/");
});

module.exports = router;
