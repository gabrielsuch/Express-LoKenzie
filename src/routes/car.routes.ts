import { Router } from "express";

import CarController from "../controllers/car.controller";

import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import verifyAdmMiddleware from "../middlewares/verifyAdm.middleware";

import createCarSchema from "../schemas/cars/createCar.schema";
import updateCarSchema from "../schemas/cars/updateCar.schema";
import getCarIdOr404Middleware from "../middlewares/getCarIdOr404.middleware";

const route = Router();

const carRoutes = () => {
	route.get("", CarController.getAllCarsController);
	route.get(
		"/:car_id",
		getCarIdOr404Middleware,
		CarController.getCarByIdController
	);

	route.post(
		"/register",
		verifyTokenMiddleware,
		verifyAdmMiddleware,
		validateSchemaMiddleware(createCarSchema),
		CarController.createCarController
	);

	route.patch(
		"/:car_id",
		verifyTokenMiddleware,
		getCarIdOr404Middleware,
		verifyAdmMiddleware,
		validateSchemaMiddleware(updateCarSchema),
		CarController.updateCarByIdController
	);

	route.delete(
		"/:car_id",
		verifyTokenMiddleware,
		getCarIdOr404Middleware,
		verifyAdmMiddleware,
		CarController.deleteCarByIdController
	);

	return route;
};

export default carRoutes;
