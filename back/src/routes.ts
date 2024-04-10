import express from "express";
import TaskController from "./controllers/task.controller";
const routes = express();
routes.use(express.json());

routes
  .get("/tasks", TaskController.index)
  .get("/task/:id", TaskController.show)
  .post("/task", TaskController.store)
  .put("/task/:id", TaskController.update)
  .delete("/task/:id", TaskController.delete);

export default routes;