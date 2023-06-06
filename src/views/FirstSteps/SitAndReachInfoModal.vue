<template>
    <ion-modal :is-open="isOpen" @ionModalDidDismiss="closeModal()">
        <ion-content :fullscreen="true">
            <ion-header :translucent="true" class="sticky top-0">
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button @click="closeModal()" color="secondary" fill="clear">
                            <ion-icon slot="start" :icon="arrowBackOutline"></ion-icon>
                            Go back
                        </ion-button>
                    </ion-buttons>
                    <ion-title>Sit and reach test</ion-title>
                    <ion-buttons slot="end">
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        What is the Sit and Reach Test?
                    </ion-card-title>
                    <ion-card-subtitle>

                    </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    The Sit and Reach Test is a simple method used to measure the flexibility of your lower back and
                    hamstring muscles.
                    <img src="@/../resources/images/27460932_yoga_poses_5.png" alt="yoga"
                        class="w-full h-64 object-contain mb-6" />
                    <b>You have to check if you can touch the floor or measure the distance between your fingertips and the
                        floor.</b>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-modal>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon } from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';

const emits = defineEmits(['close']);

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    }
});

const closeModal = () => {
    emits('close');
}
</script>