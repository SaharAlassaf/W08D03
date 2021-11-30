const userModel = require("./../../db/models/user");
const taskModel = require("./../../db/models/task");

//Sow all tasks for Admin
const tasks = (req, res) => {
  taskModel
    .find({})
    .populate("byUser")
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

//Show task by id
const task = (req, res) => {
  const { id } = req.params;
  taskModel
    .findById(id)
    .where("isDel")
    .equals(false)
    .exec()
    .then((result) => {
      if (result) {
        res.status(201).send(result);
      } else {
        res.status(404).send("Task is not exist");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

//Show deleted task for Admin
const delatedTask = (req, res) => {
  taskModel
    .find({ isDel: { $eq: false } })
    .exec()
    .then((result) => {
      if (result) {
        res.status(201).send(result);
      } else {
        res.status(404).send("There is no task");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

//Add task
const createTask = (req, res) => {
  const { name } = req.body;

  const newTask = new taskModel({
    name,
    byUser: req.token.id,
  });

  newTask
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// update task
const updateTask = (req, res) => {
  const { id } = req.params;
  const { name, isDel } = req.body;

  taskModel
    .findByIdAndUpdate(id, { name, isDel }, { new: true })
    .exec()
    .then((result) => {
      if (result) {
        res.status(201).send(result);
      } else {
        res.status(404).send("Failed update");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// delete task
const deleteTask = (req, res) => {
  const { id } = req.params;

  taskModel
    .findOneAndUpdate(
      { id, byUser: req.token.id, isDel: { $eq: false } },
      { isDel: true },
      { new: true }
    )
    .exec()
    .then((result) => {
      if (result) {
        res.status(201).send(result);
      } else {
        res.status(404).send("It's deleted");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  tasks,
  createTask,
  task,
  delatedTask,
  updateTask,
  deleteTask,
};
