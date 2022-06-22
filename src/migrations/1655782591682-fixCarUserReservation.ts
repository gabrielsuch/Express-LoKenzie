import { MigrationInterface, QueryRunner } from "typeorm";

import dotenv from "dotenv"
import bcrypt from "bcrypt"

dotenv.config()


export class fixCarUserReservation1655782591682 implements MigrationInterface {
    name = 'fixCarUserReservation1655782591682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "days" integer NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "userId" uuid, "carId" uuid, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isAdm" boolean NOT NULL DEFAULT false, "employedAtId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying(100) NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "UQ_78a18178ef547bb377e5d49e6fe" UNIQUE ("address"), CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "plate" character varying(10) NOT NULL, "year" character(4) NOT NULL, "color" character varying(50) NOT NULL, "brand" character varying(50) NOT NULL, "isAvailable" boolean NOT NULL DEFAULT true, "groupId" uuid, "stockedAtId" uuid, CONSTRAINT "UQ_a309ce7ba400919557999e69be1" UNIQUE ("plate"), CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text NOT NULL, "quantity" integer NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_529dceb01ef681127fef04d755d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_2d51eea28bf301076d640182058" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_776c6be7463144d2df42a89c2e7" FOREIGN KEY ("employedAtId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_42e0bd3fb943f2f645c2c8a643a" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_9ffcffde90ca963f614abedd0d5" FOREIGN KEY ("stockedAtId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(
            `
                INSERT INTO "users" ("name", "email", "password", "isAdm")
                VALUES ('${process.env.ADMIN_NAME}', '${process.env.ADMIN_EMAIL}', '${bcrypt.hashSync(String(process.env.ADMIN_PASSWORD), 10)}', true)
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_9ffcffde90ca963f614abedd0d5"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_42e0bd3fb943f2f645c2c8a643a"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_776c6be7463144d2df42a89c2e7"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_2d51eea28bf301076d640182058"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_529dceb01ef681127fef04d755d"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
    }

}
