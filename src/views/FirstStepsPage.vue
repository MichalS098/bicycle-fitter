<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <!-- first step -->
            <div v-if="current_step == 0" class="ion-padding py-24 flex flex-col justify-between gap-6 h-full">
                <h1 class="text-right text-6xl">
                    let your <span class="text-primary">bike</span>
                    fit <span class="text-primary">you</span>
                </h1>
                <div class="flex flex-col gap-6 px-3">
                    <h2 class="text-2xl font-semibold text-center">
                        Start with measuring yourself!
                    </h2>
                    <p class="text-lg text-center pb-12">
                        In order to bikefit you into your bike,
                        we need to know your measurements.
                        You can pass your photo,
                        or we can do it live!
                    </p>
                    <ion-button @click="nextStep()" expand="block" shape="round" color="primary" mode="ios" type="button"
                        class="font-bold text-lg">
                        Get started!
                    </ion-button>
                </div>
            </div>

            <div v-else-if="current_step == 1" class="ion-padding py-16 flex flex-col gap-6 justify-between h-full">
                <div class="flex flex-col gap-6">
                    <h2 class="text-4xl font-semibold">
                        Your unit system
                    </h2>
                    <ion-progress-bar class="progress-bar" :value="current_step / number_of_steps"
                        color="secondary"></ion-progress-bar>
                    <p class="text-lg">
                        Please select your unit system
                    </p>
                    <div class="flex flex-col gap-3 pl-3 pr-12 mt-6">
                        <ion-button @click="setUnitSystem('metric')" expand="block" shape="round"
                            :color="form.firstStep.unitSystem == 'metric' ? 'secondary' : 'medium'" mode="ios"
                            fill="outline" type="button" class="radio-wizard-button">
                            Metric
                        </ion-button>
                        <ion-button @click="setUnitSystem('imperial')" expand="block" shape="round"
                            :color="form.firstStep.unitSystem == 'imperial' ? 'secondary' : 'medium'" mode="ios"
                            fill="outline" type="button" class="radio-wizard-button">
                            Imperial
                        </ion-button>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <ion-button @click="prevStep()" expand="block" fill="clear" size="large" color="light">
                        Back
                    </ion-button>
                    <ion-button @click="nextStep()" expand="block" fill="clear" size="large" color="secondary">
                        Next
                    </ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { ref } from 'vue';

const number_of_steps = 7; // 0 - 6
const current_step = ref(0);
const form = ref({
    firstStep: {
        unitSystem: ''
    }
});

const setUnitSystem = (unitSystem: string) => {
    form.value.firstStep.unitSystem = unitSystem;
}

const nextStep = () => {
    if (current_step.value == 1) {
        if (form.value.firstStep.unitSystem == '') {
            return;
        }
    }

    if (current_step.value < number_of_steps) {
        current_step.value++;
    }
}

const prevStep = () => {
    if (current_step.value > 0) {
        current_step.value--;
    }
}

</script>
<style scoped>
.progress-bar {
    height: 12px;
    border-radius: 100px;
}

.radio-wizard-button {
    --border-width: 2px;
    font-weight: 600;
}
</style>