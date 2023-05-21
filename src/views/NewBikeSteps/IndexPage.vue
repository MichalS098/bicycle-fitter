<template>
    <ion-page>
        <ion-content :fullscreen="true" :scroll-y="false">

            <step-card title="Your bike type" sub-title="What is your bike type?" :this-step="1" :current-step="currentStep"
                :number-of-steps="numberOfSteps" @prev="goBackHome()" @next="nextStep()" color="primary">
                <steps-radio-button @click="nextStep()" v-model="form.bikeType" label="city" value="city" color="primary" />
                <steps-radio-button @click="nextStep()" v-model="form.bikeType" label="road" value="road" color="primary" />
                <steps-radio-button @click="nextStep()" v-model="form.bikeType" label="gravel" value="gravel"
                    color="primary" />
                <steps-radio-button @click="nextStep()" v-model="form.bikeType" label="cross" value="cross"
                    color="primary" />
                <steps-radio-button @click="nextStep()" v-model="form.bikeType" label="electric" value="electric"
                    color="primary" />
                <steps-radio-button @click="nextStep()" v-model="form.bikeType" label="mtb" value="mtb" color="primary" />
            </step-card>

            <step-card title="Your bike model" sub-title="What is your bike model?" :this-step="2"
                :current-step="currentStep" :number-of-steps="numberOfSteps" @prev="prevStep()" @next="nextStep()"
                color="primary">
                <button-input type="text" color="primary" v-model="form.bikeCompany" placeholder="Your bike company" />
                <button-input type="text" color="primary" v-model="form.bikeModel" placeholder="Your bike model" />
                <steps-radio-button @click="nextStep()" v-model="form.noBikeModel" label="I don't know my bike model"
                    value="unknown" color="primary" />
            </step-card>

            <step-card title="Your goal" sub-title="How do you want to sit on your bike?" :this-step="3"
                :current-step="currentStep" :number-of-steps="numberOfSteps" @prev="prevStep()" @next="nextStep()"
                color="primary">
                <steps-radio-button @click="nextStep()" v-model="form.bikeFittingGoal" label="ergonomic" value="ergonomic"
                    color="primary" />
                <steps-radio-button @click="nextStep()" v-model="form.bikeFittingGoal" label="sportslike" value="sportslike"
                    color="primary" />
                <steps-radio-button @click="nextStep()" v-model="form.bikeFittingGoal" label="aerodynamic"
                    value="aerodynamic" color="primary" />
            </step-card>

            <step-card title="Your expectations" sub-title="What do you expect from bikefitting?" :this-step="4"
                :current-step="currentStep" :number-of-steps="numberOfSteps" @prev="prevStep()" @next="nextStep()"
                color="primary">
                <ion-list>
                    <ion-item>
                        <ion-select v-model="form.additionalSurvey" aria-label="Additional" expand="block" shape="round"
                            color="primary" mode="ios" fill="outline" interface="popover" placeholder="Select additional"
                            type="button" class="select-wizard-button">
                            <ion-select-option value="4" color="primary" class="combobox">foot to
                                ground</ion-select-option>
                            <ion-select-option value="3" color="primary" class="combobox">finger tips to
                                ground</ion-select-option>
                            <ion-select-option value="2" color="primary" class="combobox">more than 5 cm to
                                ground</ion-select-option>
                            <ion-select-option value="1" color="primary" class="combobox">more than 10 cm to
                                ground</ion-select-option>
                        </ion-select>
                    </ion-item>
                </ion-list>
                <steps-check-box v-model="form.expectations.backOrNeckPain" label="Back Or Neck Pain" color="primary" />
                <steps-check-box v-model="form.expectations.butPain" label="But Pain" color="primary" />
                <steps-check-box v-model="form.expectations.kneePain" label="Knee pain" color="primary" />
                <steps-check-box v-model="form.expectations.feetPain" label="Feet pain" color="primary" />
                <steps-check-box v-model="form.expectations.clickPedals" label="Click pedals" color="primary" />
                <steps-check-box v-model="form.expectations.nothing" label="Nothing" color="primary"
                    :disabled="anyExpectationSelected()" />
            </step-card>

            <step-card title="Your bike stem and crank length" sub-title="Please add bike params" :this-step="5"
                :current-step="currentStep" :number-of-steps="numberOfSteps" @prev="prevStep()" @next="nextStep()"
                color="primary">
                <button-input v-model="form.stemLength" type="number" inputmode="numeric"
                    placeholder="Enter your stem length" :postfix="form.userUnitSystem === 'metric' ? 'cm' : 'inch'" />
                <ion-alert :is-open="form.errors.stemLength != ''" header="Wrong stem length" :message="form.errors.stemLength"
                    :buttons="['OK']" @did-dismiss="form.errors.stemLength = ''">
                </ion-alert>
                <button-input v-model="form.crankLength" type="number" inputmode="numeric"
                    placeholder="Enter your crank length" :postfix="form.userUnitSystem === 'metric' ? 'cm' : 'inch'" />
                    <ion-alert :is-open="form.errors.crankLength != ''" header="Wrong crank length" :message="form.errors.crankLength"
                    :buttons="['OK']" @did-dismiss="form.errors.crankLength = ''">
                </ion-alert>
            </step-card>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonList, IonItem, IonSelect, IonSelectOption, IonAlert } from '@ionic/vue';
import { defineComponent } from 'vue';
import { IonPage, IonContent, useIonRouter } from '@ionic/vue';
import ButtonInput from '@/components/ButtonInput.vue';
import StepsRadioButton from '@/components/StepsRadioButton.vue';
import StepsCheckBox from '@/components/StepsCheckBox.vue';
import StepCard from '@/components/StepCard.vue';
import { Bike } from '@/entity/Bike';
import { User } from '@/entity/User';
import { getUserFromDatabase } from '@/helpers/helpersDataBase';

import { getBikefittingParams } from '@/functions/calculatedBikeFittingParams';

import { onMounted, watch } from "vue";

import { bikeExpectations } from '@/classes/bikeExpectations';



const numberOfSteps = 5;
const currentStep = ref(1);
const router = useIonRouter();

const form = ref({
    bikeType: '',
    bikeCompany: '',
    bikeModel: '',
    bikeFittingGoal: '',
    expectations: {
        backOrNeckPain: false,
        butPain: false,
        kneePain: false,
        feetPain: false,
        clickPedals: false,
        nothing: false
    },
    noBikeModel: false,
    suggestNewBike: false,
    stemLength: 0,
    crankLength: 0,
    additionalSurvey: 0,
    userUnitSystem: 'cm',
    errors: {
        crankLength: "",
        stemLength: ""
    }
});

onMounted(async () => {
    const user = await getUserFromDatabase();
    if (user == null) {
        return;
    }
    form.value.userUnitSystem = user.unitSystem;
});

const anyExpectationSelected = () => {
    return (
        form.value.expectations.backOrNeckPain ||
        form.value.expectations.butPain ||
        form.value.expectations.kneePain ||
        form.value.expectations.feetPain ||
        form.value.expectations.clickPedals
    );
}

const nextStep = async () => {

    if (currentStep.value == 1) {
        if (form.value.bikeType == '') {
            return;
        }
    } else if (currentStep.value == 2) {
        if (form.value.bikeCompany == '' && form.value.bikeModel == '') {
            if (form.value.suggestNewBike == false && form.value.noBikeModel == false) {
                return;
            }
        }
    } else if (currentStep.value == 3) {
        if (form.value.bikeFittingGoal == '') {
            return;
        }
    } else if (currentStep.value === 4) {
        if ((form.value.expectations.nothing == false) &&
            (form.value.expectations.backOrNeckPain == false) &&
            (form.value.expectations.butPain == false) &&
            (form.value.expectations.clickPedals == false) &&
            (form.value.expectations.feetPain == false) &&
            (form.value.expectations.kneePain == false)) {
            return;
        }

        if (form.value.additionalSurvey == 0) {
            form.value.additionalSurvey = 4;
        }

    }
    else if (currentStep.value === 5) {
        if (form.value.userUnitSystem == 'metric') {
            if (form.value.stemLength < 5 || form.value.stemLength > 14) {
                form.value.errors.stemLength = "Stem length must be between 5 and 14 cm";
                return;
            }
        }

        if (form.value.userUnitSystem == 'imperial') {
            if (form.value.stemLength <  1.97 || form.value.stemLength > 5.51 ) {
                form.value.errors.stemLength = "Stem length must be between 1.97 and 5.51  inches";
                return;
            }
        }

        if (form.value.userUnitSystem == 'metric') {
            if (form.value.crankLength < 16 || form.value.crankLength > 18.5) {
                form.value.errors.crankLength = "Crank length must be between 16 and 18.5 cm";
                return;
            }
        }

        if (form.value.userUnitSystem == 'imperial') {
            if (form.value.crankLength < 6.3 || form.value.crankLength > 7.28) {
                form.value.errors.crankLength = "Crank length must be between  6.3 and 7.28 inches";
                return;
            }
        }

        createBike();
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

const goBackHome = () => {
    router.navigate('/pages/home', 'none', 'replace');
}

const createBike = async () => {
    const user = await getUserFromDatabase();
    if (user == null) {
        return;
    }


    // Interview bike params
    const bike = new Bike();
    bike.brand = form.value.bikeCompany;
    bike.model = form.value.bikeModel;
    bike.type = form.value.bikeType;
    bike.style = form.value.bikeFittingGoal;
    bike.stemLength = form.value.stemLength;
    bike.crankLength = form.value.crankLength;

    bike.expectationsBackOrNeckPain = form.value.expectations.backOrNeckPain;
    bike.expectationsButPain = form.value.expectations.butPain;
    bike.expectationsClickPedals = form.value.expectations.clickPedals;
    bike.expectationsFeetPain = form.value.expectations.feetPain;
    bike.expectationsKneePain = form.value.expectations.kneePain;
    bike.expectationsNothing = form.value.expectations.nothing;
    bike.choiceFlexibilitySurvey = form.value.additionalSurvey;


    console.log("expectations", form.value.expectations)

    bike.user = user;

    // Calculated bike params
    const bikeFittingParams = await getBikefittingParams(bike, user);
    bike.seatHeight = bikeFittingParams.seatHeight;
    bike.seatSetback = bikeFittingParams.seatSetback;
    bike.seatLength = bikeFittingParams.seatLength;
    bike.seatDrop = bikeFittingParams.seatDrop;
    bike.stemLength = bikeFittingParams.stemLength;
    bike.stemAngle = bikeFittingParams.stemAngle;
    bike.crankLength = bikeFittingParams.crankLength;
    bike.stackMin = bikeFittingParams.stackMin;
    bike.reachMin = bikeFittingParams.reachMin;
    bike.stackMax = bikeFittingParams.stackMax;
    bike.reachMax = bikeFittingParams.reachMax;
    bike.stack2ReachIndex1 = bikeFittingParams.stack2ReachIndex1;
    bike.stack2ReachIndex2 = bikeFittingParams.stack2ReachIndex2;
    bike.stack2ReachIndex3 = bikeFittingParams.stack2ReachIndex3;
    bike.messageFromButPain = bikeFittingParams.messageFromButPain;
    bike.messageFromFeetPain = bikeFittingParams.messageFromFeetPain;
    bike.messageFromFlexibilitySurvey = bikeFittingParams.messageFromFlexibilitySurvey;
    bike.messageFromKneePain = bikeFittingParams.messageFromKneePain;
    bike.messageFromNeckOrBackPain = bikeFittingParams.messageFromNeckOrBackPain;
    await bike.save();

    console.log("bike from data base: ", bike)
    router.navigate('/bikes/' + bike.id, 'none', 'replace');
}
</script>

<style>
.select-wizard-button {
    --border-width: 2px;
    font-weight: 600;
    --padding-start: 15px;
    --padding-end: 15px;
    --padding-top: 10px;
    --padding-bottom: 10px;
    --background: transparent;
    --color: var(--ion-color-primary);
    --border-color: var(--ion-color-primary);
}
</style>