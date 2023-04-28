import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTipsTable1682638608288 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "tip" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar,
                "description" varchar,
                "content" varchar
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "tip"
        `)
    }

}
