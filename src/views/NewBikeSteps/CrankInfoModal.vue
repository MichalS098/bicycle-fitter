<template>
    <ion-modal :is-open="isOpen" @ionModalDidDismiss="closeModal()">
        <ion-content :fullscreen="true">
            <ion-header :translucent="true" class="sticky top-0">
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button @click="closeModal()" color="primary" fill="clear">
                            <ion-icon slot="start" :icon="chevronBackOutline"></ion-icon>
                            Back
                        </ion-button>
                    </ion-buttons>
                    <ion-title>Bike dimentions</ion-title>
                    <ion-buttons slot="end">
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>

            <ion-list>
                <ion-item>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>What is Bike Stem and Crank Length?</ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            The Bike Stem and Crank Length are the most important dimentions of the bike.
                        </ion-card-content>
                    </ion-card>
                </ion-item>
                
                <ion-item>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>Bike Stem</ion-card-title>
                            <ion-card-subtitle>How to measure stem length?</ion-card-subtitle>
                        </ion-card-header>
                        <ion-card-content>
                            <img src="@/../resources/images/bike_stem.png" alt="stem" class="w-full h-64 object-contain mb-6" />
                            Stem’s length is often printed on stem element in bike, often with additional information such as the rise and handlebar clamp diameter.
                            The length of a stem isn’t its overall length, from the very front to the very back, but the distance from the central point on the steerer tube and the centre of the handlebar.
                            It’s fairly easy to measure with a ruler or tape measure. It’s usually a discrete number of tens of millimetres (so 80mm, 90mm, 100mm), although really short stems can be 35mm long.
                        </ion-card-content>
                    </ion-card>
                </ion-item>
                
                <ion-item>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>Crank Length</ion-card-title>
                            <ion-card-subtitle>How to measure crank length? </ion-card-subtitle>
                        </ion-card-header>
                        <ion-card-content>
                            <img src="@/../resources/images/crank_length.png" alt="crank" class="w-full h-64 object-contain mb-6" />
                            The length of the crank is usually engraved or printed at the backside of your cranks, just below the pedal axle.
                            Crank length is measured from the centre of the bottom bracket axle to the centre of the pedal axle.
                        </ion-card-content>
                    </ion-card>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-modal>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon } from '@ionic/vue';
import { chevronBackOutline } from 'ionicons/icons';

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