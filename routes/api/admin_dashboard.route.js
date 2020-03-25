const express = require("express");
const router = express.Router();
let auth = false;

router.route("/auth").post((req, res) => {
  console.log("post", req.body);
  auth = req.body;
});
router.route("/auth").get((req, res) => {
  console.log("get", auth);
  res.json(auth);
});

module.exports = router;
