import { getCustomRepository, Repository } from "typeorm";
import { User } from "../model/User";
import { UsersRepository } from "../repositories/UsersRepository";

export class FindAllUsersService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getCustomRepository(UsersRepository);
  }
  public async execute(): Promise<User[]> {
    return await this.userRepository.find({
      select: [
        "id",
        "name",
        "fullname",
        "email",
        "document",
        "is_admin",
        "created_at",
        "updated_at",
      ],
    });
  }
}
