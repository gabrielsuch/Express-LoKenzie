import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { Car, User } from "../entities";
import mailerService from "../services/mailer.service";
import ReservationService from "../services/reservation.service";

class ReservationController {
	createReservation = async (req: Request, res: Response) => {
		const reservation = await ReservationService.createReservationService(req);
		const userRepository = AppDataSource.getRepository(User)
		const carRepository = AppDataSource.getRepository(Car)
		
		const user = await userRepository.findOneBy({
            email: req.decoded
        })

		const car = await carRepository.findOneBy({
			id: req.params.id
		})

		if (reservation.status === 201) {
			mailerService.successReservationMail(req, user, car);
		}

		return res.status(reservation.status).json(reservation.message);
	};
}

export default new ReservationController();
