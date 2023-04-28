import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUsersTable1682638592843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "unitSystem" varchar,
                "height" integer,
                "rideTime" varchar,
                "riderStyle" varchar,
                "shankLength" integer,
                "thighLength" integer,
                "shoeSize" integer,
                "inseamLength" integer,
                "shoulderHeight" integer,
                "armLength" integer,
                "armTorsoAngle" integer,
                "overallHeight" integer,
                "torsoAngle" integer
            )
        `)

        await queryRunner.query(`
            CREATE TABLE "user_tips_tip" (
                "userId" integer NOT NULL,
                "tipId" integer NOT NULL,
                CONSTRAINT "FK_User_Tips_Tip_UserId"
                FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_User_Tips_Tip_TipId"
                FOREIGN KEY ("tipId") REFERENCES "tip" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("userId", "tipId"));
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_User_Tips_Tip_UserId" ON "user_tips_tip" ("userId");
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_User_Tips_Tip_TipId" ON "user_tips_tip" ("tipId");      
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `)

        await queryRunner.query(`
            DROP TABLE "user_tips_tip"
        `)

        await queryRunner.query(`
            DROP INDEX "IDX_User_Tips_Tip_UserId"
        `)

        await queryRunner.query(`
            DROP INDEX "IDX_User_Tips_Tip_TipId"
        `)        
    }
}
