import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export class CreateSpecificationController {
  constructor(private CreateSpecificationUseCase: CreateSpecificationUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    await this.CreateSpecificationUseCase.execute({ name, description });

    return res.status(201).send();
  }
}
