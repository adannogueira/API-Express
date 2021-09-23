import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  listAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]>;
  toggleAvailability(id: string): Promise<Car>;
}
