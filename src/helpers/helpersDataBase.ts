import AppDataSource from '@/data-sources/SqliteDataSource';
import { Bike } from '@/entity/Bike';
import { User } from '@/entity/User';
import { Tip } from '@/entity/Tip';

export async function updateUserProperty<K extends keyof User>(property: K, newValue: User[K]): Promise<void> {
    const userRepository = AppDataSource.getRepository(User);

    const userToUpdate = await userRepository.findOneBy({
        id: 1,
    });

    if (userToUpdate != null) {
        userToUpdate[property] = newValue;
        await userRepository.save(userToUpdate);
        console.log(`user.${property} has been saved`);
        console.log("Updated user: ", userToUpdate);
    }
}