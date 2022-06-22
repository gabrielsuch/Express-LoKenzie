import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Store } from "../entities";

const getStoreIdOr404Middleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const storeRepository = AppDataSource.getRepository(Store);
	const findStore = await storeRepository.findOneBy({
		id: req.params.store_id,
	});

	if (!findStore) {
		return res.status(404).json({ message: "Store not found" });
	}

	next();
};

export default getStoreIdOr404Middleware;
