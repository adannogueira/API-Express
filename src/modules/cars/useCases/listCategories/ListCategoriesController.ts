import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { container } from "tsyringe";

export class ListCategoriesController {
  
  async handle(req: Request, res: Response): Promise<Response> {

    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const listAll = await listCategoriesUseCase.execute();

    return res.json(listAll);
  }
}
