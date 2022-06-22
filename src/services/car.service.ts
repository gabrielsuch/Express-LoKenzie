import { Request } from "express";

import AppDataSource from "../data-source";
import { Car } from "../entities";
import { Store } from "../entities";
import { CarGroup } from "../entities";
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

  getCarByIdService = async (req: Request) => {
    const carRepository = AppDataSource.getRepository(Car);
    const car = await carRepository.findOneBy({
      id: req.params.car_id,
    });

    if (!car) {
      return { status: 404, message: { error: "Car not found" } };
    }

    return { status: 200, message: car };
  };

  createCarService = async ({ body }: Request) => {
    const carRepository = AppDataSource.getRepository(Car);
    const carAlreadyExist = await carRepository.findOneBy({
      plate: body.plate,
    });

    if (carAlreadyExist) {
      return { status: 409, message: { error: "Car already exists." } };
    }

    const storeRepository = AppDataSource.getRepository(Store);
    const carGroupRepository = AppDataSource.getRepository(CarGroup);

    const carStockedAt = await storeRepository.findOneBy({
      id: body.stockedAt,
    });

    const carGroup = await carGroupRepository.findOneBy({
      id: body.group,
    });

    const car = new Car();
    car.plate = body.plate;
    car.year = body.year;
    car.color = body.color;
    car.brand = body.brand;
    car.isAvailable = body.isAvailable;
    car.group = carGroup;
    car.stockedAt = carStockedAt;
    //Fazer uma validação/serialização
    carRepository.create(car);
    await carRepository.save(car);

    return { status: 201, message: car };
  };

  updateCarByIdService = async (req: Request) => {
    const carRepository = AppDataSource.getRepository(Car);
    const carToUpdate = await carRepository.findOneBy({
      id: req.params.car_id,
    });

    if (!carToUpdate) {
      return { status: 404, message: { error: "Car not found" } };
    }

    await carRepository.update(req.params.car_id, req.body);
    const carUpdated = await carRepository.findOneBy({
      id: req.params.car_id,
    });

    return { status: 200, message: carUpdated };
  };

  deleteCarByIdService = async (req: Request) => {
    const carRepository = AppDataSource.getRepository(Car);
    const carToDelete = await carRepository.findOneBy({
      id: req.params.car_id,
    });

    if (!carToDelete) {
      return { status: 404, message: { error: "Car not found" } };
    }

    carRepository.delete(req.params.car_id);

    return { status: 200, message: { message: "Car Deleted" } };
  };
}

export default new CarService();
