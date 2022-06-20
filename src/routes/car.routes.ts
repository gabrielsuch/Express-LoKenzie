import { Router } from "express";

import CarController from "../controllers/car.controller";

import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import verifyAdmMiddleware from "../middlewares/verifyAdm.middleware";

import createCarSchema from "../schemas/cars/createCar.schema";
import updateCarSchema from "../schemas/cars/updateCar.schema";

const route = Router();

const carRoutes = () => {
  route.get("", CarController.getAllCarsController);
  route.get("/:car_id", CarController.getCarByIdController);

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
    verifyAdmMiddleware,
    validateSchemaMiddleware(updateCarSchema),
    CarController.updateCarByIdController
  );

  route.delete(
    "/:car_id",
    verifyTokenMiddleware,
    verifyAdmMiddleware,
    CarController.deleteCarByIdController
  );

  return route;
};

export default carRoutes;
