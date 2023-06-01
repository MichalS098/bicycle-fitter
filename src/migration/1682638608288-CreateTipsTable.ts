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
        title: 'Start with Education ',
        description: 'The best bike fitting begins with a solid foundation of knowledge. ',
        content: `      <p class="lead">Bike fitting is more than just a few simple adjustments - it's a science. Understanding how different parts of your bike interact will help you make the most effective changes.</p>      <p>Start by learning the basics. Find out how the height of your saddle affects your pedaling efficiency and knee comfort. Learn how the position of your handlebars can change your posture and impact the load on your wrists and back. Understand how the length of the crank affects the power you can generate, as well as your range of motion. 

        Every type of bike - mountain, road, city - has its specific requirements for bike fitting, so it's worth learning what these differences are. Additionally, each of us has a unique body structure, which means that the ideal bike settings will differ for each person. 
        
        Our app is a rich source of information about bike fitting. Use the available educational materials to better understand what changes you can make, what benefits these changes will bring, and what additional adjustments you may need in the future. The knowledge you gain will help you better understand the suggestions and advice given by our app. </p>      `,
        favourite: false,
        featured_image_path: '../../assets/images/tip_education.png',
        color: 'primary'
    },
    {
        id: 2,
        title: 'Step by Step ',
        description: 'Effective bike fitting is a process that requires precision and patience - go step by step. ',
        content: `      <p class="lead">Bike fitting isn't something you do once and forget. It's a process that requires time, precision, and patience. Our app is designed to guide you through this process step by step.</p>      <p>We'll start with the basics: saddle, handlebar, and pedal settings. Each of these elements is crucial to your performance and comfort, and their proper adjustment can prevent injuries. For each element, we'll show you how to make appropriate changes, what the optimal settings are, and what effects they can bring. 

        Once you're done with the basics, we'll move on to more advanced settings, such as crank length or cleat position on cycling shoes. At this stage, our app will provide you with personalized advice based on your previous settings and the information you've given us. 
        
        Remember, every change, even the smallest one, can have a big impact on your ride. That's why it's important to make changes slowly, observe how they affect your comfort and performance, and then adjust the settings based on these observations. 
        
        Go step by step, be patient and precise, and you'll see how a well-fitted bike can enhance your riding pleasure and performance.  </p>      `,
        favourite: false,
        featured_image_path: '../../assets/images/tip_step_by_step.png',
        color: 'secondary'
    },
    {
        id: 3,
        title: 'Interactivity ',
        description: 'Leverage the apps personalization and interactivity features to achieve the best results. ',
        content: `     <p class="lead">A bike is not just a machine, it's an extension of you. Just as each of us is different, so too should every bike be properly adjusted. Our app allows you to input your own data and receive personalized advice about bike fitting. </p>      <p>Provide us with your basic information - such as height, weight, and leg length - and we will tailor the recommendations to your body. For example, the height of the saddle is crucial for pedaling efficiency and knee comfort. Using the information about your height and leg length, we can suggest the ideal saddle height for you. 

        But that's not all. You can tell us more about your riding style, preferences, and goals. Do you primarily ride on the road or off-road? Do you value comfort over performance, or are you looking for the ideal balance between the two? Are you training for a specific event or just want to enjoy daily rides? 
        
        The more information you give us, the better we can tailor our recommendations to your individual needs. So don't hesitate to use the interactive features of our app. Let us help you create the perfect fit for you and your bike.   </p>   `,
        favourite: true,
        featured_image_path: '../../assets/images/tip_interactivity.png',
        color: 'tertiary'
    },
    {
        id: 4,
        title: 'Adjustment and Modification ',
        description: 'Dont be afraid to modify settings, experiment, and tailor your bike to your needs.',
        content:  `     <p class="lead">Bike fitting is a process of continual adjustment, not a one-time setup. Your body, skills, and goals may change over time, so don't be afraid to adjust your bike's settings to match your current state.  </p>      <p>Our app will help you understand what changes can bring benefits, but remember, you are the expert on your body. If something doesn't feel right, even if all the settings seem perfect, you should always make the necessary changes. 

        Experiment with different settings. You might find that you prefer a slightly lower saddle for comfort, or that you pedal more comfortably with a slightly wider foot stance. Every change you make should bring you a benefit - improved comfort, increased efficiency, or reduced risk of injury. 
        
        Remember, the process of fitting your bike doesn't end when everything is set "correctly". That's just the start of your journey. Learn to listen to your body, observe how it responds to different settings, and continually adjust your bike to make it the best it can be for you.    </p>   `,
        favourite: true,
        featured_image_path: '../../assets/images/tip_modification.png',
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
