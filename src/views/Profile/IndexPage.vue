<template>
    <ion-page>
        <ion-content class="ion-padding" :fullscreen="true">
            <div class="flex flex-col justify-between gap-6 xxs:gap-12">
                <div class="px-3 xxs:px-6 pt-3 xxs:pt-6">
                    <h1 class="fitter-h1">
                        Profile
                    </h1>
                </div>
                <div class="w-full flex flex-col gap-6">
                    <h2 class="fitter-h2 px-2 xxs:px-3">
                        Statistics
                    </h2>
                    <div
                        class="rounded-3xl bg-gradient-to-br from-secondary-shade to-secondary-tint w-full flex items-center px-6 py-4 h-full">
                        <div class="grid grid-cols-2 w-full gap-1">
                            <h3 class="text-lg xxs:text-xl col-span-2 pb-3">
                                My measurements
                            </h3>
                            <span class="text-white font-bold text-2xl xxs:text-3xl">192cm</span>
                            <span class="text-white font-bold text-2xl xxs:text-3xl">75cm</span>
                            <span class="text-white text-sm">height</span>
                            <span class="text-white text-sm">leg</span>
                        </div>
                        <div class="h-full flex flex-col justify-between gap-4 items-end">
                            <EllipsisHorizontalIcon class="h-6 w-6 text-white" />
                            <ChartBarIcon class="h-16 w-16 text-white" />
                        </div>
                    </div>
                    <h2 class="fitter-h2 px-2 xxs:px-3">
                        Settings
                    </h2>
                    <ion-list lines="none" class="px-3">
                        <ion-item>
                            <ion-label>
                                <ion-icon :icon="optionsOutline"></ion-icon>
                                Units
                            </ion-label>
                            <ion-select value="m" interface="action-sheet">
                                <ion-select-option value="m">Metric</ion-select-option>
                                <ion-select-option value="i">Imperial</ion-select-option>
                            </ion-select>
                        </ion-item>
                        <ion-item>
                            <ion-label>
                                <ion-icon :icon="languageOutline"></ion-icon>
                                Language
                            </ion-label>
                            <ion-select value="en" interface="action-sheet">
                                <ion-select-option value="en">English</ion-select-option>
                                <ion-select-option value="de">Deutsch</ion-select-option>
                                <ion-select-option value="pl">Polski</ion-select-option>
                            </ion-select>
                        </ion-item>
                    </ion-list>
                    <ion-button @click="deleteDataBaseAndReturnFirstSteps()" expand="block" shape="round" mode="ios"
                        type="button" color="sand-desert" class="font-bold text-lg">
                        Delete account
                    </ion-button>
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


    //await dropDatabase();



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
