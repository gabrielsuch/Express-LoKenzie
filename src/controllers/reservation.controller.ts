import { Request, Response } from "express";
import ReservationService from "../services/reservation.service";

class ReservationController {
  createReservation = async (req: Request, res: Response) => {
    const reservation = await ReservationService.createReservationService(req);

    return res.status(reservation.status).json(reservation.message);
  };
}

export default new ReservationController();
