import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUsersTable1682638592843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "unitSystem" varchar,
                "hasMeasuredWithCamera" boolean,
                "measurementsInstructionShown" boolean,
                "language" varchar,                                
                "riderStyle" varchar,
                "shankLength" integer,
                "thighLength" integer,
                "shoeSize" integer,
                "inseamLength" integer,
                "shoulderHeight" integer,
                "armLength" integer,
                "armTorsoAngle" integer,
                "overallHeight" integer,
                "torsoAngle" integer,
                "choiceFlexibilitySurvey" integer
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `)
    }
}
