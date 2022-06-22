import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities";

const getUserIdOr404Middleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userRepository = AppDataSource.getRepository(User);
	const findUser = await userRepository.findOneBy({
		id: req.params.user_id,
	});

	if (!findUser) {
		return res.status(404).json({ message: "User not found." });
	}

	return next();
};

export default getUserIdOr404Middleware;
