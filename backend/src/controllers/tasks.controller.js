import Task from "../models/tasks.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("user");
    res.status(200).json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving tasks", error: err.message });
  }
};

export const createTasks = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required." });
  }

  try {
    const newTask = new Task({
      title,
      description,
      user: req.user.id,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating task", error: err.message });
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ _id: id, user: req.user.id }).populate(
      "user"
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving task", error: err.message });
  }
};

export const updateTasks = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  if (!title && !description && completed === undefined) {
    return res
      .status(400)
      .json({ message: "At least one field must be provided for update." });
  }

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, description, completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating task", error: err.message });
  }
};

export const deleteTasks = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: err.message });
  }
};
