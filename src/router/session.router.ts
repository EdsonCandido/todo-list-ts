import { Router } from "express";
import { SessionController } from "../controller/SessionController";

const sessionRoutes = Router();
const sessionController = new SessionController();

sessionRoutes.post("/login", sessionController.session);

export default sessionRoutes;
