const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newsSchema = new Schema({
  src: String
});

const Images_tatoo = mongoose.model("Images_tatoo", newsSchema);

module.exports = Images_tatoo;
