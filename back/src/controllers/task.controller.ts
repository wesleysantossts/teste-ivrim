import { ErrorRequestHandler, Request, Response } from "express";
import TaskUsecase from "../usecases/task.usecase";
import { TaskPayload } from "../@dtos/task.dto";

class TaskController {
  static async index(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await TaskUsecase.index();
      res.json({ data: tasks });
    } catch (error: any) {
      res.status(500).json({ message: error?.message, error });
    }
  }

  static async show(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await TaskUsecase.show(req.params);
      res.json({ data: tasks });
    } catch (error: any) {
      res.status(error?.status || 500).json({ message: error?.message, error });
    }
  }

  static async store(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await TaskUsecase.store(req.body as TaskPayload);
      res.json({ data: tasks });
    } catch (error: any) {
      res.status(500).json({ message: error?.message, error });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await TaskUsecase.index();
      res.json({ data: tasks });
    } catch (error: any) {
      res.status(500).json({ message: error?.message, error });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await TaskUsecase.delete(req.params);
      res.json({ data: tasks });
    } catch (error: any) {
      res.status(error?.status || 500).json({ message: error?.message, error });
    }
  }
}

export default TaskController;