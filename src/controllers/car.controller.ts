import { Request, Response } from "express";

import CarService from "../services/car.service";

// QUANDO COMEÇAR A CODAR, NÃO ESQUECER DE APAGAR AS LINHAS COMENTADAS

class CarController {
  getAllCarsController = async (req: Request, res: Response) => {
    const cars = await CarService.getAllCarsService();

    return res.status(cars.status).json(cars.message);
  };

  getCarByIdController = async (req: Request, res: Response) => {
    // const exemplo = await CarService.getCarByIdService()
  };

  createCarController = async (req: Request, res: Response) => {
    const car = await CarService.createCarService(req);

    return res.status(car.status).json(car.message);
  };

  updateCarByIdController = async (req: Request, res: Response) => {
    // const exemplo = await CarService.updateCarByIdService()
  };

  deleteCarByIdController = async (req: Request, res: Response) => {
    // const exemplo = await CarService.deleteCarByIdService()
  };
}

export default new CarController();
