import { Router } from "express";

import ReservationController from "../controllers/reservation.controller";
import getCarIdOr404Middleware from "../middlewares/getCarIdOr404.middleware";

import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import verifyUUIDMiddleware from "../middlewares/verifyUUID.middleware";

import reservationSchema from "../schemas/reservation/reservation.schema";

const route = Router();

const reservationRoute = () => {
	route.post(
		"/:car_id",
		verifyUUIDMiddleware,
		verifyTokenMiddleware,
		getCarIdOr404Middleware,
		validateSchemaMiddleware(reservationSchema),
		ReservationController.createReservation
	);

	return route;
};

export default reservationRoute;
