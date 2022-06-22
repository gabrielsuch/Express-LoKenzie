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

        const returnUser = users.map((user) => {
            const {password, ...removePassword} = user
            
            return removePassword
        })

        return {status: 200, message: returnUser}
    }

    createUserService = async ({validated}: Request) => {
        const userRepository = AppDataSource.getRepository(User)
        const emailExists = await userRepository.findOneBy({
            email: validated.email
        })

        if(emailExists) {
            return {status: 409, message: {error: "Email already exists"}}
        }

        validated.password = await bcrypt.hash(validated.password, 10)
        
        userRepository.create(validated)
        await userRepository.save(validated)

        const {password, ...removePassword} = validated

        return {status: 201, message: removePassword}
    }

    updateUserService = async (req: Request) => {
        const userRepository = AppDataSource.getRepository(User)
        const findUser = await userRepository.findOneBy({
            id: req.params.user_id
        })

        const loggedUser = await userRepository.findOneBy({
            email: req.decoded
        })

        if(!loggedUser) {
            return {status: 404, message: {error: "Current user doesn't exists"}}
        }

        if(loggedUser && loggedUser.email !== findUser.email && !loggedUser.isAdm) {
            return {status: 401, message: {error: "Cannot update other user"}}
        }

        const exists = Object.keys(req.body)

        if(loggedUser && !loggedUser.isAdm && exists.includes("isAdm")) {
            return {status: 401, message: {error: "Cannot change isAdm key"}}
        }

        if(exists.includes("password")) {
            req.validated.password = await bcrypt.hash(req.validated.password, 10)
        }

        if(loggedUser && loggedUser.isAdm && !exists.includes("isAdm")) {
            req.validated.isAdm = true
        }

        await userRepository.update(req.params.user_id, req.validated)

        const newUser = await userRepository.findOneBy({
            id: req.params.user_id
        })

        const {password, ...removePassword}: any = newUser

        return {status: 200, message: removePassword}
    }

    deleteUserService = async (req: Request) => {
        const userRepository = AppDataSource.getRepository(User)
        const findUser = await userRepository.findOneBy({
            id: req.params.user_id
        })

        const loggedUser = await userRepository.findOneBy({
            email: req.decoded
        })


        if(!loggedUser) {
            return {status: 404, message: {error: "Current user doesn't exists"}}
        }

        if(loggedUser && findUser && loggedUser.email !== findUser.email && !loggedUser.isAdm) {
            return {status: 401, message: {error: "Cannot delete other user"}}
        }

        await userRepository.delete(req.params.user_id)

        return {status: 200, message: {message: "User Deleted"}}
    }

    loginService = async ({validated}: Request) => {
        const userRepository = AppDataSource.getRepository(User)
        const findUser = await userRepository.findOneBy({
            email: validated.email
        })

        if(!findUser) {
            return {status: 404, message: {error: "Email doesn't exists"}}
        }

        if(!(await findUser.comparePwd(validated.password))) {
            return {status: 400, message: {error: "Email or Password doesn't matches"}}
        }

        const token = jwt.sign({email: findUser.email}, String(process.env.SECRET_KEY), {expiresIn: "24h"})

        return {status: 200, message: {access_token: token}}
    }
}


export default new UserService()