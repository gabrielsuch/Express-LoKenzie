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

        const loggedUser = await userRepository.findOneBy({
            email: req.decoded
        })

        if(!findUser) {
            return {status: 404, message: {error: "User not found"}}
        }

        if(loggedUser && loggedUser.email !== findUser.email && !loggedUser.isAdm) {
            return {status: 401, message: {error: "Cannot update other user."}}
        }

        const exists = Object.keys(req.body)

        if(loggedUser && !loggedUser.isAdm && exists.includes("isAdm")) {
            return {status: 401, message: {error: "Cannot change isAdm key."}}
        }

        if(exists.includes("password")) {
            req.validated.password = await bcrypt.hash(req.validated.password, 10)
        }

        await userRepository.update(req.params.user_id, req.validated)

        return {status: 200, message: {message: "User Updated!"}}
    }

    deleteUserService = async (req: Request) => {
        const userRepository = AppDataSource.getRepository(User)
        const findUser = await userRepository.findOneBy({
            id: req.params.user_id
        })

        const loggedUser = await userRepository.findOneBy({
            email: req.decoded
        })

        if(!findUser) {
            return {status: 404, message: {error: "User not found"}}
        }

        if(loggedUser && loggedUser.email !== findUser.email && !loggedUser.isAdm) {
            return {status: 401, message: {error: "Cannot delete other user."}}
        }

        if(loggedUser && loggedUser.email === findUser.email) {
            req.decoded = ""
        }
        
        await userRepository.delete(req.params.user_id)

        return {status: 200, message: {message: "User Deleted!"}}
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