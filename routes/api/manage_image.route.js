const express = require("express");
const router = express.Router();
const Images_tatoo = require("../../models/images_tatoo.model");

router.route("/add_image").post((req, res) => {
  const imageSrc = req.body.link;
  const newImage = new Images_tatoo({
    src: imageSrc
  });

  newImage
    .save()
    .then(() => res.json("Image added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("delete_image/:id").post((req, res) => {
  News_tatoo.findByIdAndDelete(req.params.id)
    .then(() => res.json("news deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;
