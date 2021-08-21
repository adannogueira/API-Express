import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/createUser/createUserController";

export const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);
