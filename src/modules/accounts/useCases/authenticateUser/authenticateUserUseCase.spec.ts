import { AppError } from "@errors/AppError";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { ICreateUserDTO } from "@modules/accounts/repositories/IUsersRepository";

import { CreateUserUseCase } from "../createUser/createUserUseCase";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Authenticate User", () => {
  beforeEach(() => {
    // Arrange
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  // Arrange
  const user: ICreateUserDTO = {
    name: "Mock User",
    password: "123456",
    email: "user@mock.com",
    driver_license: "123456",
  };

  it("Should be truthy", () => {
    // Act & Assert
    expect(authenticateUserUseCase).toBeTruthy();
  });

  describe("Execute", () => {
    it("Should be able to authenticate an user", async () => {
      // Act
      await createUserUseCase.execute(user);

      const result = await authenticateUserUseCase.execute({
        email: user.email,
        password: user.password,
      });

      // Assert
      expect(result).toHaveProperty("token");
    });

    it("Should not authenticate an user with wrong email", async () => {
      // Act & Assert
      await createUserUseCase.execute(user);

      expect(async () => {
        await authenticateUserUseCase.execute({
          email: "wrong@email.com",
          password: user.password,
        });
      }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not authenticate an user with wrong password", async () => {
      // Act & Assert
      await createUserUseCase.execute(user);

      expect(async () => {
        await authenticateUserUseCase.execute({
          email: user.email,
          password: "wrong",
        });
      }).rejects.toBeInstanceOf(AppError);
    });
  });
});
