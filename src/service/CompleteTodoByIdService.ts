import { getCustomRepository, Repository } from "typeorm";
import { Todo } from "../model/Todo";
import { TodosRepository } from "../repositories/TodosRepository";

export class CompleteTodoByIdService {
  private todosRepository: Repository<Todo>;

  constructor() {
    this.todosRepository = getCustomRepository(TodosRepository);
  }

  public async execute(id: number): Promise<Todo> {
    const todo = await this.todosRepository.findOneOrFail(id);

    todo.is_active = 0;

    await this.todosRepository.save(todo);

    return todo;
  }
}
