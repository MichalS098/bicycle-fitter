<template>
    <ion-page>
        <ion-content class="ion-padding" :fullscreen="true">
            <div class="flex flex-col justify-between gap-6 xxs:gap-12">
                <div class="px-3 xxs:px-6 pt-3 xxs:pt-6">
                    <h1 class="fitter-h1">
                        My
                        <br>
                        Bikes
                    </h1>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 xxs:gap-6">
                    <bike-card v-for="bike in user?.bikes" :key="bike.id" :bike="bike" />
                    <new-bike-card />
                </div>
            </div>
            <space-for-tab-bar-menu /> 
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import {
    IonPage, IonContent, useIonRouter
} from '@ionic/vue';
import { User } from '@/entity/User';
import { onMounted, ref } from 'vue';
import BikeCard from '@/components/BikeCard.vue';
import NewBikeCard from '@/components/NewBikeCard.vue';
import SpaceForTabBarMenu from '@/components/SpaceForTabBarMenu.vue';

import { Bike } from '@/entity/Bike';
import AppDataSource from '@/data-sources/SqliteDataSource';
import { updateProperty } from '@/helpers/helpersDataBase';


const router = useIonRouter();
const user = ref<User | null>(null);

const bikeRepository = AppDataSource.getRepository(Bike);
const userRepository = AppDataSource.getRepository(User);

async function initializationDataBaseForBike() {

    /*const bikeToRemove = await bikeRepository.findOneBy({
                id: 1,
            })

    if(bikeToRemove != null) 
    {
        await bikeRepository.remove(bikeToRemove);
    }    */   
    
    let allBike = await bikeRepository.find();

    console.log("All Bike from the db: before save", allBike);


    const bike = new Bike();

    //user.unitSystem = form.value.unitSystem;
    await bikeRepository.save(bike);

    allBike = await bikeRepository.find();
    console.log("All Bike from the db: after save", allBike)

}

onMounted(async () => {
    /*user.value = await User.findOne({
        where: {
            id: 1
        },
        relations: {
            bikes: true
        }
    });*/

     //inicjalization data base
   /*  let allUser = await userRepository.find();


//await userRepository.remove(allUser);
console.log("All User from the db: before save", allUser);


const user1 = new User();

//user.unitSystem = form.value.unitSystem;
await userRepository.save(user1);

allUser = await userRepository.find();
console.log("All User from the db: after save", allUser)*/


    user.value = await User.findOne({
        where: {
            id: 1
        },
        relations: {
            bikes: true
        }
    });

   // initializationDataBaseForBike();
});
</script>
  