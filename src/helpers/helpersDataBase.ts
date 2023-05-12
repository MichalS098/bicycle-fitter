import AppDataSource from '@/data-sources/SqliteDataSource';
import { Bike } from '@/entity/Bike';
import { User } from '@/entity/User';

export async function updateProperty<T, K extends keyof T, W extends object>(entityType: new () => T, where: W, property: K, newValue: T[K]): Promise<void> {
    const repository = AppDataSource.getRepository(entityType);
    const entityToUpdate = await repository.findOneBy(where);
    if (entityToUpdate != null) {
        (entityToUpdate as any)[property] = newValue;
        await repository.save(entityToUpdate);
        console.log(`${entityType.name}.${String(property)} has been saved`);
        console.log("Updated entity: ", entityToUpdate);
    }
}

export async function getLastBikeOfUser(): Promise<Bike | null> {
    const user = await User.findOne({
        where: {
            id: 1
        },
        relations: {
            bikes: true
        }
    });

    if (!user) {
        console.error('User not found');
        return null;
    }

    return user.bikes[user.bikes.length - 1];
}

export async function getUserFromDatabase(): Promise<User | null> {        
    const user = await User.findOneBy({
        id: 1,
    })

    if (!user) {
        console.error('User not found');
        return null;
    }

    return user;
}

export async function dropDatabase(): Promise<void> {
    await AppDataSource.dropDatabase();        
}