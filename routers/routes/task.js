const express = require("express");
const { createTask } = require("../controllers/task");
const authentication = require("./../middlewares/authentication");

const taskRouter = express.Router();

taskRouter.post("/createTask", authentication, createTask);

module.exports = taskRouter;
