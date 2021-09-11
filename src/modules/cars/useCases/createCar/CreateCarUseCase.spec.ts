import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

const car = {
  name: "Mock Car",
  description: "Mock Description",
  daily_rate: 150,
  license_plate: "AAA3333",
  fine_amount: 50,
  brand: "Mock Brand",
  category_id: "",
};

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be truthy", () => {
    // Act & Assert
    expect(createCarUseCase).toBeTruthy();
  });

  describe("Execute", () => {
    it("should be able to create a new car", async () => {
      // Act
      await createCarUseCase.execute(car);

      // Assert
      expect(await carsRepository.findByLicensePlate("AAA3333")).toHaveProperty(
        "id"
      );
    });

    it("should not be possible to create a car with existing license plate", async () => {
      // Act
      await createCarUseCase.execute(car);

      // Assert
      expect(async () => {
        await createCarUseCase.execute(car);
      }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be possible to non admin user to create a new car", () => {
      // Arrange & Act & Assert
    });

    it("a new car should be available upon creation", async () => {
      // Arrange
      await createCarUseCase.execute(car);

      // Act
      const result = await carsRepository.findByLicensePlate("AAA3333");

      // Assert
      console.log(result);
      expect(result.available).toBeTruthy();
    });
  });
});
