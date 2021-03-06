const router = require("express").Router();
const News_tatoo = require("../../models/news_tatoo.model");
const Images_tatoo = require("../../models/images_tatoo.model");

router.route("/news_list").get((req, res) => {
  News_tatoo.find()
    .then(news => res.json(news))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/images_list").get((req, res) => {
  Images_tatoo.find()
    .then(images => res.json(images))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
