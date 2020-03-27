const express = require("express");
const router = express.Router();
let Admin = require("../../models/admin.model");

router.route("/login").post((req, res) => {
  Admin.find()
    .then(admin => {
      if (
        admin[0].admin === req.body.admin &&
        admin[0].password === req.body.password
      ) {
        res.json("ok");
      } else {
        res.json("wrong password");
      }
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
