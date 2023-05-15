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
                <steps-check-box v-model="form.expectations" :value="{ id: 'backOrNeckPain', value: true }"
                    label="Neck or back pain" color="primary" />
                <steps-check-box  v-model="form.expectations" :value="{ id: 'butPain', value: true }" label="Butt pain"
                     color="primary" />
                <steps-check-box v-model="form.expectations" :value="{ id: 'kneePain', value: true }" label="Knee pain"
                     color="primary" />
                <steps-check-box  v-model="form.expectations" :value="{ id: 'feetPain', value: true }" label="Feet pain"
                     color="primary" />
                <steps-check-box v-model="form.expectations" :value="{ id: 'clickPedals', value: 1 }" label="Click pedals"
                     color="primary" />
                <steps-check-box  v-model="form.expectations" :value="{ id: 'nothing', value: true }" label="Nothing"
                     color="primary" />
            </step-card>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent, useIonRouter } from '@ionic/vue';
import ButtonInput from '@/components/ButtonInput.vue';
import StepsRadioButton from '@/components/StepsRadioButton.vue';
import StepsCheckBox from '@/components/StepsCheckBox.vue';
import StepCard from '@/components/StepCard.vue';
import { Bike } from '@/entity/Bike';
import { getUserFromDatabase } from '@/helpers/helpersDataBase';

import { getBikefittingParams } from '@/functions/calculatedBikeFittingParams';

import { onMounted, watch } from 'vue';

import { bikeExpectations } from '@/classes/bikeExpectations';


const numberOfSteps = 4;
const currentStep = ref(1);
const router = useIonRouter();

const form = ref({
    bikeType: '',
    bikeCompany: '',
    bikeModel: '',
    bikeFittingGoal: '',
    /*expectations: {
        backOrNeckPain: false,
        butPain: false,
        kneePain: false,
        feetPain: false,
        clickPedals: 0,
        nothing: false
    },*/
    expectations: [
        { id: 'backOrNeckPain', value: false },
        { id: 'butPain', value: false },
        { id: 'kneePain', value: false },
        { id: 'feetPain', value: false },
        { id: 'clickPedals', value: 0 },
        { id: 'nothing', value: false },
    ],
    noBikeModel: false,
    suggestNewBike: false,
});

/*onMounted(() => {
    initializeFourStep();
});

watch(currentStep, (newStep) => {
    if (newStep === 4) {
        initializeFourStep();
    }
});*/

//const isChecked = (id: string) => form.value.expectations.some(item => item.id === id);

/*const updateExpectations = (newItem: { id: string; value: boolean | number }) => {
    const index = form.value.expectations.findIndex(item => item.id === newItem.id);
    if (index === -1) {
        form.value.expectations.push(newItem);
    } else {
        form.value.expectations[index].value = !form.value.expectations[index].value;
    }
};*/

/*function initializeFourStep() {
    const newExpectations = form.value.expectations.map(item => ({ ...item }));
    newExpectations.forEach((item) => {
        if (typeof item.value === 'boolean') {
            item.value = false;
        } else if (typeof item.value === 'number') {
            item.value = 0;
        }
    });
    form.value.expectations = newExpectations;
}*/


const nextStep = async () => {
    //initializeFourStep();
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

        const nothingItem = form.value.expectations.find((item: { id: string; value: boolean | number }) => item.id === 'nothing')
        if (nothingItem && nothingItem.value === false) {
            return;
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

    /*
    { id: 'backOrNeckPain', value: false },
        { id: 'butPain', value: false },
        { id: 'kneePain', value: false },
        { id: 'feetPain', value: false },
        { id: 'clickPedals', value: 0 },
        { id: 'nothing', value: false },
    */
    // Interview bike params
    const bike = new Bike();
    bike.brand = form.value.bikeCompany;
    bike.model = form.value.bikeModel;
    bike.type = form.value.bikeType;
    bike.style = form.value.bikeFittingGoal;
    const nothingItem = form.value.expectations.find((item: { id: string; value: boolean | number }) => item.id === 'nothing')

let nothingValue: boolean | undefined;

if (nothingItem !== undefined) {
  if (typeof nothingItem.value === 'boolean') {
    nothingValue = nothingItem.value;
    bike.expectationsNothing = nothingValue;
  } else {
    // nothingItem.value jest liczbą, zrób coś z tym
  }
} else {
  // nothingItem jest undefined, zrób coś z tym
}
    console.log("expectations", form.value.expectations)
    /*bike.expectationsBackOrNeckPain = form.value.expectations.backOrNeckPain;
    bike.expectationsButPain = form.value.expectations.butPain;
    bike.expectationsClickPedals = form.value.expectations.clickPedals;
    bike.expectationsFeetPain = form.value.expectations.feetPain;
    bike.expectationsKneePain = form.value.expectations.kneePain;*/

    
   
    /*bike.expectationsBackOrNeckPain = form.value.expectations.backOrNeckPain;
    bike.expectationsButPain = form.value.expectations.butPain;
    bike.expectationsClickPedals = form.value.expectations.clickPedals;
    bike.expectationsFeetPain = form.value.expectations.feetPain;
    bike.expectationsKneePain = form.value.expectations.kneePain;
    bike.expectationsNothing = form.value.expectations.nothing;*/
    bike.crankLength = 18;
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

    router.navigate('/bikes/' + bike.id, 'none', 'replace');
}
</script>