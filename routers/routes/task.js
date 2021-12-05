const express = require("express");
const { tasks, task, createTask, delatedTask, updateTask, deleteTask } = require("../controllers/task");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

const taskRouter = express.Router();

taskRouter.get("/tasks", authentication, authorization, tasks); //just Admin
taskRouter.get("/delatedTask", authentication,authorization, delatedTask); //just Admin
taskRouter.post("/createTask", authentication, createTask);

taskRouter.get("/:id", authentication, task);
taskRouter.put("/updateTask/:id", authentication, updateTask);
taskRouter.delete("/deleteTask/:id", authentication, deleteTask);


module.exports = taskRouter;
