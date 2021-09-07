import { AppError } from "@errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

const category = {
  name: "Mock Category",
  description: "Mock Description",
};

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be truthy", () => {
    // Act & Assert
    expect(createCategoryUseCase).toBeTruthy();
  });

  describe("Execute", () => {
    it("should be able to create a new category", async () => {
      // Act
      await createCategoryUseCase.execute(category);

      // Assert
      expect(
        await categoriesRepositoryInMemory.findByName("Mock Category")
      ).toHaveProperty("id");
    });

    it("Should not be able to create a new category with same name as existing one", async () => {
      // Act
      await createCategoryUseCase.execute(category);

      // Assert
      expect(async () => {
        await createCategoryUseCase.execute(category);
      }).rejects.toBeInstanceOf(AppError);
    });
  });
});
