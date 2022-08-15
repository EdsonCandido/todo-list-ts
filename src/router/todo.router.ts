import { Router } from "express";
import { TodosController } from "../controller/TodosController";
import IsAuthenticated from "../middleware/IsAuthenticated";

const todoRoutes = Router();
const todosController = new TodosController();

todoRoutes.get("/", IsAuthenticated, todosController.findAll);
todoRoutes.get("/:id", IsAuthenticated, todosController.findById);
todoRoutes.post("/", IsAuthenticated, todosController.create);
todoRoutes.put("/:id", IsAuthenticated, todosController.update);
todoRoutes.delete("/:id", IsAuthenticated, todosController.complete);

export default todoRoutes;
