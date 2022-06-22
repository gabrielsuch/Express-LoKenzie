import { Request, Response } from "express";
import AppDataSource from "../data-source";

import { UserCarReservation } from "../entities";
import { Car } from "../entities";
import { User } from "../entities";

class ReservationService {
  createReservationService = async (req: Request) => {
    const reservationRepository =
      AppDataSource.getRepository(UserCarReservation);

    const carRepository = AppDataSource.getRepository(Car);
    const userRepository = AppDataSource.getRepository(User);

    const lessorUser = await userRepository.findOneBy({
      email: req.decoded,
    });
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
    const endDate = new Date(req.body.endDate);
    const startDate = new Date(req.body.startDate);
    const diff = Math.abs(endDate.getTime() - startDate.getTime());
    const today = new Date();
    const oneDay = 1000 * 60 * 60 * 24;

    if (startDate.getTime() + oneDay - today.getTime() < 0) {
      return {
        status: 409,
        message: { error: "Lease dates are in the past.Check the start date." },
      };
    }
    if (endDate.getTime() - today.getTime() < 0) {
      return {
        status: 409,
        message: { error: "Lease dates are in the past. Check the end date." },
      };
    }

    if (endDate.getTime() - startDate.getTime() < 0) {
      return {
        status: 409,
        message: { error: "Lease dates are in the past. Check the end date." },
      };
    }

    reservation.days = diff / oneDay;
    reservation.startDate = req.body.startDate;
    reservation.endDate = req.body.endDate;
    reservation.car = carRequested;
    reservation.user = lessorUser;

    carRequested.isAvailable = false;
    carRepository.save(carRequested);

    reservationRepository.create(reservation);
    await reservationRepository.save(reservation);

    return { status: 201, message: { message: "Reservation made" } };
  };
}

export default new ReservationService();
