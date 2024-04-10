import routes from "../../routes";
import supertest from "supertest";
const request = supertest(routes);

describe('GET chores - Listar tarefas', () => {
  it('Inicializar o servidor', async () => {
    const response = await request.get("/chores");
    // const {body: data} = response;

    expect(response.statusCode).toEqual(200);
  });
});