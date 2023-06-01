import { MigrationInterface, QueryRunner } from "typeorm"

const categories = [
    {
        id: 1,
        name: 'Crucial in b-fitting'
    },
    {
        id: 2,
        name: 'Trip preparation'
    }
];

const category_tips_tip = [
    {
        categoryId: 1,
        tipId: 1,
    },
    {
        categoryId: 1,
        tipId: 2,
    },
    {
        categoryId: 2,
        tipId: 3,
    },
    {
        categoryId: 1,
        tipId: 4,
    },
    {
        categoryId: 2,
        tipId: 4,
    }
]

const tips = [
    {
        id: 1,
        title: 'Tip 1',
        description: 'Tip 1 description',
        content: 'Tip 1 content',
        favourite: false,
        featured_image_path: '../../assets/images/tip-test.png',
        color: 'primary'
    },
    {
        id: 2,
        title: 'Tip 2',
        description: 'Tip 2 description',
        content: 'Tip 2 content',
        favourite: false,
        featured_image_path: '../../assets/images/tip-test-2.png',
        color: 'secondary'
    },
    {
        id: 3,
        title: 'This is my favourite!',
        description: 'Tip 3 description',
        content: 'Tip 3 content',
        favourite: true,
        featured_image_path: '../../assets/images/tip-test-3.png',
        color: 'tertiary'
    },
    {
        id: 4,
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

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "category" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar            
            )
        `)

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "category_tips_tip" (
                "categoryId" integer NOT NULL,
                "tipId" integer NOT NULL,
                CONSTRAINT "FK_Category_Tips_Tip_TipId"
                FOREIGN KEY ("tipId") REFERENCES "tip" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_Category_Tips_Tip_CategoryId"
                FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("tipId", "categoryId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_Category_Tips_Tip_TipId" ON "category_tips_tip" ("tipId");
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_Category_Tips_Tip_CategoryId" ON "category_tips_tip" ("categoryId");      
        `);

        await queryRunner.connection
            .createQueryBuilder()
            .insert()
            .into('tip')
            .values(tips)
            .execute()

        await queryRunner.connection
            .createQueryBuilder()
            .insert()
            .into('category')
            .values(categories)
            .execute()

        await queryRunner.connection
            .createQueryBuilder()
            .insert()
            .into('category_tips_tip')
            .values(category_tips_tip)
            .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "tip"
        `)

        await queryRunner.query(`
            DROP TABLE "category"
        `)

        await queryRunner.query(`
            DROP TABLE "category_tips_tip"
        `)
    }

}
