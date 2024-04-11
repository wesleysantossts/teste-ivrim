import TaskService from "../services/task.service";
import { TaskPayload, Status } from "../@dtos/task.dto";

class TaskUsecase {
  static async index() {
    const tasks = await TaskService.index();
    return tasks;
  }

  static async show({id}:{id?: string}) {
    if(!id) throw new Error("O \"id\" da tarefa é obrigatório");
    const foundTask = await TaskService.show(parseInt(id!));
    return foundTask;
  }

  static async store({ titulo, descricao, status }: TaskPayload) {
    if (
      !titulo ||
      !descricao ||
      !status
    ) throw new Error("Os campos \"titulo\", \"descricao\" e \"status\" são obrigatórios");
    if (!Object.values(Status).includes(status as Status)) throw new Error("O status deve ser \"a fazer\", \"em andamento\" e \"concluido\"");

    const payload = { titulo, descricao, status };
    const createdTask = await TaskService.store(payload);

    return createdTask;
  }

  static async update(req: Request, res: Response) { }

  static async delete({id}: {id?: string}): Promise<boolean> {
    if(!id) throw new Error("O \"id\" da tarefa é obrigatório");
    const deletedTask = await TaskService.delete(parseInt(id!));
    return deletedTask;
  }
}

export default TaskUsecase;