import { Request, Response } from "express";

import CarGroupService from "../services/carGroup.service";

class CarGroupController {
  getGroupsController = async (req: Request, res: Response) => {
    const groups = await CarGroupService.getGroupsService();

    return res.status(groups.status).json(groups.message);
  };

  getGroupController = async (req: Request, res: Response) => {
    const group = await CarGroupService.getGroupService(req);

    return res.status(group.status).json(group.message);
  };

  createGroupController = async (req: Request, res: Response) => {
    const newGroup = await CarGroupService.createGroupService(req);

    return res.status(newGroup.status).json(newGroup.message);
  };

  patchGroupController = async (req: Request, res: Response) => {
    const group = await CarGroupService.patchGroupService(req);

    return res.status(group.status).json(group.message);
  };

  deleteGroupController = async (req: Request, res: Response) => {
    const group = await CarGroupService.deleteGroupService(req);

    return res.status(group.status).json(group.message);
  };

  addCarOnGroupController = async (req: Request, res: Response) => {
    const service = await CarGroupService.addCarOnGroupService(req);

    return res.status(service.status).json(service.message);
  };
}

export default new CarGroupController();
