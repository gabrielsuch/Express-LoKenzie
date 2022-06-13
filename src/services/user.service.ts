import {Request} from "express"

import AppDataSource from "../data-source"
import {User} from "../entities/user.entity"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


class UserService {
    getAllUsersService = async () => {
        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find()

        return {status: 200, message: users}
    }

    createUserService = async ({validated}: Request) => {
        const userRepository = AppDataSource.getRepository(User)
        const emailExists = await userRepository.findOneBy({
            email: validated.email
        })

        if(emailExists) {
            return {status: 409, message: {error: "Email already exists."}}
        }

        validated.password = await bcrypt.hash(validated.password, 10)
        
        userRepository.create(validated)
        await userRepository.save(validated)

        return {status: 201, message: validated}
    }

    updateUserService = async (req: Request) => {
        const userRepository = AppDataSource.getRepository(User)
        const findUser = await userRepository.findOneBy({
            id: req.params.user_id
        })

        if(!findUser) {
            return {status: 404, message: {error: "User not found"}}
        }

        await userRepository.update(req.params.user_id, req.validated)

        return {status: 200, message: "OK"}
    }

    deleteUserService = async (req: Request) => {
        const userRepository = AppDataSource.getRepository(User)
        const findUser = await userRepository.findOneBy({
            id: req.params.user_id
        })

        if(!findUser) {
            return {status: 404, message: {error: "User not found"}}
        }

        await userRepository.delete(req.params.user_id)

        return {status: 200, message: "Deleted"}
    }

    loginService = async ({validated}: Request) => {
        const userRepository = AppDataSource.getRepository(User)
        const findUser = await userRepository.findOneBy({
            email: validated.email
        })

        if(!findUser) {
            return {status: 404, message: {error: "Email doesn't exists."}}
        }

        if(!(await findUser.comparePwd(validated.password))) {
            return {status: 401, message: {error: "Email or Password doesn't matches."}}
        }

        const token = jwt.sign({email: findUser.email}, String(process.env.SECRET_KEY), {expiresIn: "24h"})

        return {status: 200, message: {access_token: token}}
    }
}


export default new UserService()