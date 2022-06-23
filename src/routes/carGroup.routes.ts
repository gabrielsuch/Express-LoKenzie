import { Router } from "express";

import CarGroupController from "../controllers/carGroup.controller";

import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import verifyAdmMiddleware from "../middlewares/verifyAdm.middleware";
import verifyUUIDMiddleware from "../middlewares/verifyUUID.middleware";

import createGroupSchema from "../schemas/carGroup/createGroup.schema";
import updateGroupSchema from "../schemas/carGroup/updateGroup.schema";
import addOnGroupSchema from "../schemas/carGroup/addOnGroup.schema";
import getCarGroupIdOr404Middleware from "../middlewares/getCarGroupIdOr404.middleware";

const route = Router();

const carGroupRoutes = () => {
	route.post(
		"/add/:group_id",
		verifyUUIDMiddleware,
		verifyTokenMiddleware,
		getCarGroupIdOr404Middleware,
		verifyAdmMiddleware,
		validateSchemaMiddleware(addOnGroupSchema),
		CarGroupController.addCarOnGroupController
	);

	route.get("", CarGroupController.getGroupsController);
	route.get(
		"/:group_id",
		verifyUUIDMiddleware,
		getCarGroupIdOr404Middleware,
		CarGroupController.getGroupController
	);

	route.post(
		"/register",
		verifyTokenMiddleware,
		verifyAdmMiddleware,
		validateSchemaMiddleware(createGroupSchema),
		CarGroupController.createGroupController
	);

	route.patch(
		"/:group_id",
		verifyUUIDMiddleware,
		verifyTokenMiddleware,
		getCarGroupIdOr404Middleware,
		verifyAdmMiddleware,
		validateSchemaMiddleware(updateGroupSchema),
		CarGroupController.patchGroupController
	);
	route.delete(
		"/:group_id",
		verifyUUIDMiddleware,
		verifyTokenMiddleware,
		getCarGroupIdOr404Middleware,
		verifyAdmMiddleware,
		CarGroupController.deleteGroupController
	);

	return route;
};

export default carGroupRoutes;
