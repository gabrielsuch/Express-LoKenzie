import {Request, Response} from "express"

import StoreService from "../services/store.service"


// QUANDO COMEÇAR A CODAR, NÃO ESQUECER DE APAGAR AS LINHAS COMENTADAS

class StoreController {
    getAllStoreController = async (req: Request, res: Response) => {
        // const exemplo = await StoreService.getStoreService()
    }
    
    createStoreController = async (req: Request, res: Response) => {
        // const exemplo = await StoreService.createStoreService()
    }

    updateStoreController = async (req: Request, res: Response) => {
        // const exemplo = await StoreService.updateStoreService()
    }

    deleteStoreController = async (req: Request, res: Response) => {
        // const exemplo = await StoreService.deleteStoreService()
    }
}


export default new StoreController()