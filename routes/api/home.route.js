const router = require("express").Router();
const News_tatoo = require("../../models/news_tatoo.model");

router.route("/news_list").get((req, res) => {
  News_tatoo.find()
    .then(news => res.json(news))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/images_list").post((req, res) => {
  const fs = require("fs");
  const path = req.body.path;

  fs.unlink(path, err => {
    if (err) {
      console.error(err);
      return;
    }
  });
});

module.exports = router;
