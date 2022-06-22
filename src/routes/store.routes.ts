import { Router } from "express";

import StoreController from "../controllers/store.controller";
import getStoreIdOr404Middleware from "../middlewares/getStoreIdOr404.middleware";

import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import verifyAdmMiddleware from "../middlewares/verifyAdm.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";

import createStoreSchema from "../schemas/store/createStore.schema";
import updateStoreSchema from "../schemas/store/updateStore.schema";

const route = Router();

const storeRoutes = () => {
	route.get("", StoreController.getAllStoreController);
	route.post(
		"/register",
		verifyTokenMiddleware,
		verifyAdmMiddleware,
		validateSchemaMiddleware(createStoreSchema),
		StoreController.createStoreController
	);
	route.patch(
		"/:store_id",
		verifyTokenMiddleware,
		getStoreIdOr404Middleware,
		verifyAdmMiddleware,
		validateSchemaMiddleware(updateStoreSchema),
		StoreController.updateStoreController
	);
	route.delete(
		"/:store_id",
		verifyTokenMiddleware,
		getStoreIdOr404Middleware,
		verifyAdmMiddleware,
		StoreController.deleteStoreController
	);

	route.patch("/remove/:store_id", verifyTokenMiddleware, verifyAdmMiddleware, validateSchemaMiddleware(updateStoreSchema), StoreController.removeWorkerFromStore)
    route.patch("/worker/:store_id", verifyTokenMiddleware, verifyAdmMiddleware, validateSchemaMiddleware(updateStoreSchema), StoreController.addWorkerToStore)

	return route;
};

export default storeRoutes;
