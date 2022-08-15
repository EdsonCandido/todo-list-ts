import { Router } from "express";
import usersRoutes from "./users.router";
import sessionRoutes from "./session.router";
import todoRoutes from "./todo.router";

const routes = Router();

routes.get("/", (req, res) => res.json({ result: "bem-vindo" }));

routes.use("/todos", todoRoutes);
routes.use("/users", usersRoutes);
routes.use("/session", sessionRoutes);

export default routes;
