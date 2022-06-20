import { Router } from "express";

import CarGroupController from "../controllers/carGroup.controller";

import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import verifyAdmMiddleware from "../middlewares/verifyAdm.middleware";

import createGroupSchema from "../schemas/carGroup/createGroup.schema";
import updateGroupSchema from "../schemas/carGroup/updateGroup.schema";

const route = Router();

const carGroupRoutes = () => {
  route.get("", CarGroupController.getGroupsController);
  route.get("/:group_id", CarGroupController.getGroupController);

  route.post(
    "",
    verifyTokenMiddleware,
    verifyAdmMiddleware,
    validateSchemaMiddleware(createGroupSchema),
    CarGroupController.createGroupController
  );

  route.patch(
    "/:group_id",
    verifyTokenMiddleware,
    verifyAdmMiddleware,
    validateSchemaMiddleware(updateGroupSchema),
    CarGroupController.patchGroupController
  );
  route.delete(
    "/:group_id",
    verifyTokenMiddleware,
    verifyAdmMiddleware,
    CarGroupController.deleteGroupController
  );

  return route;
};

export default carGroupRoutes;
