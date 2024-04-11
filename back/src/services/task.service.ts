import { Task } from "@prisma/client";
import prisma from "../infrastructure/database.infra";
import { TaskPayload } from "src/@dtos/task.dto";
import moment from "moment";
import { CustomError } from "../utils/error.utils";

class TaskService {
  private static taskRepository = prisma.task;

  static async index(): Promise<Task[]> {
    const tasks = await this.taskRepository.findMany();
    return tasks;
  }

  static async show(id: number) {
    const foundTask = await this.taskRepository.findUnique({ where: { id } });
    if (!foundTask) throw new CustomError("Nenhuma tarefa encontrada com esse id", 404);
    return foundTask;
  }

  static async store(payload: TaskPayload): Promise<Task> {
    const createdTask = await this.taskRepository.create({ data: payload });
    return createdTask;
  }

  static async update(payload: TaskPayload & { id: number }): Promise<Task> {
    const updatedTask: Task = await this.taskRepository.update(
      {
        where: {
          id: payload.id
        },
        data: payload
      }
    );
    return updatedTask;
  }

  static async delete(id: number): Promise<boolean> {
    const deletedTask = await this.taskRepository.delete({ where: { id } });
    return !!deletedTask;
  }
}

export default TaskService;