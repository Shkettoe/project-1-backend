import {MigrationInterface, QueryRunner} from "typeorm";

export class postscreatedupdated1652537302299 implements MigrationInterface {
    name = 'postscreatedupdated1652537302299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "posted_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "post" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "posted_at"`);
    }

}
