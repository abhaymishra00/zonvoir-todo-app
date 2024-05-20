const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("/api running");
});

router.use("/tasks", require("./task.route"));

module.exports = router;
