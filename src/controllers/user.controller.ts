import {Request, Response} from "express"

import UserService from "../services/user.service"


class UserController {
    getAllUsersController = async (req: Request, res: Response) => {
        const users = await UserService.getAllUsersService()

        return res.status(users.status).json(users.message)
    }
    
    createUserController = async (req: Request, res: Response) => {
        const user = await UserService.createUserService(req)

        return res.status(user.status).json(user.message)
    }

    updateUserController = async (req: Request, res: Response) => {
        const user = await UserService.updateUserService(req)

        return res.status(user.status).json(user.message)
    }

    deleteUserController = async (req: Request, res: Response) => {
        const user = await UserService.deleteUserService(req)

        return res.status(user.status).json(user.message)
    }

    loginController = async (req: Request, res: Response) => {
        const user = await UserService.loginService(req)

        return res.status(user.status).json(user.message)
    }
}


export default new UserController()