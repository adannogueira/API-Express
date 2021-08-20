import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  username: string;
  password: string;
  email: string;
  driver_license: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private UsersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    username,
    password,
    email,
    driver_license,
  }: IRequest): Promise<void> {
    const userAlreadyExists = await this.UsersRepository.findByUsername(
      username
    );

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    this.UsersRepository.create({
      name,
      username,
      password,
      email,
      driver_license,
    });
  }
}
