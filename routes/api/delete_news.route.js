const express = require("express");
const router = express.Router();
const News_tatoo = require("../../models/news_tatoo.model");

router.route("/:id").post((req, res) => {
  News_tatoo.findByIdAndDelete(req.params.id)
    .then(() => res.json("news deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/update").get((req, res) => {
  News_tatoo.find()
    .then(news => res.json(news))
    .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;
