import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Car } from "./car.entity";

@Entity("groups")
export class CarGroup {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "integer" })
  quantity: number;

  @Column({ type: "float" })
  price: number;

  @OneToMany(() => Car, (car) => car.group, { 
    eager: true
  })
  cars: Car[];
}
