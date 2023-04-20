<template>
    <ion-modal :is-open="isOpen">
        <ion-content>
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                    </ion-buttons>
                    <ion-title>Rider styles</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="closeModal()">Cancel</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-list>
                <ion-item>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>Casual</ion-card-title>
                            <ion-card-subtitle>Weekly rides: 1</ion-card-subtitle>
                        </ion-card-header>
                        <ion-card-content>
                            Leisurely rider, comfortable on bike paths.
                        </ion-card-content>
                    </ion-card>
                </ion-item>
                <ion-item>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>Recreational</ion-card-title>
                            <ion-card-subtitle>Weekly rides: 2</ion-card-subtitle>
                        </ion-card-header>
                        <ion-card-content>
                            Adventure rider, enjoys gran fondos or charity events.
                        </ion-card-content>
                    </ion-card>
                </ion-item>
                <ion-item>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>Avid</ion-card-title>
                            <ion-card-subtitle>Weekly rides: 3</ion-card-subtitle>
                        </ion-card-header>
                        <ion-card-content>
                            Casual athlete, participates in bike races or triathlons.
                        </ion-card-content>
                    </ion-card>
                </ion-item>
                <ion-item>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>Weekend Warrior</ion-card-title>
                            <ion-card-subtitle>Weekly rides: 4</ion-card-subtitle>
                        </ion-card-header>
                        <ion-card-content>
                            Competitive athlete, skilled on technical descents and climbs.
                        </ion-card-content>
                    </ion-card>
                </ion-item>
                <ion-item>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>Rider</ion-card-title>
                            <ion-card-subtitle>Weekly rides: 5+</ion-card-subtitle>
                        </ion-card-header>
                        <ion-card-content>
                            Highly competitive, excels in races and group rides.
                        </ion-card-content>
                    </ion-card>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-modal>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/vue';

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