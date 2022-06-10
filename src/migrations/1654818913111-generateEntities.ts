import { MigrationInterface, QueryRunner } from "typeorm";

export class generateEntities1654818913111 implements MigrationInterface {
    name = 'generateEntities1654818913111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "days" integer NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_adm" boolean NOT NULL DEFAULT false, "employed_at_id" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying(100) NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "UQ_78a18178ef547bb377e5d49e6fe" UNIQUE ("address"), CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "plate" character varying(10) NOT NULL, "year" character(4) NOT NULL, "color" character varying(50) NOT NULL, "brand" character varying(50) NOT NULL, "is_available" boolean NOT NULL DEFAULT true, "group_id" uuid, "stocked_at_id" uuid, CONSTRAINT "UQ_a309ce7ba400919557999e69be1" UNIQUE ("plate"), CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text NOT NULL, "quantity" integer NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_reservation_history_reservation" ("users_id" uuid NOT NULL, "reservation_id" uuid NOT NULL, CONSTRAINT "PK_4de49105a65481cbb05eb91f871" PRIMARY KEY ("users_id", "reservation_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ad869d10398c7463358b99bb88" ON "users_reservation_history_reservation" ("users_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9b524a94d6828a93e64fb15bc3" ON "users_reservation_history_reservation" ("reservation_id") `);
        await queryRunner.query(`CREATE TABLE "cars_reservation_history_reservation" ("cars_id" uuid NOT NULL, "reservation_id" uuid NOT NULL, CONSTRAINT "PK_0ebd2fb53816c8af9dbe3ca9639" PRIMARY KEY ("cars_id", "reservation_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6f86921c4ce2edcaa5ec688bb6" ON "cars_reservation_history_reservation" ("cars_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ab6a1b80c14b59870629e02b25" ON "cars_reservation_history_reservation" ("reservation_id") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9d3828caab23bdfef6c00eb26a8" FOREIGN KEY ("employed_at_id") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_44111ba5537f5a75e00c366c9c1" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_37a9b2167ed4265729d3d7ef868" FOREIGN KEY ("stocked_at_id") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_reservation_history_reservation" ADD CONSTRAINT "FK_ad869d10398c7463358b99bb884" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_reservation_history_reservation" ADD CONSTRAINT "FK_9b524a94d6828a93e64fb15bc3a" FOREIGN KEY ("reservation_id") REFERENCES "reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cars_reservation_history_reservation" ADD CONSTRAINT "FK_6f86921c4ce2edcaa5ec688bb6f" FOREIGN KEY ("cars_id") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cars_reservation_history_reservation" ADD CONSTRAINT "FK_ab6a1b80c14b59870629e02b253" FOREIGN KEY ("reservation_id") REFERENCES "reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars_reservation_history_reservation" DROP CONSTRAINT "FK_ab6a1b80c14b59870629e02b253"`);
        await queryRunner.query(`ALTER TABLE "cars_reservation_history_reservation" DROP CONSTRAINT "FK_6f86921c4ce2edcaa5ec688bb6f"`);
        await queryRunner.query(`ALTER TABLE "users_reservation_history_reservation" DROP CONSTRAINT "FK_9b524a94d6828a93e64fb15bc3a"`);
        await queryRunner.query(`ALTER TABLE "users_reservation_history_reservation" DROP CONSTRAINT "FK_ad869d10398c7463358b99bb884"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_37a9b2167ed4265729d3d7ef868"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_44111ba5537f5a75e00c366c9c1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9d3828caab23bdfef6c00eb26a8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ab6a1b80c14b59870629e02b25"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6f86921c4ce2edcaa5ec688bb6"`);
        await queryRunner.query(`DROP TABLE "cars_reservation_history_reservation"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9b524a94d6828a93e64fb15bc3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ad869d10398c7463358b99bb88"`);
        await queryRunner.query(`DROP TABLE "users_reservation_history_reservation"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
    }

}
