import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

const car1 = {
  name: "Car1",
  description: "Mock Description 1",
  daily_rate: 190.0,
  license_plate: "PPY1198",
  fine_amount: 100,
  brand: "Brand1",
  category_id: "id1",
};

const car2 = {
  name: "Car2",
  description: "Mock Description 2",
  daily_rate: 200.0,
  license_plate: "PPA1D35",
  fine_amount: 100,
  brand: "Brand2",
  category_id: "id2",
};

const car3 = {
  name: "Car3",
  description: "Mock Description 3",
  daily_rate: 220.0,
  license_plate: "PAA1A12",
  fine_amount: 90,
  brand: "Brand3",
  category_id: "id3",
};

describe("ListCarsUseCase", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("Should be truthy", () => {
    // Act & Assert
    expect(listCarsUseCase).toBeTruthy();
  });

  describe("Execute", () => {
    it("Should be able to list all available cars", async () => {
      // Arrange
      const mockCar1 = await carsRepositoryInMemory.create(car1);
      const mockCar2 = await carsRepositoryInMemory.create(car2);

      // Act
      const cars = await listCarsUseCase.execute({});

      // Assert
      expect(cars).toEqual([mockCar1, mockCar2]);
    });

    it("Should not list a car when it's unavailable", async () => {
      // Arrange
      await carsRepositoryInMemory.create(car1);
      await carsRepositoryInMemory.create(car2);
      const { id } = await carsRepositoryInMemory.create(car3);
      await carsRepositoryInMemory.toggleAvailability(id);

      // Act
      const cars = await listCarsUseCase.execute({});

      // Assert
      expect(cars).toHaveLength(2);
    });

    it("Should be able to list all available cars by name", async () => {
      // Arrange
      const mockCar = await carsRepositoryInMemory.create(car1);
      await carsRepositoryInMemory.create(car2);

      // Act
      const cars = await listCarsUseCase.execute({ name: "Car1" });

      // Assert
      expect(cars).toEqual([mockCar]);
    });
  });
});
