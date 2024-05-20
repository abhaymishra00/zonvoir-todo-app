const Task = require("../model/Task.model");

const list = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ order: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching tasks",
      error: error.message,
    });
  }
};

const create = async (req, res) => {
  req.body.order = 99999;
  const task = new Task(req.body);
  await task.save();
  res.json(task);
};

const update = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(task);
};

const deleteFun = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};

const changeOrder = async (req, res) => {
  const { taskOrder } = req.body;

  if (!Array.isArray(taskOrder)) {
    return res.status(400).json({ message: "Invalid task order" });
  }

  const bulkOps = taskOrder.map((task, index) => ({
    updateOne: {
      filter: { _id: task._id },
      update: { $set: { order: index } },
    },
  }));

  try {
    await Task.bulkWrite(bulkOps);
    const tasks = await Task.find().sort({ order: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task order", error });
  }
};

module.exports = {
  list,
  create,
  update,
  delete: deleteFun,
  changeOrder,
};
