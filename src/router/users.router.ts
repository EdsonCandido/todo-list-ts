import { Router } from "express";
import { UsersController } from "../controller/UsersController";
import IsAuthenticated from "../middleware/IsAuthenticated";

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get("/", IsAuthenticated, usersController.findAll);
usersRoutes.get("/:id", IsAuthenticated, usersController.findOneById);
usersRoutes.post("/", IsAuthenticated, usersController.create);

export default usersRoutes;
