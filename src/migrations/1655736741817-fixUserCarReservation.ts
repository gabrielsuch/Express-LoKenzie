import { MigrationInterface, QueryRunner } from "typeorm";

export class fixUserCarReservation1655736741817 implements MigrationInterface {
    name = 'fixUserCarReservation1655736741817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9d3828caab23bdfef6c00eb26a8"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_44111ba5537f5a75e00c366c9c1"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_37a9b2167ed4265729d3d7ef868"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_adm"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "employed_at_id"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "is_available"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "group_id"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "stocked_at_id"`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD "startDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD "endDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD "carId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdm" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "employedAtId" uuid`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "isAvailable" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "groupId" uuid`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "stockedAtId" uuid`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_529dceb01ef681127fef04d755d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_2d51eea28bf301076d640182058" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_776c6be7463144d2df42a89c2e7" FOREIGN KEY ("employedAtId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_42e0bd3fb943f2f645c2c8a643a" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_9ffcffde90ca963f614abedd0d5" FOREIGN KEY ("stockedAtId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_9ffcffde90ca963f614abedd0d5"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_42e0bd3fb943f2f645c2c8a643a"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_776c6be7463144d2df42a89c2e7"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_2d51eea28bf301076d640182058"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_529dceb01ef681127fef04d755d"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "stockedAtId"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "groupId"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "isAvailable"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "employedAtId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdm"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "carId"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "stocked_at_id" uuid`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "group_id" uuid`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "is_available" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" ADD "employed_at_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_adm" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD "end_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD "start_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_37a9b2167ed4265729d3d7ef868" FOREIGN KEY ("stocked_at_id") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_44111ba5537f5a75e00c366c9c1" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9d3828caab23bdfef6c00eb26a8" FOREIGN KEY ("employed_at_id") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
