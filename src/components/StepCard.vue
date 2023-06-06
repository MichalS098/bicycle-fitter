<template>
    <div v-if="thisStep === currentStep"
        class="ion-padding pt-6 xxs:pt-12 xs:pt-16 pb-6 flex flex-col gap-2 xs:gap-6 justify-between h-full">
        <div class="flex flex-col gap-6 xs:gap-12">
            <div class="flex flex-col gap-3 xs:gap-6">
                <h2 class="text-3xl xs:text-4xl font-semibold">
                    {{ title }}
                </h2>
                <ion-progress-bar class="h-3 rounded-full" :value="thisStep / numberOfSteps"
                    :color="color"></ion-progress-bar>
                <p class="text-lg">
                    {{ subTitle }}
                </p>
            </div>
            <div class="flex flex-col gap-1 xxs:gap-2 xs:gap-3 pl-3 pr-12">
                <slot></slot>
                <error-message :message="errorMessage" />
            </div>
        </div>
        <div class="flex items-center justify-between">
            <ion-button @click="$emit('prev')" expand="block" fill="clear" size="large" color="light" mode="ios">
                Back
            </ion-button>
            <ion-button @click="$emit('next')" expand="block" fill="clear" size="large" color="light" mode="ios">
                Next
            </ion-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IonButton, IonProgressBar } from '@ionic/vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

const props = defineProps({
    thisStep: {
        type: Number,
        default: 0,
    },
    currentStep: {
        type: Number,
        default: 0,
    },
    numberOfSteps: {
        type: Number,
        default: 0,
    },
    title: {
        type: String,
        default: '',
    },
    subTitle: {
        type: String,
        default: '',
    },
    color: {
        type: String,
        default: 'secondary',
    },
    errorMessage: {
        type: String,
        default: '',
    },
});
</script>