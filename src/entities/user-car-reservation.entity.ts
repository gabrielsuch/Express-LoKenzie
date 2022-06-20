import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("reservation")
export class UserCarReservation {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "integer" })
  days: number;

  @Column({ type: "date" })
  startDate: Date;

  @Column({ type: "date" })
  endDate: Date;
}
