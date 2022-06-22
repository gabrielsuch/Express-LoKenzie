import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { CarGroup } from "../entities";

const getCarGroupIdOr404Middleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const carGroupRepository = AppDataSource.getRepository(CarGroup);
	const findCarGroup = await carGroupRepository.findOneBy({
		id: req.params.group_id,
	});

	if (!findCarGroup) {
		return res.status(404).json({ message: "Group not found" });
	}

	return next();
};

export default getCarGroupIdOr404Middleware;
