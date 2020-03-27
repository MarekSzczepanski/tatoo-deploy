const express = require("express");
const router = express.Router();
const Images_tatoo = require("../../models/news_tatoo.model");

router.route("/add_image").post((req, res) => {
  const imageSrc = req.body.src;
  const newNews = new Images_tatoo({
    src: imageSrc
  });

  newNews
    .save()
    .then(() => res.json("Image added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
