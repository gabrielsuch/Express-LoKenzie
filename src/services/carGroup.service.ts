import AppDataSource from "../data-source";
import { CarGroup } from "../entities";
import { Car } from "../entities";
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

    await groupRepo.update(req.params.group_id, req.body);

    const groupUpdated = await groupRepo.findOneBy({
      id: req.params.group_id,
    });

    return { status: 200, message: groupUpdated };
  };

  deleteGroupService = async (req: Request) => {
    const groupRepo = AppDataSource.getRepository(CarGroup);
    const group = await groupRepo.findOneBy({ id: req.params.group_id });

    groupRepo.delete(req.params.group_id);

    return { status: 200, message: { message: "Car Group Deleted" } };
  };

  addCarOnGroupService = async (req: Request) => {
    const groupRepo = AppDataSource.getRepository(CarGroup);
    const carRepo = AppDataSource.getRepository(Car);

    const carList = req.body.cars;

    const group = await groupRepo.findOneBy({ id: req.params.group_id });

    for (let i = 0; i < carList.length; i++) {
      try {
        const car = await carRepo.findOneBy({ id: carList[i] });
      } catch {
        return {
          status: 404,
          message: { message: `${carList[i]} not a valid uuid datatype` },
        };
      }

      const car = await carRepo.findOneBy({ id: carList[i] });

      for (let j = 0; j < group.cars.length; j++) {
        if (car.id === group.cars[j].id) {
          return {
            status: 409,
            message: { message: `Car ${carList[i]} already in the group` },
          };
        }
      }

      if (!car) {
        return {
          status: 404,
          message: { message: `Car ${carList[i]} not found` },
        };
      }
    }

    for (let i = 0; i < carList.length; i++) {
      const car = await carRepo.findOneBy({ id: carList[i] });

      await carRepo.update(car.id, { group: group });
    }

    await groupRepo.update(req.params.group_id, {
      quantity: group.quantity + carList.length,
    });

    return { status: 200, message: { message: "Car(s) added" } };
  };
}

export default new CarGroupService();
