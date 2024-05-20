const { Schema, model } = require("mongoose");

const TaskSchema = new Schema(
  {
    title: String,
    description: String,
    priority: String,
    completed: Boolean,
    order: Number,
  },
  { timestamps: true }
);

const Task = model("Task", TaskSchema);

module.exports = Task;
