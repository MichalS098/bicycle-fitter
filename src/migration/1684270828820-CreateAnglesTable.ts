import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateAnglesTable1684270828820 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "angles" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "footFloorAngleMax" integer,
                "footFloorAngleMin" integer,
                "thighShankAngleMax" integer,
                "thighShankAngleMin" integer,
                "torsoFloorAngleMax" integer,
                "torsoFloorAngleMin" integer,
                "torsoBicepAngleMax" integer,
                "torsoBicepAngleMin" integer,
                "bicepForearmAngleMax" integer,
                "bicepForearmAngleMin" integer,
                "crankAngle" integer,
                "bikeId" integer,
                CONSTRAINT "FK_Angles_Bike" FOREIGN KEY ("bikeId") REFERENCES "bike" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "angles"
        `)
    }

}
