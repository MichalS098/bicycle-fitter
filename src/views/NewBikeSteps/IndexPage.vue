<template>
    <ion-page>
        <ion-content :fullscreen="true">

            <div v-if="currentStep == 1" class="ion-padding pt-16 pb-6 flex flex-col gap-6 justify-between h-full">
                <div class="flex flex-col gap-6">
                    <h2 class="text-4xl font-semibold">
                        Your bike type
                    </h2>
                    <ion-progress-bar class="h-3 rounded-full" :value="currentStep / numberOfSteps"
                        color="primary"></ion-progress-bar>
                    <p class="text-lg">
                        What is your bike type?
                    </p>
                    <div class="flex flex-col gap-3 pl-3 pr-12 mt-6">
                        <new-bike-steps-radio-button @click="form.bikeType = 'city'" :checked="form.bikeType == 'city'"
                            label="City" />
                        <new-bike-steps-radio-button @click="form.bikeType = 'road'" :checked="form.bikeType == 'road'"
                            label="Road" />
                        <new-bike-steps-radio-button @click="form.bikeType = 'gravel'" :checked="form.bikeType == 'gravel'"
                            label="Gravel" />
                        <new-bike-steps-radio-button @click="form.bikeType = 'cross'" :checked="form.bikeType == 'cross'"
                            label="Cross" />
                        <new-bike-steps-radio-button @click="form.bikeType = 'electric'" :checked="form.bikeType == 'electric'"
                            label="Electric" />
                        <new-bike-steps-radio-button @click="form.bikeType = 'mtb'" :checked="form.bikeType == 'mtb'"
                            label="MTB" />
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <ion-button @click="prevStep()" expand="block" fill="clear" size="large" color="light">
                        Back
                    </ion-button>
                    <ion-button @click="nextStep()" expand="block" fill="clear" size="large"
                        :color="form.bikeType == '' ? 'light' : 'primary'">
                        Next
                    </ion-button>
                </div>
            </div>

            <div v-if="currentStep == 2" class="ion-padding pt-16 pb-6 flex flex-col gap-6 justify-between h-full">
                <div class="flex flex-col gap-6">
                    <h2 class="text-4xl font-semibold">
                        Your bike model
                    </h2>
                    <ion-progress-bar class="h-3 rounded-full" :value="currentStep / numberOfSteps"
                        color="primary"></ion-progress-bar>
                    <p class="text-lg">
                        What is your bike model?
                    </p>
                    <div class="flex flex-col gap-3 pl-3 pr-12 mt-6">
                        <button-input color="primary" v-model="form.bikeCompany" placeholder="Your bike company" />
                        <button-input color="primary" v-model="form.bikeCompany" placeholder="Your bike model" />
                        <new-bike-steps-radio-button @click="noBikeModel()" :checked="form.noBikeModel == true"
                            label="I don't know my bike model" />
                        <new-bike-steps-radio-button @click="suggestNewBike()" :checked="form.suggestNewBike == true"
                            label="Suggest new bike" />
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <ion-button @click="prevStep()" expand="block" fill="clear" size="large" color="light">
                        Back
                    </ion-button>
                    <ion-button @click="nextStep()" expand="block" fill="clear" size="large"
                        :color="(form.noBikeModel == false) && (form.suggestNewBike == false) ? 'light' : 'primary'">
                        Next
                    </ion-button>
                </div>
            </div>

            <div v-if="currentStep == 3" class="ion-padding pt-16 pb-6 flex flex-col gap-6 justify-between h-full">
                <div class="flex flex-col gap-6">
                    <h2 class="text-4xl font-semibold">
                        Your goal
                    </h2>
                    <ion-progress-bar class="h-3 rounded-full" :value="currentStep / numberOfSteps"
                        color="primary"></ion-progress-bar>
                    <p class="text-lg">
                        How do you want to sit on your bike?
                    </p>
                    <div class="flex flex-col gap-3 pl-3 pr-12 mt-6">
                        <new-bike-steps-radio-button @click="form.bikeFittingGoal = 'ergonomic'" :checked="form.bikeFittingGoal == 'ergonomic'"
                            label="Ergonomic" />
                        <new-bike-steps-radio-button @click="form.bikeFittingGoal = 'sportslike'" :checked="form.bikeFittingGoal == 'sportslike'"
                            label="Sportslike" />
                        <new-bike-steps-radio-button @click="form.bikeFittingGoal = 'aerodynamic'" :checked="form.bikeFittingGoal == 'aerodynamic'"
                            label="Aerodynamic" />
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <ion-button @click="prevStep()" expand="block" fill="clear" size="large" color="light">
                        Back
                    </ion-button>
                    <ion-button @click="nextStep()" expand="block" fill="clear" size="large"
                        :color="form.bikeFittingGoal == '' ? 'light' : 'primary'">
                        Next
                    </ion-button>
                </div>
            </div>

            <div v-if="currentStep == 4" class="ion-padding pt-16 pb-6 flex flex-col gap-6 justify-between h-full">
                <div class="flex flex-col gap-6">
                    <h2 class="text-4xl font-semibold">
                        Your expectations
                    </h2>
                    <ion-progress-bar class="h-3 rounded-full" :value="currentStep / numberOfSteps"
                        color="primary"></ion-progress-bar>
                    <p class="text-lg">
                        What do you expect from bikefitting?
                    </p>
                    <div class="flex flex-col gap-3 pl-3 pr-12 mt-6">
                        <new-bike-steps-radio-button @click="form.expectations = 'backpain'" :checked="form.expectations == 'backpain'"
                            label="I want to get rod of back pain" />
                        <new-bike-steps-radio-button @click="form.expectations = 'buttpain'" :checked="form.expectations == 'buttpain'"
                            label="I want to get rod of butt pain" />
                        <new-bike-steps-radio-button @click="form.expectations = 'kneepain'" :checked="form.expectations == 'kneepain'"
                            label="I want to get rod of knee pain" />
                        <new-bike-steps-radio-button @click="form.expectations = 'feetpain'" :checked="form.expectations == 'feetpain'"
                            label="I want to get rod of feet pain" />
                        <new-bike-steps-radio-button @click="form.expectations = 'clickpedals'" :checked="form.expectations == 'clickpedals'"
                            label="I want to switch to click pedals" />
                        <new-bike-steps-radio-button @click="form.expectations = 'nothing'" :checked="form.expectations == 'nothing'"
                            label="I'm well fitted" />
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <ion-button @click="prevStep()" expand="block" fill="clear" size="large" color="light">
                        Back
                    </ion-button>

                    <!-- Na razie przekierowanie do home, ale jak dodamy bike view to router będzie tam -->
                    <ion-button router-link="/pages/home" expand="block" fill="clear" size="large"
                        :color="form.expectations == '' ? 'light' : 'primary'">
                        Next
                    </ion-button>
                </div>
            </div>


        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import {
    IonPage, IonContent, IonButton, IonProgressBar
} from '@ionic/vue';
import NewBikeStepsRadioButton from '@/views/NewBikeSteps/NewBikeStepsRadioButton.vue';
import ButtonInput from '@/components/ButtonInput.vue';

const numberOfSteps = 4.5; // looks better with 4.5 than with 4
const currentStep = ref(1);

const form = ref({
    bikeType: '',
    bikeCompany: '',
    bikeModel: '',
    noBikeModel: false,
    suggestNewBike: false,
    bikeFittingGoal: '',
    expectations: '',
});

const nextStep = () => {
    if (currentStep.value == 1) {
        if (form.value.bikeType == '') {
            return;
        }
    } else if (currentStep.value == 2) {

        // if bike company and model are not selected, then user can choose to suggest new bike or to not select bike model
        if (form.value.bikeCompany == '' && form.value.bikeModel == '') {
            if (form.value.suggestNewBike == false && form.value.noBikeModel == false) {
                return;
            }
        }
    } else if (currentStep.value == 3) {
        if (form.value.bikeFittingGoal == '') {
            return;
        }
    } else if (currentStep.value == 4) {
        if (form.value.expectations == '') {
            return;
        }
    }
    if (currentStep.value < numberOfSteps) {
        currentStep.value++;
    }
}

const noBikeModel = () => {
    if (form.value.noBikeModel == true) {
        form.value.noBikeModel = false;
    } else {
        if (form.value.bikeCompany == '' && form.value.bikeModel == '') {
            form.value.noBikeModel = true;
        }
    }
}

const suggestNewBike = () => {
    if (form.value.suggestNewBike == true) {
        form.value.suggestNewBike = false;
    } else {
        form.value.suggestNewBike = true;
    }
}

const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
    }
}
</script>