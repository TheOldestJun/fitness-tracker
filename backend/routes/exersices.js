const { Router } = require("express");
const router = Router();

let Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((e) => res.status(400).json(`Error: ${e.message}`));
});

router.route("/add").post((req, res) => {
  const { username, description } = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });
  newExercise
    .save()
    .then(() => res.json("Exercise added"))
    .catch((e) => res.status(400).json(`Error: ${e.message}`));
});

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((e) => res.status(400).json(`Error: ${e.message}`));
});

router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);
      exercise
        .save()
        .then(() => res.json("Exercise updated"))
        .catch((e) => res.status(400).json(`Error: ${e.message}`));
    })
    .catch((e) => res.status(400).json(`Error: ${e.message}`));
});

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted"))
    .catch((e) => res.status(400).json(`Error: ${e.message}`));
});

module.exports = router;
