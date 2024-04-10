import Server from "./infrastructure/server.infra";
const routes = new Server().server;

routes
  .get("/chores", (req, res) => res.json({success: "teste"}))
  .get("/chore/:id", (req, res) => res.send("Funcionando"))
  .post("/chore", (req, res) => res.send("Funcionando"))
  .put("/chore/:id", (req, res) => res.send("Funcionando"))
  .delete("/chore/:id", (req, res) => res.send("Funcionando"));

export default routes;