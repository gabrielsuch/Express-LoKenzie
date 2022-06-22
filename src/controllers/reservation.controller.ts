import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities";
import mailerService from "../services/mailer.service";
import ReservationService from "../services/reservation.service";

class ReservationController {
	createReservation = async (req: Request, res: Response) => {
		const reservation = await ReservationService.createReservationService(req);
		const userRepository = AppDataSource.getRepository(User)
		
		const user = await userRepository.findOneBy({
            email: req.decoded
        })

		if (reservation.status === 201) {
			mailerService.successReservationMail(req, user);
		}

		return res.status(reservation.status).json(reservation.message);
	};
}

export default new ReservationController();
