import { MigrationInterface, QueryRunner } from "typeorm";

export class fixDaysToNullable1655904515924 implements MigrationInterface {
    name = 'fixDaysToNullable1655904515924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" ALTER COLUMN "days" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" ALTER COLUMN "days" SET NOT NULL`);
    }

}
