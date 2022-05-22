const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const path = require("path");
const MongoStore = require("connect-mongo");

router.get("/new", (req, res) => {
  if (req.session.userId) {
    res.render("site/addpost");
  } else {
    res.redirect("/users/login");
  }
});
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .lean()
    .then((post) => {
      res.render("site/post", { post: post });
    });
});
router.post("/test", (req, res) => {
  let post_image = req.files.post_image;
  post_image.mv(
    path.resolve(__dirname, "../public/img/postimages", post_image.name)
  );
  Post.create({
    ...req.body,
    post_image: `/img/postimages/${post_image.name}`,
  });
  req.session.sessionFlashSuccess = {
    type: "alert alert-success",
    message: "Postunuz başarılı bir şekilde oluşturuldu",
  };
  res.redirect("/blog");
});

module.exports = router;
