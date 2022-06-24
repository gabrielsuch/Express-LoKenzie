import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CarGroup } from "./car-group.entity";
import { Store } from "./store.entity";
import { UserCarReservation } from "./user-car-reservation.entity";

@Entity("cars")
export class Car {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ length: 10, unique: true })
  plate: string;

  @Column({ type: "char", length: 4 })
  year: number;

  @Column({ length: 50 })
  color: string;

  @Column({ length: 50 })
  brand: string;

  @Column({ default: true })
  isAvailable?: boolean;

  @OneToMany(() => UserCarReservation, (ucr) => ucr.car, {
    eager: true,
    onDelete: "CASCADE"
  })
  reservationHistory: UserCarReservation[];

  @ManyToOne(() => CarGroup, (group) => group.cars, { lazy: true })
  group: CarGroup;

  @ManyToOne(() => Store, (store) => store.stock)
  stockedAt: Store;
}
