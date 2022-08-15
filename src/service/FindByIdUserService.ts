import { getCustomRepository, Repository } from "typeorm";
import { User } from "../model/User";
import { UsersRepository } from "../repositories/UsersRepository";

export class FindByIdUserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getCustomRepository(UsersRepository);
  }

  public async execute(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail(id);
  }
}
