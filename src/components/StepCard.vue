<template>
    <transition :name="animation">
        <div v-if="thisStep === currentStep"
            class="bg-black ion-padding pt-12 xs:pt-16 pb-6 flex flex-col gap-2 xs:gap-6 justify-between h-full overflow-y-auto">
            <div class="flex flex-col gap-8 xs:gap-12">
                <div class="flex flex-col gap-6">
                    <h2 class="text-3xl xs:text-4xl font-semibold">
                        {{ title }}
                    </h2>
                    <ion-progress-bar class="h-3 rounded-full" :value="currentStep / numberOfSteps"
                        :color="color"></ion-progress-bar>
                    <p class="text-lg">
                        {{ subTitle }}
                    </p>
                </div>
                <div class="flex flex-col gap-3 pl-3 pr-12">
                    <slot></slot>
                    <error-message :message="errorMessage" />
                </div>
            </div>
            <div class="flex items-center justify-between">
                <ion-button @click="goBack()" expand="block" fill="clear" size="large" color="light" mode="ios">
                    Back
                </ion-button>
                <ion-button @click="goNext()" expand="block" fill="clear" size="large" color="light" mode="ios">
                    Next
                </ion-button>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { IonButton, IonProgressBar } from '@ionic/vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import { computed } from 'vue';

const emits = defineEmits(['next', 'prev']);

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

const animation = computed(() => {
    if (props.thisStep > props.currentStep) {
        return 'slide-fade-left';
    } else if (props.thisStep < props.currentStep) {
        return 'slide-fade-right';
    } else {
        return '';
    }
});

function goNext() {
    emits('next');
}

function goBack() {
    emits('prev');
}
</script>

<style scoped>
.slide-fade-right-enter-active,
.slide-fade-right-leave-active,
.slide-fade-left-enter-active,
.slide-fade-left-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-right-enter,
.slide-fade-left-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

.slide-fade-right-leave-to,
.slide-fade-left-enter {
    transform: translateX(-100%);
    opacity: 0;
}
</style>