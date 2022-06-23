import {Request, Response, NextFunction} from "express"

import {validate, version} from "uuid"


const verifyUUIDMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const key = Object.keys(req.params)

    if(validate(req.params[key[0]]) && version(req.params[key[0]]) === 4) {
        return next()
        
    } else {
        return res.status(400).json({error: "Not UUID type"})
    }
}

export default verifyUUIDMiddleware