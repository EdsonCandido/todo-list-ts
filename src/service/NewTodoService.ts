import { Todo } from "../model/Todo";
import { getCustomRepository, Repository } from "typeorm";
import { TodosRepository } from "../repositories/TodosRepository";
import { User } from "../model/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IRequest {
  title: string;
  description: string;
  user_id: string | number;
}

export class NewTodoService {
  private todosRepository: Repository<Todo>;
  private usersRepository: Repository<User>;
  constructor() {
    this.todosRepository = getCustomRepository(TodosRepository);
    this.usersRepository = getCustomRepository(UsersRepository);
  }
  public async execute({
    title,
    description,
    user_id,
  }: IRequest): Promise<Todo> {
    const user = await this.usersRepository.findOne(user_id);
    if (!user) throw new Error("Usuário não existe");

    const todo = this.todosRepository.create({
      title,
      description,
      user_id: user.id,
      is_active: 1,
    });

    await this.todosRepository.save(todo);

    return todo;
  }
}
