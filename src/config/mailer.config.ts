import nodemailer from "nodemailer"
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
	  user: "9c041f8ab7d66b",
	  pass: "81f24cbe284750"
	}
})

export default transport