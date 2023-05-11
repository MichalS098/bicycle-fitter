<template>
    <ion-modal :is-open="isOpen">
        <ion-content :fullscreen="true">
            <ion-header :translucent="true" class="sticky top-0">
                <ion-toolbar>
                    <ion-buttons slot="start">
                    </ion-buttons>
                    <ion-title>Your measurments!</ion-title>
                    <ion-buttons slot="end">
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-list>
                <ion-item>
                    <ion-label>
                        Shoulder Height: {{ bodyParams.shoulderHeight }}
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        Foot Length: {{ bodyParams.footLength }}
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        Arm Length: {{ bodyParams.armLength }}
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        Thigh Length: {{ bodyParams.thighLength }}
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        Shank Length: {{ bodyParams.shankLength }}
                    </ion-label>
                </ion-item>
            </ion-list>

            <ion-button @click="closeModal()" expand="block" shape="round" mode="ios" type="button" color="primary"
                class="font-bold text-lg">
                Go to the app!
            </ion-button>
        </ion-content>
    </ion-modal>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/vue';
import { BodyParamsFromMediapipe } from '@/functions/mediapipeCalculatedHumanParams';

const emits = defineEmits(['close']);

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
    bodyParams: {
        type: BodyParamsFromMediapipe,
        required: true,
    },
});

const closeModal = () => {
    emits('close');
}
</script>