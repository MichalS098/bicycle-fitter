import { MigrationInterface, QueryRunner } from "typeorm"

const tips = [
    {        
        title: 'Tip 1',
        description: 'Tip 1 description',
        content: 'Tip 1 content'
    },
    {
        title: 'Tip 2',
        description: 'Tip 2 description',
        content: 'Tip 2 content'
    },
    {
        title: 'Tip 3',
        description: 'Tip 3 description',
        content: 'Tip 3 content'
    }
]

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

        await queryRunner.connection
            .createQueryBuilder()
            .insert()
            .into('tip')
            .values(tips)
            .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "tip"
        `)
    }

}
