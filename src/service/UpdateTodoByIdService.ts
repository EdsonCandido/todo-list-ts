import { getCustomRepository, Repository } from "typeorm";
import { Todo } from "../model/Todo";
import { TodosRepository } from "../repositories/TodosRepository";

interface IRequest {
  id_todo: number | string;
  title: string;
  description: string;
  is_active: string | number;
}
export class UpdateTodoByIdService {
  private todosRepository: Repository<Todo>;

  constructor() {
    this.todosRepository = getCustomRepository(TodosRepository);
  }

  public async execute({
    title,
    description,
    is_active,
    id_todo,
  }: IRequest): Promise<Todo> {
    const todo = await this.todosRepository.findOne(id_todo);

    if (!todo) throw new Error("Essa tarefa não existe");

    todo.title = title;
    todo.description = description;
    todo.is_active = Number(is_active);

    await this.todosRepository.save(todo);

    return todo;
  }
}
