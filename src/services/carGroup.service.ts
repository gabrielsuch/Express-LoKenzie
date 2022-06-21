import AppDataSource from "../data-source";
import { CarGroup } from "../entities";
import { Request } from "express";

class CarGroupService {
  getGroupsService = async () => {
    const groupRepo = AppDataSource.getRepository(CarGroup);
    const groups = await groupRepo.find();

    return { status: 200, message: groups };
  };

  getGroupService = async (req: Request) => {
    const groupRepo = AppDataSource.getRepository(CarGroup);
    const group = await groupRepo.findOneBy({ id: req.params.group_id });

    if (!group) {
      return { status: 404, message: { error: "Group Not Found" } };
    }

    return { status: 200, message: group };
  };

  createGroupService = async ({ body }: Request) => {
    const groupRepo = AppDataSource.getRepository(CarGroup);

    const group = new CarGroup();
    group.description = body.description;
    group.price = body.price;
    group.quantity = 0;

    groupRepo.create(group);
    await groupRepo.save(group);

    return { status: 201, message: group };
  };

  patchGroupService = async (req: Request) => {
    const groupRepo = AppDataSource.getRepository(CarGroup);

    const group = await groupRepo.findOneBy({ id: req.params.group_id });

    if (!group) {
      return { status: 404, message: { error: "Group not found" } };
    }

    await groupRepo.update(req.params.group_id, req.body);

    const groupUpdated = await groupRepo.findOneBy({
      id: req.params.group_id,
    });

    return { status: 200, message: groupUpdated };
  };

  deleteGroupService = async (req: Request) => {
    const groupRepo = AppDataSource.getRepository(CarGroup);
    const group = await groupRepo.findOneBy({ id: req.params.group_id });

    if (!group) {
      return { status: 404, message: { error: "Group not found" } };
    }

    groupRepo.delete(req.params.group_id);

    return { status: 200, message: { message: "Car Group Deleted" } };
  };
}

export default new CarGroupService();
