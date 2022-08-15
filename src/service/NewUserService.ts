import { hash } from "bcryptjs";
import { Repository, getCustomRepository } from "typeorm";
import { User } from "../model/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IRequest {
  name: string;
  fullname: string;
  email: string;
  is_admin: string;
  document: string;
  password: string;
}

export class NewUserService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = getCustomRepository(UsersRepository);
  }
  public async execute({ name, fullname, email, is_admin, document, password, }: IRequest): Promise<User> {

    if (!name || !document || !password || !email || !fullname || !is_admin)
      throw new Error("Dados incompletos");

    const formatDocument = document.replace(/\D/g, "");
    const documentExists = await this.userRepository.findOne({ where: { document: formatDocument } });
    if (documentExists) throw new Error('CPF/CNPJ Já cadastrado');

    const hashedPassword = await hash(password, 8);

    const user = this.userRepository.create({
      document: formatDocument,
      email, name, fullname, is_admin: Number(is_admin), password
    });

    await this.userRepository.save(user);

    return user;

  }
}
