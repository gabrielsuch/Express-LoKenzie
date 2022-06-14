import {Router} from "express"

import UserController from "../controllers/user.controller"


import validateSchemaMiddleware from "../middlewares/validateSchema.middleware"
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyAdmMiddleware from "../middlewares/verifyAdm.middleware"

import createUserSchema from "../schemas/user/createUser.schema"
import loginSchema from "../schemas/user/login.schema"
import updateUserSchema from "../schemas/user/updateUser.schema"

const route = Router()


const userRoutes = () => {
    route.get("", verifyTokenMiddleware, verifyAdmMiddleware, UserController.getAllUsersController)
    route.post("/register", validateSchemaMiddleware(createUserSchema), UserController.createUserController)
    route.post("/login", validateSchemaMiddleware(loginSchema), UserController.loginController)
    route.patch("/:user_id", verifyTokenMiddleware, validateSchemaMiddleware(updateUserSchema), UserController.updateUserController)
    route.delete("/:user_id", verifyTokenMiddleware, UserController.deleteUserController)

    return route
}

export default userRoutes