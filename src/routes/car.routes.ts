import { Router } from "express";

import CarController from "../controllers/car.controller";

import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import verifyAdmMiddleware from "../middlewares/verifyAdm.middleware";

import createCarSchema from "../schemas/cars/createCar.schema";
import updateCarSchema from "../schemas/cars/updateCar.schema";
import getCarIdOr404Middleware from "../middlewares/getCarIdOr404.middleware";
import verifyUUIDMiddleware from "../middlewares/verifyUUID.middleware";

const route = Router();

const carRoutes = () => {
	route.get("", CarController.getAllCarsController);
	route.get(
		"/:car_id",
		verifyUUIDMiddleware,
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
		verifyUUIDMiddleware,
		verifyTokenMiddleware,
		getCarIdOr404Middleware,
		verifyAdmMiddleware,
		validateSchemaMiddleware(updateCarSchema),
		CarController.updateCarByIdController
	);

	route.delete(
		"/:car_id",
		verifyUUIDMiddleware,
		verifyTokenMiddleware,
		getCarIdOr404Middleware,
		verifyAdmMiddleware,
		CarController.deleteCarByIdController
	);

	return route;
};

export default carRoutes;
