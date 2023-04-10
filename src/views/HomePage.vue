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
                        Lista rowerów
                    </ion-title>
                </ion-toolbar>
            </ion-header>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    onIonViewDidEnter, onIonViewDidLeave, onIonViewWillEnter, onIonViewWillLeave
} from '@ionic/vue';

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
</script>
  