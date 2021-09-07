import { User } from "@modules/accounts/infra/typeorm/entities/User";
import {
  ICreateUserDTO,
  IUsersRepository,
} from "@modules/accounts/repositories/IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create(data: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, { ...data });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findById(user_id: string): Promise<User> {
    const user = this.users.find((user) => user.id === user_id);

    return user;
  }
}
