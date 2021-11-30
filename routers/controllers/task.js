const userModel = require("./../../db/models/user");
const taskModel = require("./../../db/models/task");

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

module.exports = { createTask };
