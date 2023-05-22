<template>
    <ion-page>
        <ion-content class="ion-padding" :fullscreen="true">
            <div class="flex flex-col justify-between gap-6 xxs:gap-12">
                <div class="px-3 xxs:px-6 pt-3 xxs:pt-6">
                    <h1 class="fitter-h1">
                        Measurements
                    </h1>
                </div>
                <div class="w-full flex flex-col gap-6">
                    <h2 class="fitter-h2 px-2 xxs:px-3">
                        test
                    </h2>
                    
                </div>
            </div>
            <space-for-tab-bar-menu />
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import {
    IonPage, IonContent, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonIcon, useIonRouter
} from '@ionic/vue';
import SpaceForTabBarMenu from '@/components/SpaceForTabBarMenu.vue';
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline';
import { ChartBarIcon } from '@heroicons/vue/24/solid';
import {
    languageOutline, optionsOutline
} from 'ionicons/icons';

import { User } from '@/entity/User';
import { Bike } from '@/entity/Bike';
import { getUserFromDatabase, dropDatabase, getLastBikeOfUser } from '@/helpers/helpersDataBase';

const router = useIonRouter();

const deleteDataBaseAndReturnFirstSteps = async () => {

    const bikeTemp = await getLastBikeOfUser();


    if (bikeTemp != null) {
        await Bike.remove(bikeTemp);
    }
    else {
        console.log("Last Bike not found")
    }

    const userTemp = await getUserFromDatabase();

    console.log("userTemp before delete: ", userTemp)

    if (userTemp != null) {
        await User.remove(userTemp);
    }
    else {
        console.log("USer not found")
    }


    // await dropDatabase();


    router.replace('/first-steps');
}
</script>

<style scoped>
ion-content::part(background) {
    background-image: linear-gradient(to top right, var(--tw-gradient-stops));
    --tw-gradient-from: var(--ion-color-tertiary-shade) var(--tw-gradient-from-position);
    --tw-gradient-from-position: ;
    --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-from-position);
    --tw-gradient-to-position: ;
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
    --tw-gradient-to: var(--ion-color-tertiary) var(--tw-gradient-to-position);
    --tw-gradient-to-position:
}

ion-list {
    --ion-item-background: transparent;
}
</style>
