import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Car } from "./car.entity";
import { User } from "./user.entity";

@Entity("store")
export class Store {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ length: 100, unique: true })
  address: string;

  @Column({ type: "integer" })
  quantity: number;

  @OneToMany(() => User, (user) => user.employedAt)
  employees: User[];

  @OneToMany(() => Car, (car) => car.stockedAt)
  stock: Car[];
}
