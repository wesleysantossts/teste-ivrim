import routes from "../../src/routes";
import supertest from "supertest";
const request = supertest(routes);

describe('Tarefas no Kanban', () => {
  it('listar todas as tarefas', async () => {
    const response = await request.get("/chores");
    const {body: data} = response;

    expect(response.statusCode).toEqual(200);
  });
});