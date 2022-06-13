import { MigrationInterface, QueryRunner } from "typeorm";

export class removeSnakeCase1655069843569 implements MigrationInterface {
    name = 'removeSnakeCase1655069843569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "days" integer NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isAdm" boolean NOT NULL DEFAULT false, "employedAtId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying(100) NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "UQ_78a18178ef547bb377e5d49e6fe" UNIQUE ("address"), CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "plate" character varying(10) NOT NULL, "year" character(4) NOT NULL, "color" character varying(50) NOT NULL, "brand" character varying(50) NOT NULL, "isAvailable" boolean NOT NULL DEFAULT true, "groupId" uuid, "stockedAtId" uuid, CONSTRAINT "UQ_a309ce7ba400919557999e69be1" UNIQUE ("plate"), CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text NOT NULL, "quantity" integer NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_reservation_history_reservation" ("usersId" uuid NOT NULL, "reservationId" uuid NOT NULL, CONSTRAINT "PK_deda5154688b0a4467eb0ff3caf" PRIMARY KEY ("usersId", "reservationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_af73904c6f2b7cee967acdb5cd" ON "users_reservation_history_reservation" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5269e3b4258928eec29e58890d" ON "users_reservation_history_reservation" ("reservationId") `);
        await queryRunner.query(`CREATE TABLE "cars_reservation_history_reservation" ("carsId" uuid NOT NULL, "reservationId" uuid NOT NULL, CONSTRAINT "PK_be6aaa50bd143123224087cd823" PRIMARY KEY ("carsId", "reservationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8917ab92f85df68739482d81ba" ON "cars_reservation_history_reservation" ("carsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_532c91488b769e997f674760bd" ON "cars_reservation_history_reservation" ("reservationId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_776c6be7463144d2df42a89c2e7" FOREIGN KEY ("employedAtId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_42e0bd3fb943f2f645c2c8a643a" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_9ffcffde90ca963f614abedd0d5" FOREIGN KEY ("stockedAtId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_reservation_history_reservation" ADD CONSTRAINT "FK_af73904c6f2b7cee967acdb5cd0" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_reservation_history_reservation" ADD CONSTRAINT "FK_5269e3b4258928eec29e58890dd" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cars_reservation_history_reservation" ADD CONSTRAINT "FK_8917ab92f85df68739482d81baf" FOREIGN KEY ("carsId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cars_reservation_history_reservation" ADD CONSTRAINT "FK_532c91488b769e997f674760bd3" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars_reservation_history_reservation" DROP CONSTRAINT "FK_532c91488b769e997f674760bd3"`);
        await queryRunner.query(`ALTER TABLE "cars_reservation_history_reservation" DROP CONSTRAINT "FK_8917ab92f85df68739482d81baf"`);
        await queryRunner.query(`ALTER TABLE "users_reservation_history_reservation" DROP CONSTRAINT "FK_5269e3b4258928eec29e58890dd"`);
        await queryRunner.query(`ALTER TABLE "users_reservation_history_reservation" DROP CONSTRAINT "FK_af73904c6f2b7cee967acdb5cd0"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_9ffcffde90ca963f614abedd0d5"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_42e0bd3fb943f2f645c2c8a643a"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_776c6be7463144d2df42a89c2e7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_532c91488b769e997f674760bd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8917ab92f85df68739482d81ba"`);
        await queryRunner.query(`DROP TABLE "cars_reservation_history_reservation"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5269e3b4258928eec29e58890d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_af73904c6f2b7cee967acdb5cd"`);
        await queryRunner.query(`DROP TABLE "users_reservation_history_reservation"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
    }

}
