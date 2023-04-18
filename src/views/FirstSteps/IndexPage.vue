<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div v-if="currentStep == 0" class="ion-padding py-24 flex flex-col justify-between gap-6 h-full">
                <h1 class="text-right text-6xl">
                    let your <span class="text-primary font-semibold">bike</span> <br>
                    fit <span class="text-primary font-semibold">you</span>
                </h1>
                <div class="flex flex-col gap-6 px-3">
                    <h2 class="text-2xl font-semibold text-left">
                        Tell us about yourself!
                    </h2>                    
                    <p class="text-lg text-left pb-12">
                        As with real bike fitting, we will start
                        with a short survey about you, your
                        riding style and your expectations
                    </p>
                    <ion-button @click="nextStep()" expand="block" shape="round" color="primary" mode="ios" type="button"
                                class="font-bold text-lg">
                        Get started!
                    </ion-button>
                </div>
            </div>

            <div v-if="currentStep == 1" class="ion-padding pt-16 pb-6 flex flex-col gap-6 justify-between h-full">
                <div class="flex flex-col gap-6">
                    <h2 class="text-4xl font-semibold">
                        Your unit system
                    </h2>
                    <ion-progress-bar class="progress-bar" :value="currentStep / numberOfSteps"
                                      color="secondary"></ion-progress-bar>
                    <p class="text-lg">
                        What unit system do you prefer?
                    </p>
                    <div class="flex flex-col gap-3 pl-3 pr-12 mt-6">
                        <first-steps-radio-button @click="form.unitSystem = 'metric'" :checked="form.unitSystem == 'metric'"
                                                  label="Metric" />
                        <first-steps-radio-button @click="form.unitSystem = 'imperial'"
                                                  :checked="form.unitSystem == 'imperial'" label="Imperial" />
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <ion-button @click="prevStep()" expand="block" fill="clear" size="large" color="light">
                        Back
                    </ion-button>
                    <ion-button @click="nextStep()" expand="block" fill="clear" size="large"
                                :color="form.unitSystem == '' ? 'light' : 'secondary'">
                        Next
                    </ion-button>
                </div>
            </div>

            <div v-if="currentStep == 2" class="ion-padding pt-16 pb-6 flex flex-col gap-6 justify-between h-full">
                <div class="flex flex-col gap-6">
                    <h2 class="text-4xl font-semibold">
                        Your height and weight
                    </h2>
                    <ion-progress-bar class="progress-bar" :value="currentStep / numberOfSteps"
                                      color="secondary"></ion-progress-bar>
                    <p class="text-lg">
                        What is your height?
                    </p>
                    <div class="flex flex-col gap-3 pl-3 pr-12 mt-6">
                        <button-input v-model="form.height" type="number" placeholder="Enter your height" />
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <ion-button @click="prevStep()" expand="block" fill="clear" size="large" color="light">
                        Back
                    </ion-button>
                    <ion-button @click="nextStep()" expand="block" fill="clear" size="large"
                        :color="form.height == 0 ? 'light' : 'secondary'">
                        Next
                    </ion-button>
                </div>
            </div>

            <div v-if="currentStep == 3" class="ion-padding pt-16 pb-6 flex flex-col gap-6 justify-between h-full">
                <div class="flex flex-col gap-6">
                    <h2 class="text-4xl font-semibold">
                        Your ride time
                    </h2>
                    <ion-progress-bar class="progress-bar" :value="currentStep / numberOfSteps"
                        color="secondary"></ion-progress-bar>
                    <p class="text-lg">
                        Typically how much time per week do you spend on the bike?
                    </p>
                    <div class="flex flex-col gap-3 pl-3 pr-12 mt-6">
                        <first-steps-radio-button @click="form.rideTime = 1" :checked="form.rideTime == 1"
                            label="1 Hour or less" />
                        <first-steps-radio-button @click="form.rideTime = 2" :checked="form.rideTime == 2"
                            label="1 - 3 Hours" />
                        <first-steps-radio-button @click="form.rideTime = 3" :checked="form.rideTime == 3"
                            label="3 - 6 Hours" />
                        <first-steps-radio-button @click="form.rideTime = 4" :checked="form.rideTime == 4"
                            label="6 Hours or more" />
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <ion-button @click="prevStep()" expand="block" fill="clear" size="large" color="light">
                        Back
                    </ion-button>
                    <ion-button @click="nextStep()" expand="block" fill="clear" size="large"
                        :color="form.rideTime == 0 ? 'light' : 'secondary'">
                        Next
                    </ion-button>
                </div>
            </div>

            <div v-if="currentStep == 4" class="ion-padding pt-16 pb-6 flex flex-col gap-6 justify-between h-full">
                <div class="flex flex-col gap-6">
                    <h2 class="text-4xl font-semibold">
                        Your rider style
                    </h2>
                    <ion-progress-bar class="progress-bar" :value="currentStep / numberOfSteps"
                        color="secondary"></ion-progress-bar>
                    <p class="text-lg">
                        What type of cyclist would you describe yourself as?
                    </p>
                    <div class="flex flex-col gap-3 pl-3 pr-12 mt-6">
                        <first-steps-radio-button @click="form.rideStyle = 'casual'" :checked="form.rideStyle == 'casual'"
                            label="Casual" />
                        <first-steps-radio-button @click="form.rideStyle = 'recreational'"
                            :checked="form.rideStyle == 'recreational'" label="Recreational" />
                        <first-steps-radio-button @click="form.rideStyle = 'avid'" :checked="form.rideStyle == 'avid'"
                            label="Avid" />
                        <first-steps-radio-button @click="form.rideStyle = 'weekendwarrior'"
                            :checked="form.rideStyle == 'weekendwarrior'" label="Weekend Warrior" />
                        <first-steps-radio-button @click="form.rideStyle = 'racer'" :checked="form.rideStyle == 'racer'"
                            label="Racer" />
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <ion-button @click="prevStep()" expand="block" fill="clear" size="large" color="light">
                        Back
                    </ion-button>
                    <ion-button @click="nextStep()" expand="block" fill="clear" size="large"
                        :color="form.rideStyle == '' ? 'light' : 'secondary'">
                        Next
                    </ion-button>
                </div>
            </div>

            <div v-if="currentStep == 5" class="ion-padding py-24 flex flex-col justify-between gap-6 h-full">
                <h1 class="text-left text-6xl">
                    Bike fitting
                </h1>
                <div class="flex flex-col gap-6 px-3">
                    <h2 class="text-2xl font-semibold text-left">
                        Start with measuring yourself!
                    </h2>
                    <p class="text-lg text-left pb-12">
                        In order to bikefit you into your bike, we need to know your measurements.
                        You can pass your photo, or we can do it live with your phone camera!
                    </p>
                    <ion-button router-link="/measure" expand="block" shape="round" color="secondary" mode="ios"
                        type="button" class="font-bold text-lg">
                        Measure me!
                    </ion-button>
                </div>
            </div>

        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonProgressBar } from '@ionic/vue';
import { ref } from 'vue';
import { useIonRouter } from '@ionic/vue';
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import FirstStepsRadioButton from '@/views/FirstSteps/FirstStepsRadioButton.vue';
import ButtonInput from '@/components/ButtonInput.vue';

const numberOfSteps = 5; // 0 - 6
const currentStep = ref(0);

const form = ref({
    unitSystem: '',
    weight: '',
    height: null,
    gender: '',
    rideTime: 0,
    rideStyle: '',
});

const setUnitSystem = (unitSystem: string) => {
    form.value.unitSystem = unitSystem;
}

const nextStep = () => {
    if (currentStep.value == 1) {
        if (form.value.unitSystem == '') {
            return;
        }
    } else if (currentStep.value == 2) {
        if (form.value.height == 0) {
            return;
        }
    } else if (currentStep.value == 3) {
        if (form.value.rideTime == 0) {
            return;
        }
    } else if (currentStep.value == 4) {
        if (form.value.rideStyle == '') {
            return;
        }
    }

    if (currentStep.value < numberOfSteps) {
        currentStep.value++;
    }
}

const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
    }
}

const test = ref("rhianan");

</script>
<style scoped>
.progress-bar {
    height: 12px;
    border-radius: 100px;
}
</style>