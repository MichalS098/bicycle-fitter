import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateBikesTable1682638602865 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "bike" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "brand" varchar,
                "model" varchar,                
                "type" varchar,
                "expectationsBackOrNeckPain" boolean,
                "expectationsButPain" boolean,
                "expectationsKneePain" boolean,
                "expectationsFeetPain" boolean,
                "expectationsClickPedals" number,
                "expectationsNothing" boolean,
                "style" varchar,
                "crankLength" integer,
                "seatHeight" integer,
                "seatSetback" integer,
                "seatLength" integer,
                "seatDrop" integer,
                "spacerHeight" integer,
                "stemLength" integer,
                "stemAngle" integer,
                "frameHeight" integer,
                "crankLengthInInch" integer,
                "stackMin" integer,
                "reachMin" integer,
                "stackMax" integer,
                "reachMax" integer,
                "stack2ReachIndex1" integer,
                "stack2ReachIndex2" integer,
                "stack2ReachIndex3" integer,          
                "messageFromFlexibilitySurvey" varchar,
                "messageFromNeckOrBackPain" varchar,
                "messageFromButPain" varchar,
                "messageFromFeetPain" varchar,
                "messageFromKneePain" varchar,  
                "userId" integer, CONSTRAINT "FK_Bike_User" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "bike"
        `)
    }
}
