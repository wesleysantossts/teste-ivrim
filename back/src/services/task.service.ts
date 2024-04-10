import { Task } from "@prisma/client";
import prisma from "../infrastructure/database.infra";
import { TaskPayload } from "src/@dtos/task.dto";
import moment from "moment";

class TaskService {
  private static taskRepository = prisma.task;

  static async index(): Promise<Task[]> {
    const tasks = await this.taskRepository.findMany();
    return tasks;
  }
  static async show(req: Request, res: Response) { }

  static async store({ titulo, descricao, status }: TaskPayload): Promise<Task> {
    const payload: any = { titulo, descricao, status };
    const createdTask = await this.taskRepository.create({ data: payload });
    return createdTask;
  }

  static async update(req: Request, res: Response) {}

  static async delete(id: number): Promise<Task> {
    const deletedTask = await this.taskRepository.delete({where: {id}});
    return deletedTask;
  }
}

export default TaskService;