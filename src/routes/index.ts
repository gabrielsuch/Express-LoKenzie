import {Express} from "express"
import carRoutes from "./car.routes"
import storeRoutes from "./store.routes"
import userRoutes from "./user.routes"


const registerRoutes = (app: Express) => {
    app.use("/cars", carRoutes())
    app.use("/stores", storeRoutes())
    app.use("/users", userRoutes())
}


export default registerRoutes