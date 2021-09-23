import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    category_id,
    fine_amount,
    license_plate,
    daily_rate,
    description,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      fine_amount,
      license_plate,
      daily_rate,
      description,
      name,
    });

    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  async listAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]> {
    const availableCars = this.cars.filter((car) => car.available === true);

    if (name || brand || category_id) {
      availableCars.filter(
        (car) =>
          (name && car.name === name) ||
          (brand && car.brand === brand) ||
          (category_id && car.category_id === category_id)
      );
    }

    return availableCars;
  }

  async toggleAvailability(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);

    car.available = !car.available;

    return car;
  }
}
