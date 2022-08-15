import { getCustomRepository, Repository } from "typeorm";
import { TodosRepository } from "../repositories/TodosRepository";
import { Todo } from "../model/Todo";

export class FindAllTodosServices {
  private todosRepository: Repository<Todo>;

  constructor() {
    this.todosRepository = getCustomRepository(TodosRepository);
  }

  public async execute(): Promise<Todo[]> {
    return await this.todosRepository.find();
  }
}
