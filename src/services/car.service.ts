import { Request } from "express";

import AppDataSource from "../data-source";
import { Car } from "../entities";

class CarService {
  getAllCarsService = async () => {
    const carRepository = AppDataSource.getRepository(Car);
    const cars = await carRepository.find();

    const retunrCar = cars.map((car) => {
      const { plate, ...removePlate } = car;

      return removePlate;
    });

    return { status: 200, message: retunrCar };
  };

  getCarByIdService = async () => {};

  createCarService = async ({ body }: Request) => {
    const carRepository = AppDataSource.getRepository(Car);
    const carAlreadyExist = await carRepository.findOneBy({
      plate: body.plate,
    });

    if (carAlreadyExist) {
      return { status: 409, message: { error: "Car already exists." } };
    }

    const car = new Car();
    car.plate = body.plate;
    car.year = body.year;
    car.color = body.color;
    car.brand = body.brand;
    car.isAvailable = body.isAvailable;

    carRepository.create(car);
    await carRepository.save(car);

    return { status: 201, message: car };
  };

  updateCarByIdService = async () => {};

  deleteCarByIdService = async () => {};
}

export default new CarService();
