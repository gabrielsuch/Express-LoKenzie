import { Request, Response } from "express";
import AppDataSource from "../data-source";

import { UserCarReservation } from "../entities";
import { Car } from "../entities";

class ReservationService {
  createReservationService = async (req: Request) => {
    const reservationRepository =
      AppDataSource.getRepository(UserCarReservation);

    const carRepository = AppDataSource.getRepository(Car);

    const carRequested = await carRepository.findOneBy({
      id: req.params.car_id,
    });

    if (!carRequested) {
      return { status: 404, message: { error: "Car not found" } };
    }

    if (carRequested.isAvailable === false) {
      return { status: 409, message: { error: "Car not available" } };
    }

    const reservation = new UserCarReservation();
    reservation.days = req.body.days;
    reservation.startDate = req.body.startDate;
    reservation.endDate = req.body.endDate;

    carRequested.isAvailable = false;
    carRepository.save(carRequested);

    reservationRepository.create(reservation);
    await reservationRepository.save(reservation);

    return { status: 201, message: { message: "Reservation made" } };
  };
}

export default new ReservationService();
