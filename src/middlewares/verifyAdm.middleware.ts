import {Request, Response, NextFunction} from "express"

import AppDataSource from "../data-source"
import {User} from "../entities/user.entity"


const verifyAdmMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User)
    const findUser = await userRepository.findOneBy({
        email: req.decoded
    })

    if(findUser && !findUser.isAdm) {
        return res.status(401).json({error: "Missing Admin Permission"})
    }

    return next()
}

export default verifyAdmMiddleware