import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository, Repository } from "typeorm";
import auth from "../config/auth";
import { User } from "../model/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IRequest {
  document: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}
export class AuthenticateUserService {
  private usersRepository: Repository<User>;
  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  public async execute({ document, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findOne({ where: { document } });

    if (!user) throw new Error("Usuário não existe");

    const passwordMatched = await compare(password, user.password);

    if (passwordMatched) throw new Error("Senha inválida");

    const { secret, expiresIn } = auth.jwt;

    const token = sign(
      { name: user.name, document: user.document, is_admin: user.is_admin },
      secret,
      {
        subject: `${user.id}`,
        expiresIn,
      }
    );

    delete user.password;

    return { user, token };
  }
}
