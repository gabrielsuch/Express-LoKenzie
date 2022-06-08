import {Router} from "express"

import CarController from "../controllers/car.controller"


const route = Router()


const carRoutes = () => {
    route.get("", CarController.getAllCarsController)
    route.get("/:car_id", CarController.getCarByIdController)
    route.post("/register", CarController.createCarController)
    route.patch("/:car_id", CarController.updateCarByIdController)
    route.delete("/:car_id", CarController.deleteCarByIdController)

    return route
}


export default carRoutes