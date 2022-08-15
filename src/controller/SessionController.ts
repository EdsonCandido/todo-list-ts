import { Request, Response } from "express";
import { AuthenticateUserService } from "../service/AuthenticateUserService";

export class SessionController {
  async session(req: Request, res: Response): Promise<Response> {
    try {
      const { document, password } = req.body;
      const authenticateService = new AuthenticateUserService();

      const result = await authenticateService.execute({ document, password });

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}
