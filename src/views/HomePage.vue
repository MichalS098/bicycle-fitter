<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    Lista rowerów
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">
                        My bikes
                    </ion-title>
                </ion-toolbar>
            </ion-header>
            <div class="px-5 mt-10"  router-link="/new-bike-steps">
                <ion-button router-link="/new-bike-steps" expand="block" fill="clear" size="large" >
                    Add new bike
                </ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
    onIonViewDidEnter, onIonViewDidLeave, onIonViewWillEnter, onIonViewWillLeave
} from '@ionic/vue';
import { PlusIcon } from "@heroicons/vue/24/outline"
onIonViewDidEnter(() => {
    console.log('Page did enter');
});

onIonViewDidLeave(() => {
    console.log('Page did leave');
});

onIonViewWillEnter(() => {
    console.log('Page will enter');
});

onIonViewWillLeave(() => {
    console.log('Page will leave');
});
const goToNewBikeSteps = () => {
    console.log("goToNewBikeSteps")
}
</script>
  