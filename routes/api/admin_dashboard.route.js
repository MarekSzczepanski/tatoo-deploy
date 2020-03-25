const express = require("express");
const router = express.Router();
let auth;

router.route("/auth").post((req, res) => {
  auth = req.body;
});
router.route("/auth").get((req, res) => {
  res.json(auth);
});

module.exports = router;
