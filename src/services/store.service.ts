import AppDataSource from "../data-source"
import {Request} from "express"
import { Store } from "../entities"

class StoreService {
    getAllStoreService = async () => {
        const storeRepository = AppDataSource.getRepository(Store)
        const stores = await storeRepository.find()

        return {status: 200, message: stores}
    }

    createStoreService = async ({body}: Request) => {
        const storeRepository = AppDataSource.getRepository(Store)
        const storeExists = await storeRepository.findOneBy({
            address: body.address
        })

        if(storeExists) {
            return {status: 409, message: {error: "Store already exists."}}
        }
        
        const store = new Store()
        store.address = body.address
        store.quantity = body.quantity

        storeRepository.create(store)
        await storeRepository.save(store)

        return {status: 201, message: store}
    }

    updateStoreService = async (req: Request) => {
        const storeRepository = AppDataSource.getRepository(Store)
        const findStore = await storeRepository.findOneBy({
            id: req.params.store_id
        })

        if(!findStore) {
            return {status: 409, message: {error: "Store not found."}}
        }

        await storeRepository.update(req.params.store_id, req.body)

        return {status: 200, message: "OK"}
    }

    deleteStoreService = async (req: Request) => {
        const storeRepository = AppDataSource.getRepository(Store)
        const findStore = await storeRepository.findOneBy({
            id: req.params.store_id
        })

        if(!findStore) {
            return {status: 409, message: {error: "Store not found."}}
        }

        await storeRepository.delete(req.params.store_id)
        
        return {status: 200, message: "Deleted"}
    }
}


export default new StoreService()