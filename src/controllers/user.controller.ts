import {Request, Response} from "express"

import UserService from "../services/user.service"


// QUANDO COMEÇAR A CODAR, NÃO ESQUECER DE APAGAR AS LINHAS COMENTADAS

class UserController {
    getAllUsersController = async (req: Request, res: Response) => {
        // const exemplo = await UserService.getAllUsersService()
    }
    
    createUserController = async (req: Request, res: Response) => {
        // const exemplo = await UserService.createUserService()
    }

    updateUserController = async (req: Request, res: Response) => {
        // const exemplo = await UserService.updateUserService()
    }

    loginController = async (req: Request, res: Response) => {
        // const exemplo = await UserService.loginService()
    }
}


export default new UserController()