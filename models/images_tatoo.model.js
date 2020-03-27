const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imagesSchema = new Schema({
  src: String
});

const Images_tatoo = mongoose.model("Images_tatoo", imagesSchema);

module.exports = Images_tatoo;
