import { TaskTest } from "src/@dtos/tests.dto";
import routes from "../../routes";
import supertest from "supertest";
const request = supertest(routes);

describe('Ivrim - Kanban', () => {
  describe("Infraestrutura", () => {
    it('Inicializar o servidor', async () => {
      const response = await request.get("/tasks");
  
      expect(response.statusCode).toEqual(200);
    });
  });

  describe("GET tasks - Listar tarefas", () => {
    it('Ter uma resposta que não seja undefined ou null', async () => {
      const response = await request.get("/tasks");
      const {body: { data }} = response;
  
      expect.assertions(2);
      expect(response.statusCode).toEqual(200);
      expect(data).toBeDefined();
    })
  });

  describe("GET task - Listar tarefa específica", () => {
    let taskTest: TaskTest = {
      titulo: "Teste de tarefa",
      descricao: "Este é um teste de tarefa",
      status: "a fazer"
    };

    afterEach(async () => {
      if (taskTest.id) await request.delete(`/task/${taskTest.id}`);
    });

    it('Ter uma resposta que não seja undefined ou null', async () => {
      const response = await request.post("/task").send(taskTest);
      const {data} = response.body;
      if (data.id) taskTest.id = data.id;
  
      expect.assertions(2);
      expect(response.statusCode).toEqual(200);
      expect(data).toBeDefined();
    });

    it("Retorna uma tarefa com os campos \"id\", \"titulo\", \"descricao\", \"status\", \"criadoEm\"", async () => {
      const response = await request.post("/task").send(taskTest);
      const {data} = response.body;
      taskTest.id = data.id;
      const foundTask = await request.get(`/task/${data.id}`);
      const {data: foundTaskData} = foundTask.body;

      expect.assertions(2);
      expect(foundTask.statusCode).toEqual(200);
      expect(foundTaskData).toEqual({
        id: expect.any(Number),
        titulo: expect.any(String),
        descricao: expect.any(String),
        status: expect.any(String),
        criadoEm: expect.any(String),
      });
    });
  });
  
  describe("POST task - Criar tarefa", () => {
    let taskTest: TaskTest = {
      titulo: "Teste de tarefa",
      descricao: "Este é um teste de tarefa",
      status: "a fazer"
    };

    afterEach(async () => {
      if (taskTest.id) await request.delete(`/task/${taskTest.id}`);
    });

    it("Ter uma resposta que não seja undefined ou null", async () => {
      const response = await request.post("/task").send(taskTest);
      const {data} = response.body;
      if (data.id) taskTest.id = data.id;

      expect.assertions(2);
      expect(response.statusCode).toEqual(200);
      expect(data).toBeDefined();
    });

    it("Retorna um campo \"id\", \"titulo\", \"descricao\", \"status\", \"criadoEm\"", async () => {
      const response = await request.post("/task").send(taskTest);
      const {data} = response.body;
      if (data.id) taskTest.id = data.id;

      expect.assertions(2);
      expect(response.statusCode).toEqual(200);
      expect(data).toEqual({
        id: expect.any(Number),
        titulo: expect.any(String),
        descricao: expect.any(String),
        status: expect.any(String),
        criadoEm: expect.any(String),
      });
    });

    it("Ter uma mensagem de erro caso o usuário não envie os campos obrigatórios", async () => {
      const response = await request.post("/task");

      expect.assertions(3);
      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toBeDefined()
      expect(response.body.message).toBe("Os campos \"titulo\", \"descricao\" e \"status\" são obrigatórios");
    });
  });
  
  describe("UPDATE task - Criar tarefa", () => {
    let taskTest: TaskTest = {
      titulo: "Teste de tarefa",
      descricao: "Usado para fazer a criação da tarefa",
      status: "a fazer"
    };
    let taskUpdateTest: TaskTest = {
      titulo: "Teste de tarefa",
      status: "a fazer"
    };

    beforeEach(async () => {
      const response = await request.post("/task").send(taskTest);
      const {data: createdTask} = response.body;
      taskTest.id = createdTask.id;
    });

    afterEach(async () => {
      if (taskTest.id) await request.delete(`/task/${taskTest.id}`);
    });

    it("Ter uma resposta que não seja undefined ou null", async () => {
      const response = await request.put(`/task/${taskTest.id}`).send(taskUpdateTest);
      const {data} = response.body;

      expect.assertions(2);
      expect(response.statusCode).toEqual(200);
      expect(data).toBeDefined();
    });

    it("Retorna um campo \"id\", \"titulo\", \"descricao\", \"status\", \"criadoEm\"", async () => {
      const response = await request.put(`/task/${taskTest.id}`).send(taskUpdateTest);
      const {data} = response.body;

      expect.assertions(2);
      expect(response.statusCode).toEqual(200);
      expect(data).toEqual({
        id: expect.any(Number),
        titulo: expect.any(String),
        descricao: expect.any(String),
        status: expect.any(String),
        criadoEm: expect.any(String),
      });
    });

    it("Retornar status \"404\" se não receber um \"id\"", async () => {
      const responseWithoutId = await request.put(`/task`).send(taskUpdateTest);

      expect.assertions(1);
      expect(responseWithoutId.statusCode).toEqual(404);
    });


    it("Ter uma mensagem de erro caso o usuário não envie ao menos um dos campos obrigatórios", async () => {
      const response = await request.put(`/task/${taskTest.id}`);

      expect.assertions(3);
      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toBeDefined()
      expect(response.body.message).toBe("Deve conter o campo \"titulo\", \"descricao\" ou \"status\" para realizar a atualização");
    });
  });

  describe("DELETE task/:id - Deletar uma tarefa", () => {
    let taskTest: TaskTest = {
      titulo: "Teste de tarefa",
      descricao: "Este é um teste de tarefa",
      status: "a fazer"
    };

    afterEach(async () => {
      if (taskTest.id) await request.delete(`/task/${taskTest.id}`);
    });

    it("Retornar \"true\" quando a tarefa for deletada com sucesso", async () => {
      const response = await request.post("/task").send(taskTest);
      const {body: {data}} = response;
      const deleteResponse = await request.delete(`/task/${data.id}`);
      const {body: {data: deletedData}} = deleteResponse;

      expect.assertions(2);
      expect(deleteResponse.statusCode).toEqual(200);
      expect(deletedData).toBeTruthy();
    });

    it("Retornar status \"404\" se não receber um \"id\"", async () => {
      const response = await request.delete("/task");

      expect.assertions(1);
      expect(response.statusCode).toEqual(404);
    });

    it("Retornar mensagem de erro quando não tiver nenhuma tarefa com o \"id\" recebido", async () => {
      const response = await request.delete("/task/123146513");

      expect.assertions(2);
      expect(response.statusCode).toEqual(404);
      expect(response.body.message).toBe("Nenhuma tarefa encontrada com esse id");
    });
  });
});