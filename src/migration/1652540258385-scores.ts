import {MigrationInterface, QueryRunner} from "typeorm";

export class scores1652540258385 implements MigrationInterface {
    name = 'scores1652540258385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "score" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "score"`);
    }

}
