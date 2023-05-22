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
                    <measurements-card :user="user" />

                    <h2 class="fitter-h2 px-2 xxs:px-3">
                        Settings
                    </h2>

                    <ion-list lines="none" class="px-3">
                        <ion-item>
                            <ion-label>
                                <ion-icon :icon="optionsOutline"></ion-icon>
                                Units
                            </ion-label>
                            <ion-select interface="action-sheet">
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
                                <ion-select-option value="pl">Polski</ion-select-option>
                            </ion-select>
                        </ion-item>                        
                    </ion-list>

                    <h2 class="fitter-h2 px-2 xxs:px-3">
                        Account
                    </h2>
                    <ion-button id="delete-account-alert" mode="ios"
                        color="danger" size="default" expand="block" fill="outline">
                        <ion-icon slot="start" :icon="trashOutline"></ion-icon>
                        Delete your account
                    </ion-button>
                    <ion-alert trigger="delete-account-alert" header="Delete your account"
                        message="Are you sure you want to delete your account? This action cannot be undone."
                        :buttons="alertButtons"></ion-alert>
                </div>
            </div>
            <space-for-tab-bar-menu />
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonIcon, useIonRouter, IonButton, IonAlert } from '@ionic/vue';
import { languageOutline, optionsOutline, trashOutline } from 'ionicons/icons';
import SpaceForTabBarMenu from '@/components/SpaceForTabBarMenu.vue';
import MeasurementsCard from '@/components/MeasurementsCard.vue';
import { User } from '@/entity/User';
import { getUserFromDatabase, getLastBikeOfUser } from '@/helpers/helpersDataBase';
import { onMounted, ref } from 'vue';

const router = useIonRouter();

const user = ref<User>();
onMounted(async () => {
    user.value = await getUserFromDatabase();
});

const alertButtons = [
    {
        text: 'Cancel',
        role: 'cancel',
    },
    {
        text: 'Delete',
        role: 'destructive',
        handler: () => {
            deleteDataBaseAndReturnFirstSteps();
        },
    },
];

const deleteDataBaseAndReturnFirstSteps = async () => {
    const bikeTemp = await getLastBikeOfUser();
    const userTemp = await getUserFromDatabase();
    try {
        if (bikeTemp) {
            await bikeTemp.remove();
        }
        if (userTemp) {
            await userTemp.remove();
        }
        router.replace('/first-steps');
    } catch (error) {
        console.log(error);
    }
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
