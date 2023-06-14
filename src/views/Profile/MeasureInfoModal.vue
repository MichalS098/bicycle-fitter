<template>
    <ion-modal :is-open="isOpen" @ionModalDidDismiss="closeModal()">
        <ion-content :fullscreen="true">
            <ion-header :translucent="true" class="sticky top-0">
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button @click="closeModal()" color="secondary" fill="clear">
                            <ion-icon slot="start" :icon="chevronBackOutline"></ion-icon>
                            Back
                        </ion-button>
                    </ion-buttons>
                    <ion-title>Measurements</ion-title>
                    <ion-buttons slot="end">
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>

            <ion-list>
                <ion-item>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>How to measure your body for bike fitting?</ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            In order to do bike fitting we need few measurements of your body.
                        </ion-card-content>
                    </ion-card>
                </ion-item>
                
                <ion-item>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>Body parameters</ion-card-title>
                            <ion-card-subtitle>How to measure?</ion-card-subtitle>
                        </ion-card-header>
                        <ion-card-content>
                            <img src="@/../resources/images/spooky_scary_sceleton.png" alt="skeleton" class="w-full h-fill object-contain mb-6" />

                        </ion-card-content>
                    </ion-card>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-modal>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonBackButton } from '@ionic/vue';
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