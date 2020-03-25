const express = require("express");
const router = express.Router();

router.route("/auth").post((req, res) => {
  let auth = false;
  console.log("post", req.body);
  auth = req.body;
  router.route("/auth").get((req, res) => {
    console.log("get", auth);
    res.json(auth);
  });
});

module.exports = router;
