import BaseController from "./base.controller";

class ChoresController extends BaseController {
  constructor() {
    super();
  }

  async routes() {
    this.router.get("/", (req, res) => res.send("Funcionando"));
  }
}

export default ChoresController;