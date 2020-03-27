const express = require("express");
const router = express.Router();
let Admin = require("../../models/admin.model");

/* let auth; */

router.route("/login").post((req, res) => {
  Admin.find()
    .then(admin => {
      if (
        admin[0].admin === req.body.admin &&
        admin[0].password === req.body.password
      ) {
        /*        auth = true; */
        res.json("ok");
      } else {
        /*         auth = false; */
        res.json("wrong password");
      }
    })
    .catch(err => res.status(400).json("Error: " + err));
});
/* router.route("/auth").get((req, res) => {
  if (auth === true) {
    res.json(auth);
  } else {
    res.json("heh");
  }
}); */

module.exports = router;
