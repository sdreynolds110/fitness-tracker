const db = require("../models");

module.exports = function(app) {

  // Recalls All workouts
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(dbWorkouts => {
        for (const workout of dbWorkouts) {
          workout.setTotalDuration();
        }
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
  });

  // Recalls workout by ID
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.updateOne(
      { _id: req.params.id },
      { $push: { exercises: req.body } }
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  // Posts a workout
  app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
      .then(dbWorkout => {
        console.log(dbWorkout);
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  // Recalls the past 7 workouts
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .limit(7)
      .sort({ day: -1 })
      .then(dbWorkouts => {
        for (const workout of dbWorkouts) {
          workout.setTotalDuration();
        }
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
  });
};