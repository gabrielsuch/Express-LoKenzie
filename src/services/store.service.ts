import AppDataSource from "../data-source"
import {Request} from "express"
import { Store, User } from "../entities"

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

        await storeRepository.update(req.params.store_id, req.body)

        const updatedStore = await storeRepository.findOneBy({
            id: req.params.store_id
        })

        return {status: 200, message: updatedStore}
    }

    deleteStoreService = async (req: Request) => {
        const storeRepository = AppDataSource.getRepository(Store)
        const findStore = await storeRepository.findOneBy({
            id: req.params.store_id
        })

        if(findStore.employees.length > 0) {
            return {status: 400, message: {error: "Delete all Users inside your store first"}}
        }

        await storeRepository.delete(req.params.store_id)
        
        return {status: 200, message: {message: "Store Deleted"}}
    }

    addWorkerToStore = async ( req: Request ) => {
        const storeRepository = AppDataSource.getRepository(Store)
        const userRepository = AppDataSource.getRepository(User)

        const findStore = await storeRepository.findOneBy({id: req.params.store_id})
        const findUser = await userRepository.findOneBy({email: req.body.email})

        if(!findStore) {
            return {status: 404, message: {error: "Store not found"}}
        }

        if(!findUser) {
            return {status: 404, message: {error: "User not found"}}
        }

        findStore.employees = [...findStore.employees, findUser]

        await storeRepository.save(findStore)

        return {status: 200, message: findStore}
    }

    removeWorkerFromStore = async ( req: Request ) => {
        const storeRepository = AppDataSource.getRepository(Store)
        const userRepository = AppDataSource.getRepository(User)

        const findStore = await storeRepository.findOneBy({id: req.params.store_id})
        const findUser = await userRepository.findOneBy({email: req.body.email})

        if(!findStore) {
            return {status: 404, message: {error: "Store not found"}}
        }

        if(!findUser) {
            return {status: 404, message: {error: "User not found"}}
        }

        findStore.employees = findStore.employees.filter( employee => employee.email !== req.body.email)

        await storeRepository.save(findStore)

        return {status: 200, message: findStore}
    }
}


export default new StoreService()