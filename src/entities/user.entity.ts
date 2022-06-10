import { compare } from "bcrypt";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    ManyToOne,
} from "typeorm";
import { Store } from "./store.entity";
import { UserCarReservation } from "./user-car-reservation.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ length: 100, nullable: false })
    name: string;

    @Column({ length: 100, nullable: false, unique: true })
    email: string;

    @Column({ length: 100 })
    password: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({ default: false })
    isAdm?: boolean;

    @ManyToMany(() => UserCarReservation)
    @JoinTable()
    reservationHistory: UserCarReservation[];

    @ManyToOne(() => Store, (store) => store.employees)
    employedAt: Store;

    comparePwd = async (pwdString: string): Promise<boolean> => {
        return await compare(pwdString, this.password);
    };
}
