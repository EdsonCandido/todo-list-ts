import { EntityRepository, Repository } from "typeorm";
import { User } from "../model/User";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}
