import {Request, Response} from "express"

import StoreService from "../services/store.service"

class StoreController {
    getAllStoreController = async (req: Request, res: Response) => {
        const stores = await StoreService.getAllStoreService()

        return res.status(stores.status).json(stores.message)
    }
    
    createStoreController = async (req: Request, res: Response) => {
        const store = await StoreService.createStoreService(req)

        return res.status(store.status).json(store.message)
    }

    updateStoreController = async (req: Request, res: Response) => {
        const store = await StoreService.updateStoreService(req)

        return res.status(store.status).json(store.message)
    }

    deleteStoreController = async (req: Request, res: Response) => {
        const store = await StoreService.deleteStoreService(req)

        return res.status(store.status).json(store.message)
    }

    addWorkerToStore = async (req: Request, res: Response) => {
        const store = await StoreService.addWorkerToStore(req)

        return res.status(store.status).json(store.message)
    }

    removeWorkerFromStore = async (req: Request, res: Response) => {
        const store = await StoreService.removeWorkerFromStore(req)

        return res.status(store.status).json(store.message)
    }
}


export default new StoreController()