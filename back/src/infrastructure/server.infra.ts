import express, { Router } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

class Server {
  private readonly server: express.Express;
  private readonly port: number = Number(process.env.PORT);
  private readonly basePathApi: string = '/api';
  private readonly basePathControllers: string = '/controllers';
  
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
      "/api",
      cors(),
      express.json(),
      express.urlencoded({extended: true})
    );
  }

  async controllers() {
    const router: Router[] = [];
    const controllersPath = path.join(__dirname, "..", this.basePathControllers);
    const files = fs.readdirSync(controllersPath);
    if(files.length > 0) {
      for(const file of files) {
        const controller = await import(path.join("..", this.basePathControllers, file));
        const initializedController = new controller.default();
        if(initializedController.routes) {
          initializedController.routes();
          router.push(initializedController.router);
        }
      }
    }

    this.server.use(this.basePathApi, router);
  }

  listen() {
    this.server.listen(this.port, () => console.log(`Servidor rodando na porta ${this.port}`));
  }
}

export default Server;