const { Router } = require("express");
const router = Router();

let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((e) => res.status(400).json(`Error: ${e.message}`));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });
  newUser
    .save()
    .then(() => res.json("User added"))
    .catch((e) => res.status(400).json(`Error: ${e.message}`));
});

router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted"))
    .catch((e) => res.status(400).json(`Error: ${e.message}`));
});

module.exports = router;
