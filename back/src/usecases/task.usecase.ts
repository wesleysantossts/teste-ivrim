import TaskService from "../services/task.service";
import { TaskPayload, Status } from "../@dtos/task.dto";
import { CustomError } from "src/utils/error.utils";

class TaskUsecase {
  static async index() {
    const tasks = await TaskService.index();
    return tasks;
  }

  static async show({ id }: { id?: string }) {
    if (!id) throw new CustomError("O \"id\" da tarefa é obrigatório", 400);
    const foundTask = await TaskService.show(parseInt(id!));
    return foundTask;
  }

  static async store({ titulo, descricao, status }: TaskPayload) {
    if (
      !titulo ||
      !descricao ||
      !status
    ) throw new CustomError("Os campos \"titulo\", \"descricao\" e \"status\" são obrigatórios", 400);
    if (!Object.values(Status).includes(status as Status)) throw new CustomError("O status deve ser \"a fazer\", \"em andamento\" e \"concluido\"", 400);

    const payload = { titulo, descricao, status };
    const createdTask = await TaskService.store(payload);

    return createdTask;
  }

  static async update({ titulo, descricao, status }: TaskPayload) {
    if (
      !titulo &&
      !descricao &&
      !status
    ) throw new CustomError("Deve conter o campo \"titulo\", \"descricao\" ou \"status\" para realizar a atualização", 400);
  }

  static async delete({ id }: { id?: string }): Promise<boolean> {
    if (!id) throw new CustomError("O \"id\" da tarefa é obrigatório", 400);
    const deletedTask = await TaskService.delete(parseInt(id!));
    return deletedTask;
  }
}

export default TaskUsecase;