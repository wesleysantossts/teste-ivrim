import Server from "./infrastructure/server.infra";
import dotenv from "dotenv";
dotenv.config();

class App {
  private server: Server;
  
  constructor() {
    this.server = new Server();
  }

  initialize() {
    this.server.initialize();
  }
}

export default new App().initialize();