import { User } from '@/entity/User';
import { Bike } from '@/entity/Bike';
import { Tip } from '@/entity/Tip';
import { CreateUsersTable1682638592843 } from '@/migration/1682638592843-CreateUsersTable';
import { CreateBikesTable1682638602865 } from '@/migration/1682638602865-CreateBikesTable';
import { CreateTipsTable1682638608288 } from '@/migration/1682638608288-CreateTipsTable';
import { DataSource } from 'typeorm';
import sqliteConnection from '@/database';

export default new DataSource({
    name: 'sqlite',
    type: 'capacitor',
    driver: sqliteConnection,
    database: 'app-bicycle-fitter',
    entities: [User, Bike, Tip],
    migrations: [CreateUsersTable1682638592843, CreateBikesTable1682638602865, CreateTipsTable1682638608288],
    logging: ['error', 'query', 'schema'],
    synchronize: false,
    migrationsRun: true,
});
