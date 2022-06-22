import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Car } from "./car.entity";
import { User } from "./user.entity";

@Entity("reservation")
export class UserCarReservation {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "integer", nullable: true })
  days: number;

  @Column({ type: "date" })
  startDate: Date;

  @Column({ type: "date" })
  endDate: Date;

  @ManyToOne(() => User, (user) => user.reservationHistory)
  user: User;

  @ManyToOne(() => Car, (car) => car.reservationHistory)
  car: Car;
}
