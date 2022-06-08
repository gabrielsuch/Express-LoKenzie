import {Router} from "express"

import StoreController from "../controllers/store.controller"


const route = Router()


const storeRoutes = () => {
    route.get("", StoreController.getAllStoreController)
    route.post("/register", StoreController.createStoreController)
    route.patch("/:store_id", StoreController.updateStoreController)
    route.delete("/:store_id", StoreController.deleteStoreController)

    return route
}


export default storeRoutes