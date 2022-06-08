import {Router} from "express"

import UserController from "../controllers/user.controller"


const route = Router()


const userRoutes = () => {
    route.get("", UserController.getAllUsersController)
    route.post("/register", UserController.createUserController)
    route.post("/login", UserController.loginController)
    route.patch("/:user_id", UserController.updateUserController)

    return route
}

export default userRoutes