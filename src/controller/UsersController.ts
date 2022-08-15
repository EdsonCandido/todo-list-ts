import { Request, Response } from "express";
import { FindAllUsersService } from "../service/FindAllUsersService";
import { FindByIdUserService } from "../service/FindByIdUserService";
import { NewUserService } from "../service/NewUserService";

export class UsersController {
  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const userService = new FindAllUsersService();
      const result = await userService.execute();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  async findOneById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const userRepository = new FindByIdUserService();

      const result = await userRepository.execute(Number(id));

      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, fullname, email, is_admin, document, password } = req.body;
      const userService = new NewUserService();
      const result = await userService.execute({
        name,
        fullname,
        email,
        is_admin,
        document,
        password,
      });
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
