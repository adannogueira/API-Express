import { User } from "@modules/accounts/entities/User";

export interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
  id?: string;
  avatar?: string;
}

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(user_id: string): Promise<User>;
}
