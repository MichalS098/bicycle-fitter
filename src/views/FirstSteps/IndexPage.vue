<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <!-- first step -->
            <div v-if="currentStep == 0" class="ion-padding py-24 flex flex-col justify-between gap-6 h-full">
                <h1 class="text-right text-6xl">
                    let your <span class="text-primary">bike</span> <br>
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

            <div v-if="currentStep == 1" class="ion-padding py-16 flex flex-col gap-6 justify-between h-full">
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

            <div v-if="currentStep == 2" class="ion-padding py-16 flex flex-col gap-6 justify-between h-full">
                <div class="flex flex-col gap-6">
                    <h2 class="text-4xl font-semibold">
                        Your height and weight
                    </h2>
                    <ion-progress-bar class="progress-bar" :value="currentStep / numberOfSteps"
                                      color="secondary"></ion-progress-bar>
                    <p class="text-lg">
                        Input your height and weight
                    </p>
                    <div class="flex flex-col gap-3 pl-3 pr-12 mt-6">
                        <button-input :value="form.height" @update:modelValue="form.height = $event" type="number"
                                      placeholder="Enter your height" />
                        {{ form.height }} 
                        <!-- <button-input :value="form.weight" @update:modelValue="form.weight = $event" type="number"
                                      placeholder="Enter your weight" />
                        {{ form.weight }} -->
                        <!-- <button-input v-model="form.height" type="number"
                                      placeholder="Enter your weight" />
                        {{ form.height }} -->
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <ion-button @click="prevStep()" expand="block" fill="clear" size="large" color="light">
                        Back
                    </ion-button>
                    <ion-button @click="nextStep()" expand="block" fill="clear" size="large"
                                :color="form.height == ''? 'light' : 'secondary'">
                        Next 
                    </ion-button>
                </div>
            </div>

            <div v-if="currentStep == 3" class="ion-padding py-16 flex flex-col gap-6 justify-between h-full">
                <div class="flex flex-col gap-6">
                    <h2 class="text-4xl font-semibold">
                        Your gender
                    </h2>
                    <ion-progress-bar class="progress-bar" :value="currentStep / numberOfSteps"
                                      color="secondary"></ion-progress-bar>
                    <p class="text-lg">
                        Chose your gender
                    </p>
                    <div class="flex flex-col gap-3 pl-3 pr-12 mt-6">
                        <first-steps-radio-button @click="form.gender = 'male'" :checked="form.gender == 'male'"
                                                  label="Male" />
                        <first-steps-radio-button @click="form.gender = 'female'"
                                                  :checked="form.gender == 'female'" label="Female" />
                        <first-steps-radio-button @click="form.gender = 'other'"
                                                  :checked="form.gender == 'other'" label="Other" />
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <ion-button @click="prevStep()" expand="block" fill="clear" size="large" color="light">
                        Back
                    </ion-button>
                    <ion-button @click="nextStep()" expand="block" fill="clear" size="large"
                                :color="form.gender == '' ? 'light' : 'secondary'">
                        Next
                    </ion-button>
                </div>
            </div>

            <div v-if="currentStep == 4" class="ion-padding py-16 flex flex-col gap-6 justify-between h-full">
                <div class="flex flex-col gap-6">
                    <h2 class="text-4xl font-semibold">
                        Your weekly ride time
                    </h2>
                    <ion-progress-bar class="progress-bar" :value="currentStep / numberOfSteps"
                                      color="secondary"></ion-progress-bar>
                    <p class="text-lg">
                        Chose the ammount of time you roughly spend on the bike in a week
                    </p>
                    <div class="flex flex-col gap-3 pl-3 pr-12 mt-6">
                        <first-steps-radio-button @click="form.rideTime = 0" :checked="form.rideTime == 0"
                                                  label="Opt1" />
                        <first-steps-radio-button @click="form.rideTime = 1" :checked="form.rideTime == 1"
                                                  label="Opt2" />
                        <first-steps-radio-button @click="form.rideTime = 2" :checked="form.rideTime == 2"
                                                  label="Opt3" />
                        <first-steps-radio-button @click="form.rideTime = 3" :checked="form.rideTime == 3"
                                                  label="Opt4" />
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <ion-button @click="prevStep()" expand="block" fill="clear" size="large" color="light">
                        Back
                    </ion-button>
                    <ion-button @click="nextStep()" expand="block" fill="clear" size="large"
                                :color="form.gender == '' ? 'light' : 'secondary'">
                        Finish
                    </ion-button>
                </div>
            </div>

            
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { ref } from 'vue';
import FirstStepsRadioButton from '@/views/FirstSteps/FirstStepsRadioButton.vue';
import ButtonInput from '@/components/ButtonInput.vue';

//changed to 5 - some steps are a bit redundant
const numberOfSteps = 5; // 0 - 6
const currentStep = ref(0);

const form = ref({
    unitSystem: '',
    weight: '',
    height: '', 
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

</script>
<style scoped>
.progress-bar {
    height: 12px;
    border-radius: 100px;
    /* width: 80%;
    m */
}
</style>