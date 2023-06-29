import { MigrationInterface, QueryRunner } from "typeorm"

const categories = [
    {
        id: 1,
        name: 'Crucial in b-fitting'
    },
    {
        id: 2,
        name: 'Adjustments on bike'
    },
    {
        id: 3,
        name: 'Trip preparation'
    }
];

const category_tips_tip = [
    {
        categoryId: 1,
        tipId: 1,
    },
    {
        categoryId: 2,
        tipId: 2,
    },
    {
        categoryId: 1,
        tipId: 3,
    },
    {
        categoryId: 1,
        tipId: 4,
    },
    {
        categoryId: 2,
        tipId: 5,
    },
    {
        categoryId: 3,
        tipId: 6,
    },
    {
        categoryId: 3,
        tipId: 7,
    }
]

const tips = [
    {
        id: 1,
        title: 'About Bike Fitting ',
        description: 'The best bike fitting begins with a solid foundation of knowledge. ',
        content: `<p class="lead">
        Bike fitting is more than just a few simple adjustments - it's a science. 
        Understanding how different parts of your bike interact will help you make the most effective changes.</p>      
        <p>Start by learning the basics. Find out how the height of your saddle affects your pedaling efficiency and knee comfort. 
        Learn how the position of your handlebars can change your posture and impact the load on your wrists and back. 
        Understand how the length of the crank affects the power you can generate, as well as your range of motion. 
        Every type of bike - mountain, road, city - has its specific requirements for bike fitting, so it's worth 
        learning what these differences are. Additionally, each of us has a unique body structure, which means that the ideal bike settings will differ for each person. 
        Our app is a rich source of information about bike fitting. Use the available educational materials to better understand what changes you can make, what benefits 
        these changes will bring, and what additional adjustments you may need in the future. The knowledge you gain will help you better understand the suggestions and advice given by our app. </p>`,
        favourite: false,
        featured_image_path: '../../assets/images/tip_education.png',
        color: 'primary'
    },
    {
        id: 2,
        title: 'Saddle Adjustment Guide',
        description: 'Saddle position is crucial for your comfort, performance, and prevention of injuries.',
        content: `<p class="lead">
        The saddle is one of the three contact points between the cyclist and the bike, and its proper adjustment can drastically change your cycling experience.</p>      
        <p>The first factor to consider is saddle height. It should be set in a way that allows your leg to be slightly bent when the pedal is at the lowest point. An improperly adjusted saddle can lead to inefficiency and knee pain. Next, consider saddle tilt. Ideally, it should be level to support your full body weight and allow you to move around on the seat when necessary.</p>
        <p>The third point of saddle adjustment is fore and aft positioning. When your foot is on the pedal with the crank arm parallel to the ground, your kneecap should be directly over the pedal axle. This position promotes efficient pedaling and reduces strain on the knees. Remember, tiny adjustments can make a huge difference to your comfort and performance, so take the time to fine-tune your saddle position.</p>
        <p>Just as important is the type of saddle. Everyone's anatomy is different, and there is no one-size-fits-all. Some might prefer a wider, more cushioned saddle, while others might go for a narrow, racing style one. It may take several tries to find the one that fits you best, so don't be discouraged if the first saddle you try doesn't feel right.</p>
        <p>Use our app to keep track of your adjustments, note the changes you feel, and progressively refine your setup. Over time, this will help you understand what works best for your body, your bike, and your style of cycling.</p>`,
        favourite: false,
        featured_image_path: '../../assets/images/tip_orange.png',
        color: 'secondary'
    },
    
    {
        id: 3,
        title: 'Importance of Bike Geometry',
        description: 'Understanding bike geometry will allow you to choose a bike that best suits your riding style and comfort needs.',
        content: `<p class="lead">
        Bike geometry refers to the various lengths and angles that make up a bike frame. These measurements greatly affect how a bike will perform and feel.</p>      
        <p>One of the most important aspects is the top tube length, as it largely determines the reach - the distance from the saddle to the handlebars. If the reach is too long, you may end up stretching out and straining your back and shoulders; if it's too short, you might feel cramped and unable to breathe properly.</p>
        <p>The seat tube angle also matters, as it determines the position of your body relative to the pedals. A steeper angle (more vertical) puts you over the pedals, which is good for climbing and racing, while a slacker angle (more horizontal) offers a more relaxed position.</p>
        <p>Similarly, the head tube angle affects steering responsiveness. Steeper angles result in quicker but potentially twitchier steering, suitable for racing bikes. Slacker angles yield more stable, relaxed steering, common on endurance and mountain bikes.</p>
        <p>Knowing these fundamentals of bike geometry will help you make an informed choice when buying a bike or adjusting an existing one to your needs. Combined with a proper saddle and handlebar adjustment, understanding bike geometry will allow you to optimize your ride for comfort, speed, or anything in between. Consult our app for more specific advice on bike geometry.</p>`,
        favourite: false,
        featured_image_path: '../../assets/images/tip_modification.png',
        color: 'secondary'
    },
    {
        id: 4,
        title: 'Not so plug-and-play ',
        description: 'Expect to spend some time on adjusting your bike. ',
        content: `     <p class="lead">
        Your entire bodymass is balanced between 3 points – the handlebars, the seat and the pedals. 
        To low or to high of a position may cause unnecessary tension in your joints. 
        </p>
        <p>Adjusting the height of the seat is not enough.
        Setting the tilt of the seat to far forward will force you to waste some of your 
        energy on supporting the mass with your feet. For every possible adjustible part 
        there are at least two ways you can end up with a misconfigured machine. Take your time. 
        Repeat the process as many times as you need or want. Configuring the optimal position will 
        take time and effort, so don’t be afraid of some trial and error.  </p>   `,
        favourite: true,
        featured_image_path: '../../assets/images/tip_interactivity.png',
        color: 'primary'
    },
    {
        id: 5,
        title: 'Handlebar adjustments ',
        description: 'Avoid overbent elbows and tense shoulders.',
        content:  `     <p class="lead">
        If you suffer from constantly tense shoulders or overbent elbows, try swapping the stem (the part connecting the handlebar with the bike frame) with a different model. 
        </p>
        <p>
        A handlebar set to low or too high may cause tension in the lower back as well as your arms. If the make of your bike allows for it, try experimenting with the stem by, for instance, rotating it upside down. 

        A properly adjusted stem should allow you to relax your lower back, forearms and wrists. Browse your favorite marketplace for replacement stems – entry-level models aren’t usually that expensive and will give you some tools to experiment with.    </p>   `,
        favourite: false,
        featured_image_path: '../../assets/images/tip_blue.png',
        color: 'tertiary'
    },
    {
        id: 6,
        title: 'Switching to Clipless Pedals',
        description: 'Stepping up to clipless pedals can significantly improve your cycling efficiency and control.',
        content: `<p class="lead">
        Clipless pedals, despite the somewhat misleading name, are pedals that you 'clip into' using special cycling shoes with cleats on the bottom. This setup offers numerous benefits, such as increased power transfer, better bike control, and a more secure feel.</p>
        <p>When switching to clipless pedals, it's important to start slowly. Practice clipping in and out while stationary before you head out for a ride. Remember, it's not about force but the right motion - a twist of the heel usually does the trick. Anticipate situations where you'll need to unclip, like when approaching a stop, and do it ahead of time to prevent falls.</p>
        <p>Adjustment of the cleats on your shoes affects how your foot sits on the pedal. This positioning is critical for comfort and pedaling efficiency. Initially, set your cleats to allow your feet to sit naturally on the pedals without any sideways twist. Over time, listen to your body and make necessary adjustments.</p>
        <p>It's normal to experience a few mishaps when getting used to clipless pedals, like slow-motion falls when stopping. It happens to everyone, so don't be discouraged. Over time, clipping in and out will become second nature.</p>
        <p>Our app provides step-by-step guidance for setting up and using clipless pedals. It also offers suggestions for choosing the right pedal and shoe system for your riding style, whether you're a road cyclist, mountain biker, or casual rider. Take advantage of these resources to make your transition to clipless pedals smooth and beneficial.</p>`,
        favourite: false,
        featured_image_path: '../../assets/images/tip_hipster.png',
        color: 'primary'
    },
    {
        id: 7,
        title: 'Preparation for Your Bike Trip',
        description: 'Proper planning and preparation can make your cycling trip a success.',
        content: `<p class="lead">
        A well-prepared bike trip can be a rewarding adventure, whether it's a short day trip or a long-distance journey. Here are some important things to consider.</p>
        <p>Firstly, always inspect your bike before setting off. Check the tire pressure, brakes, chain, and gears to ensure everything is functioning correctly. A basic repair kit including a multitool, inner tubes, patch kit, tire levers, and a portable pump or CO2 inflator is essential.</p>
        <p>Planning your route in advance is key. Research the terrain and consider the difficulty level - be realistic about your abilities. Using GPS navigation or a cycling app can help keep you on track. Remember to check the weather forecast and plan accordingly.</p>
        <p>Hydration and nutrition are vital, especially for longer rides. Carry enough water and high-energy snacks to replenish your energy. For longer trips, plan where you can restock.</p>
        <p>Wear suitable clothing. Consider the weather and the length of your ride. A helmet is essential, and cycling-specific clothing can greatly enhance your comfort. Don't forget about sun protection and a pair of quality cycling gloves.</p>
        <p>Lastly, always inform someone about your route and estimated return time. Safety should be your top priority.</p>
        <p>Our app provides comprehensive resources for bike trip planning, including gear checklists, route suggestions, and advice on nutrition and hydration. Leverage these to make your next bike trip an unforgettable adventure.</p>`,
        favourite: false,
        featured_image_path: '../../assets/images/tip_jezus.png',
        color: 'tertiary'
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
