import { Request, Response } from "express";
import { resolve } from "path";
import { CompleteTodoByIdService } from "../service/CompleteTodoByIdService";
import { FindAllTodosServices } from "../service/FindAllTodosServices";
import { FindByIdTodoService } from "../service/FindByIdTodoService";
import { NewTodoService } from "../service/NewTodoService";
import { UpdateTodoByIdService } from "../service/UpdateTodoByIdService";

export class TodosController {
  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const todosService = new FindAllTodosServices();

      const result = await todosService.execute();

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const todosService = new FindByIdTodoService();
      const result = await todosService.execute(Number(id));
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description, user_id } = req.body;
      const todosService = new NewTodoService();

      const result = await todosService.execute({
        title,
        description,
        user_id,
      });
      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, is_active } = req.body;

      const todosService = new UpdateTodoByIdService();
      const result = await todosService.execute({
        title,
        description,
        is_active,
        id_todo: id,
      });

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
  async complete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const todoService = new CompleteTodoByIdService();
      const result = await todoService.execute(Number(id));

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
