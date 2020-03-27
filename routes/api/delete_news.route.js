const express = require("express");
const router = express.Router();
const News_tatoo = require("../../models/news_tatoo.model");

router.route("/:id").post((req, res) => {
  News_tatoo.findByIdAndDelete(req.params.id)
    .then(() => res.json("news deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;
