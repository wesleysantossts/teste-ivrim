import express, { Router } from "express";
import cors from "cors";
import routes from "../routes";
const PORT = process.env.ENV === "local" ?
  parseInt(process.env.PORT_LOCAL!, 10) :
  parseInt(process.env.PORT!, 10);

class Server {
  readonly server: express.Express;
  private readonly port: number = PORT;
  private readonly basePathApi: string = '/api';
  
  constructor() {
    this.server = express();
  }

  initialize() {
    this.middlewares();
    this.controllers();
    this.listen();
  }

  middlewares() {
    this.server.use(
      this.basePathApi,
      cors(),
      express.urlencoded({extended: true})
    );
  }

  async controllers() {
    this.server.use(this.basePathApi, routes);
  }

  listen() {
    this.server.listen(this.port, () => console.log(`Servidor rodando na porta ${this.port}`));
  }
}

export default Server;