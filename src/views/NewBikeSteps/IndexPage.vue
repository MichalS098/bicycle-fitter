<template>
    <ion-page>
        <ion-content :fullscreen="true" :scroll-y="false">

            <step-card title="Your bike type" sub-title="What is your bike type?" :this-step="1" :current-step="currentStep"
                :number-of-steps="numberOfSteps" @prev="goBackHome()" @next="nextStep()" color="primary">
                <steps-radio-button @click="nextStep()" v-model="form.bikeType" label="City" value="city" color="primary" />
                <steps-radio-button @click="nextStep()" v-model="form.bikeType" label="Road" value="road" color="primary" />
                <steps-radio-button @click="nextStep()" v-model="form.bikeType" label="Gravel" value="gravel"
                    color="primary" />
                <steps-radio-button @click="nextStep()" v-model="form.bikeType" label="Cross" value="cross"
                    color="primary" />
                <steps-radio-button @click="nextStep()" v-model="form.bikeType" label="Electric" value="electric"
                    color="primary" />
                <steps-radio-button @click="nextStep()" v-model="form.bikeType" label="Mtb" value="mtb" color="primary" />
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
                <steps-radio-button @click="nextStep()" v-model="form.bikeFittingGoal" label="Ergonomic" value="ergonomic"
                    color="primary" />
                <steps-radio-button @click="nextStep()" v-model="form.bikeFittingGoal" label="Sportslike" value="sportslike"
                    color="primary" />
                <steps-radio-button @click="nextStep()" v-model="form.bikeFittingGoal" label="Aerodynamic"
                    value="aerodynamic" color="primary" />
            </step-card>

            <step-card title="Your expectations" sub-title="What do you expect from bikefitting?" :this-step="4"
                :current-step="currentStep" :number-of-steps="numberOfSteps" @prev="prevStep()" @next="nextStep()"
                color="primary">
                <steps-check-box v-model="form.expectations.backOrNeckPain" label="Back Or Neck Pain" color="primary" :disabled="nothingSelected()" />
                <steps-check-box v-model="form.expectations.butPain" label="Butt Pain" color="primary" :disabled="nothingSelected()" />
                <steps-check-box v-model="form.expectations.kneePain" label="Knee pain" color="primary" :disabled="nothingSelected()" />
                <steps-check-box v-model="form.expectations.feetPain" label="Feet pain" color="primary" :disabled="nothingSelected()" />
                <steps-check-box v-model="form.expectations.clickPedals" label="Click pedals" color="primary" :disabled="nothingSelected()"  />
                <steps-check-box v-model="form.expectations.nothing" label="Nothing" color="primary" 
                    :disabled="anyExpectationSelected()" />
            </step-card>

            <step-card title="Bike stem and crank length" sub-title="Insert your bike stem and crank length. If you dont know these values click info button." :this-step="5" :current-step="currentStep" :number-of-steps="numberOfSteps" @prev="prevStep()" @next="nextStep()" color="primary">

                <div class="flex w-full flex-col">
                    <div class="flex justify-end text-sm text-neutral-500 mb-1 mr-2">
                        From 5 to 14 cm
                    </div>
                    <button-input v-model="form.stemLength" type="number" inputmode="numeric" placeholder="Enter your stem length" :postfix="form.userUnitSystem === 'metric' ? 'cm' : 'inch'" />                    
                    <ion-alert :is-open="form.errors.stemLength != ''" header="Wrong stem length" :message="form.errors.stemLength" :buttons="['OK']" @did-dismiss="form.errors.stemLength = ''"></ion-alert>
                </div>

                <div class="flex w-full flex-col">                    
                    <div class="flex justify-end text-sm text-neutral-500 mb-1 mr-2 mt-2">
                        From 16 to 18.5 cm
                    </div>
                    <button-input v-model="form.crankLength" type="number" inputmode="numeric" placeholder="Enter your crank length" :postfix="form.userUnitSystem === 'metric' ? 'cm' : 'inch'" />
                    <ion-alert :is-open="form.errors.crankLength != ''" header="Wrong crank length" :message="form.errors.crankLength" :buttons="['OK']" @did-dismiss="form.errors.crankLength = ''"></ion-alert>
                </div>
                <InformationCircleIcon class="mx-3 h-8 w-8 text-primary" @click="isCrankInfoModal = true" />
            </step-card>
            <crank-info-modal :is-open="isCrankInfoModal" @close="isCrankInfoModal = false" />
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonAlert } from '@ionic/vue';
import { IonPage, IonContent, useIonRouter } from '@ionic/vue';
import { InformationCircleIcon } from "@heroicons/vue/24/outline"
import ButtonInput from '@/components/ButtonInput.vue';
import StepsRadioButton from '@/components/StepsRadioButton.vue';
import StepsCheckBox from '@/components/StepsCheckBox.vue';
import StepCard from '@/components/StepCard.vue';
import { Bike } from '@/entity/Bike';
import { getUserFromDatabase } from '@/helpers/helpersDataBase';
import { getBikefittingParams } from '@/functions/calculatedBikeFittingParams';
import { onMounted } from "vue";
import CrankInfoModal from '@/views/NewBikeSteps/CrankInfoModal.vue';

const isCrankInfoModal = ref(false);
const numberOfSteps = 6;
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
    stemLength: null,
    crankLength: null,
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

const nothingSelected = () => {
    return (
        form.value.expectations.nothing
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

    } 
    else if (currentStep.value === 5) {
        if (form.value.userUnitSystem == 'metric') {
            if (form.value.stemLength == null || form.value.stemLength < 5 || form.value.stemLength > 14) {
                form.value.errors.stemLength = "Stem length must be between 5 and 14 cm";
                return;
            }
        }


        if (form.value.userUnitSystem == 'imperial') {
            if (form.value.stemLength == null ||form.value.stemLength <  1.97 || form.value.stemLength > 5.51 ) {
                form.value.errors.stemLength = "Stem length must be between 1.97 and 5.51  inches";
                return;
            }
        }

        if (form.value.userUnitSystem == 'metric') {
            if (form.value.crankLength == null || form.value.crankLength < 16 || form.value.crankLength > 18.5) {
                form.value.errors.crankLength = "Crank length must be between 16 and 18.5 cm";
                return;
            }
        }

        if (form.value.userUnitSystem == 'imperial') {
            if (form.value.crankLength == null || form.value.crankLength < 6.3 || form.value.crankLength > 7.28) {
                form.value.errors.crankLength = "Crank length must be between  6.3 and 7.28 inches";
                return;
            }
        }

        createBike();
    }
    if (currentStep.value < numberOfSteps) {
        setTimeout(() => {
            currentStep.value++;
        }, 200);
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
    if(form.value.bikeCompany == '')
    {
        bike.brand = form.value.bikeType + " bike";
    }
    else
    {
        bike.brand = form.value.bikeCompany;
    }
    
    if(form.value.bikeModel == '')
    {
        bike.model = form.value.bikeFittingGoal;
    }
    else
    {
        bike.model = form.value.bikeModel;
    }
    
    bike.type = form.value.bikeType;
    bike.style = form.value.bikeFittingGoal;
    if(form.value.stemLength != null) {
    bike.stemLength = form.value.stemLength;
    }
    else 
    {
        bike.stemLength = 10;
    }

    if(form.value.crankLength != null) {
        bike.crankLength = form.value.crankLength;
    
    }
    else{
        bike.crankLength = 18;
    }
    

    bike.expectationsBackOrNeckPain = form.value.expectations.backOrNeckPain;
    bike.expectationsButPain = form.value.expectations.butPain;
    bike.expectationsClickPedals = form.value.expectations.clickPedals;
    bike.expectationsFeetPain = form.value.expectations.feetPain;
    bike.expectationsKneePain = form.value.expectations.kneePain;
    bike.expectationsNothing = form.value.expectations.nothing;


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
    bike.frameHeight = bikeFittingParams.frameHeight;
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