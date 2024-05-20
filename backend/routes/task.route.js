const express = require("express");
const { body, param, validationResult } = require("express-validator");
const router = express.Router();
const controller = require("../controller/Task.controller");

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation rules
const validateTaskCreation = [
  body("title").notEmpty().withMessage("Title is required"),
  validate,
];

const validateTaskUpdate = [
  param("id").isMongoId().withMessage("Invalid task ID"),
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  validate,
];

const validateTaskOrderChange = [
  body("taskOrder").isArray().withMessage("Order must be an array"),
  validate,
];

// Define routes with validation middleware
router.get("/", controller.list);

router.post("/", validateTaskCreation, controller.create);

router.put("/:id", validateTaskUpdate, controller.update);

router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid task ID"), validate],
  controller.delete
);

router.patch("/update-order", validateTaskOrderChange, controller.changeOrder);

module.exports = router;
