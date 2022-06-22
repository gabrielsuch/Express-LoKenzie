import { Request, Response } from "express";

import CarService from "../services/car.service";

class CarController {
  getAllCarsController = async (req: Request, res: Response) => {
    const cars = await CarService.getAllCarsService();

    return res.status(cars.status).json(cars.message);
  };

  getCarByIdController = async (req: Request, res: Response) => {
    const car = await CarService.getCarByIdService(req);

    return res.status(car.status).json(car.message);
  };

  createCarController = async (req: Request, res: Response) => {
    const car = await CarService.createCarService(req);

    return res.status(car.status).json(car.message);
  };

  updateCarByIdController = async (req: Request, res: Response) => {
    const car = await CarService.updateCarByIdService(req);

    return res.status(car.status).json(car.message);
  };

  deleteCarByIdController = async (req: Request, res: Response) => {
    const car = await CarService.deleteCarByIdService(req);

    return res.status(car.status).json(car.message);
  };
}

export default new CarController();
