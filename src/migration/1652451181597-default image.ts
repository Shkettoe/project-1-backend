import {MigrationInterface, QueryRunner} from "typeorm";

export class defaultImage1652451181597 implements MigrationInterface {
    name = 'defaultImage1652451181597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "avatar" SET DEFAULT 'http://localhost:8000/users/uploads/default.png'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "avatar" SET DEFAULT ''`);
    }

}
