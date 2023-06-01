import { MigrationInterface, QueryRunner } from "typeorm"

const tips = [
    {        
        title: 'Tip 1',
        description: 'Tip 1 description',
        content: 'Tip 1 content',
        favourite: false,
        featured_image_path: '../../assets/images/tip-test.png',
        color: 'primary'
    },
    {
        title: 'Tip 2',
        description: 'Tip 2 description',
        content: 'Tip 2 content',
        favourite: false,
        featured_image_path: '../../assets/images/tip-test-2.png',
        color: 'secondary'
    },
    {
        title: 'This is my favourite!',
        description: 'Tip 3 description',
        content: 'Tip 3 content',
        favourite: true,
        featured_image_path: '../../assets/images/tip-test-3.png',
        color: 'tertiary'
    },
    {
        title: 'This has primary color',
        description: 'Tip 3 description',
        content: 'Tip 3 content lorem',
        favourite: true,
        featured_image_path: '../../assets/images/tip-test-4.png',
        color: 'primary'
    }
]

export class CreateTipsTable1682638608288 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "tip" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar,
                "description" varchar,
                "content" varchar,
                "favourite" boolean,
                "featured_image_path" varchar,
                "color" varchar        
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
