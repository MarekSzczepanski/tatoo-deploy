const express = require("express");
const router = express.Router();
const News_tatoo = require("../../models/news_tatoo.model");

router.route("/add").post((req, res) => {
  const news = req.body;
  const newNews = new News_tatoo({
    title: news.title,
    text: news.text
  });

  newNews
    .save()
    .then(() => res.json("News added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
