import { Todo } from "../model/Todo";
import { getCustomRepository, Repository } from "typeorm";
import { TodosRepository } from "../repositories/TodosRepository";

export class FindByIdTodoService {
  private todosRepository: Repository<Todo>;

  constructor() {
    this.todosRepository = getCustomRepository(TodosRepository);
  }

  public async execute(id: number): Promise<Todo> {
    return await this.todosRepository.findOneOrFail(id, {
      relations: ["user"],
    });
  }
}
