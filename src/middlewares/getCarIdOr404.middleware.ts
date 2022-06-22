import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Car } from "../entities";

const getCarIdOr404Middleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const carRepository = AppDataSource.getRepository(Car);
	const findCar = await carRepository.findOneBy({
		id: req.params.car_id,
	});

	if (!findCar) {
		return res.status(404).json({ message: "Car not found" });
	}

	return next();
};

export default getCarIdOr404Middleware;
