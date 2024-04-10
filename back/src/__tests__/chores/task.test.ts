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
      expect(response.statusCode).toEqual(500);
      expect(response.body.message).toBeDefined()
      expect(response.body.message).toBe("Os campos \"titulo\", \"descricao\" e \"status\" são obrigatórios");
    });
  });
});