import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
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
    password,
    email,
    driver_license,
  }: IRequest): Promise<void> {
    const userAlreadyExists = await this.UsersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists.");
    }

    const passwordHash = await hash(password, 8);

    this.UsersRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    });
  }
}
