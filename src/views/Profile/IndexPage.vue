<template>
    <bikefitter-page title="Profile">
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
                    <ion-select interface="action-sheet" :value="user?.unitSystem"
                        @ionChange="unitSystemChanged($event.detail.value)">
                        <ion-select-option value="metric">Metric</ion-select-option>
                        <ion-select-option value="imperial">Imperial</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <ion-icon :icon="languageOutline"></ion-icon>
                        Language
                    </ion-label>
                    <ion-select interface="action-sheet" :value="user?.language"
                        @ionChange="languageChanged($event.detail.value)">
                        <ion-select-option value="en">English</ion-select-option>
                        <ion-select-option value="pl">Polski</ion-select-option>
                    </ion-select>
                </ion-item>
            </ion-list>

            <h2 class="fitter-h2 px-2 xxs:px-3">
                Account
            </h2>
            <ion-button id="delete-account-alert" mode="ios" color="danger" size="default" expand="block" fill="outline">
                <ion-icon slot="start" :icon="trashOutline"></ion-icon>
                Delete your account
            </ion-button>
            <ion-alert trigger="delete-account-alert" header="Delete your account"
                message="Are you sure you want to delete your account? This action cannot be undone."
                :buttons="alertButtons"></ion-alert>
        </div>
    </bikefitter-page>
</template>

<script setup lang="ts">
import {
    IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonIcon, useIonRouter, IonButton, IonAlert, onIonViewDidEnter,
} from '@ionic/vue';
import { languageOutline, optionsOutline, trashOutline } from 'ionicons/icons';
import BikefitterPage from '@/components/BikefitterPage.vue';
import MeasurementsCard from '@/components/MeasurementsCard.vue';
import { User } from '@/entity/User';
import { getUserFromDatabase, getLastBikeOfUser } from '@/helpers/helpersDataBase';
import { onMounted, ref } from 'vue';

const router = useIonRouter();

const user = ref<User>();
onMounted(async () => {
    user.value = await getUserFromDatabase();
});

onIonViewDidEnter(async () => {
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

const unitSystemChanged = async (value: string) => {
    if (user.value) {
        user.value.unitSystem = value;
        await user.value.save();
    } else {
        console.error('User not found');
    }
}

const languageChanged = async (value: string) => {
    if (user.value) {
        user.value.language = value;
        await user.value.save();
    } else {
        console.error('User not found');
    }
}
</script>

<style scoped>
ion-list {
    --ion-item-background: transparent;
}
</style>
