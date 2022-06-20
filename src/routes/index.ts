import { Express } from "express";
import carRoutes from "./car.routes";
import storeRoutes from "./store.routes";
import userRoutes from "./user.routes";
import reservationRoute from "./reservation.routes";

const registerRoutes = (app: Express) => {
  app.use("/cars", carRoutes());
  app.use("/stores", storeRoutes());
  app.use("/users", userRoutes());
  app.use("/reservation", reservationRoute());
};

export default registerRoutes;
