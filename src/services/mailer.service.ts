import transport from "../config/mailer.config";
import dotenv from "dotenv";
import path from "path";
import hbs from "nodemailer-express-handlebars";
import { Car, User } from "../entities";
import { Request } from "express";

dotenv.config();

class mailerService {
	successReservationMail = (req: Request, user: User, car: Car) => {
		const startDate = new Date(req.validated["startDate"])
		const endDate = new Date(req.validated["endDate"])

		const serializerDate = (date: Date) => {
			return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`
		}

		const handlebarOptions = {
			viewEngine: {
				partialsDir: path.resolve("./src/views/"),
				defaultLayout: undefined,
			},
			viewPath: path.resolve("./src/views/"),
		};

		transport.use("compile", hbs(handlebarOptions));

		const mailOptions = {
			from: process.env.ADMIN_EMAIL,
			to: user.email,
			subject: "Carro alugado com sucesso!",
			template: "email",
			context: {
				client: user.name.toUpperCase(),
				plate: car.plate,
				brand: car.brand,
				startDate: serializerDate(startDate),
				endDate: serializerDate(endDate),
			},
		};
		transport.sendMail(mailOptions, (err) => {
			if (err) {
				return { status: 424, message: { error: "Email could not be sent." } };
			}
		});
	};
}

export default new mailerService();
