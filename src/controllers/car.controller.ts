import {Request, Response} from "express"

import CarService from "../services/car.service"


// QUANDO COMEÇAR A CODAR, NÃO ESQUECER DE APAGAR AS LINHAS COMENTADAS

class CarController {
    getAllCarsController = async (req: Request, res: Response) => {
        // const exemplo = await CarService.getAllCarsService()
    }
    
    getCarByIdController = async (req: Request, res: Response) => {
        // const exemplo = await CarService.getCarByIdService()
    }

    createCarController = async (req: Request, res: Response) => {
        // const exemplo = await CarService.createCarService()
    }

    updateCarByIdController = async (req: Request, res: Response) => {
        // const exemplo = await CarService.updateCarByIdService()
    }

    deleteCarByIdController = async (req: Request, res: Response) => {
        // const exemplo = await CarService.deleteCarByIdService()
    }   
}


export default new CarController()