<template>
    <ion-modal :is-open="isOpen">
        <ion-content :fullscreen="true" class="">
            <div class="ion-padding xxs:py-6 flex flex-col justify-center gap-6 xs:gap-12 bg-secondary-shade h-full w-full">
                <h1 class="text-4xl xxs:text-5xl">
                    Thank you for <br>measuring yourself!
                </h1>
                <p class="text-lg">
                    Now you can go to the app and add some bikes!
                </p>                                
                <ion-button @click="closeModal()" expand="block" shape="round" mode="ios" type="button" color="sand-desert"
                    class="font-bold text-lg">
                    Go to the app!
                </ion-button>
            </div>
        </ion-content>
    </ion-modal>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { IonModal, IonButton, IonContent, IonList, IonItem, IonLabel } from '@ionic/vue';
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