<template>
    <ion-page>
        <ion-content :fullscreen="true" :scroll-y="false">
            <div v-if="currentStep == 0"
                class="bg-black ion-padding py-12 xs:py-24 flex flex-col justify-between gap-3 xs:gap-6 h-full overflow-y-auto">
                <h2 class="text-right text-5xl xs:text-6xl">
                    let your <span class="text-primary font-semibold">bike</span> <br>
                    fit <span class="text-primary font-semibold">you</span>
                </h2>
                <div class="flex flex-col gap-8 xs:gap-12 px-3">
                    <div class="flex flex-col gap-4 xs:gap-6">                        
                        <h3 class="text-xl xs:text-2xl font-semibold text-left">
                            Tell us about yourself!
                        </h3>
                        <p class="text-base xs:text-lg text-left">
                            As with real bike fitting, we will start
                            with a short survey about you, your
                            riding style and your expectations.
                        </p>
                    </div>
                    <ion-button @click="nextStep()" expand="block" shape="round" color="primary" mode="ios" type="button"
                        class="font-bold text-lg">
                        Get started!
                    </ion-button>
                        <ion-button @click="goToExampleBikeFitting()" expand="block" shape="round" color="primary" mode="ios" type="button"
                            class="font-bold text-lg">
                            Example Bike Fitting
                        </ion-button>
                </div>
            </div>

            <step-card title="Your unit system" sub-title="What unit system do you prefer?" :this-step="1"
                :current-step="currentStep" :number-of-steps="numberOfSteps" @prev="prevStep" @next="nextStep"
                :error-message="form.errors.unitSystem">
                <steps-radio-button @click="nextStep()" v-model="form.unitSystem" label="Metric" value="metric" />
                <steps-radio-button @click="nextStep()" v-model="form.unitSystem" label="Imperial" value="imperial" />
            </step-card>

            <step-card title="Your height and shoe size" sub-title="What is your height?" :this-step="2"
                :current-step="currentStep" :number-of-steps="numberOfSteps" @prev="prevStep" @next="nextStep">
                <button-input @click="form.height = null" v-model="form.height" type="tel" placeholder="Enter your height"
                    :postfix="form.unitSystem === 'metric' ? 'cm' : 'inch'" />
                <ion-alert :is-open="form.errors.height != ''" header="Wrong height" :message="form.errors.height"
                    :buttons="['OK']" @did-dismiss="form.errors.height = ''">
                </ion-alert>

                <button-input @click="form.shoeSize = null" v-model="form.shoeSize" type="tel"
                    placeholder="Enter your shoe size" postfix="EU" />
                <ion-alert :is-open="form.errors.shoeSize != ''" header="Wrong shoe size" :message="form.errors.shoeSize"
                    :buttons="['OK']" @did-dismiss="form.errors.shoeSize = ''">
                </ion-alert>
            </step-card>

            <step-card title="Your rider level" sub-title="At what level of cycling would you define yourself?"
                :this-step="3" :current-step="currentStep" :number-of-steps="numberOfSteps" @prev="prevStep"
                @next="nextStep" :error-message="form.errors.riderStyle">
                <steps-radio-button @click="nextStep()" v-model="form.riderStyle" label="Casual" value="casual" />
                <steps-radio-button @click="nextStep()" v-model="form.riderStyle" label="Recreational"
                    value="recreational" />
                <steps-radio-button @click="nextStep()" v-model="form.riderStyle" label="Avid" value="avid" />
                <steps-radio-button @click="nextStep()" v-model="form.riderStyle" label="Weekend Warrior"
                    value="weekendwarrior" />
                <steps-radio-button @click="nextStep()" v-model="form.riderStyle" label="Racer" value="racer" />
                <InformationCircleIcon class="mx-3 h-8 w-8 text-secondary" @click="isRiderStyleInfoVisible = true" />
            </step-card>

            <step-card title="Reach Test" sub-title="How far do you reach in sit and reach test?" :this-step="4" :current-step="currentStep"
                :number-of-steps="numberOfSteps" @prev="prevStep" @next="nextStep"
                :error-message="form.errors.additionalSurvey">
                <steps-radio-button @click="nextStep()" v-model="form.additionalSurvey" label="Palm to
                                ground" value="4" />
                <steps-radio-button @click="nextStep()" v-model="form.additionalSurvey" label="Finger tips to
                                ground" value="3" />
                <steps-radio-button @click="nextStep()" v-model="form.additionalSurvey" label="More than 5 cm to
                                ground" value="2" />
                <steps-radio-button @click="nextStep()" v-model="form.additionalSurvey" label="More than 10 cm to
                                ground" value="1" />
                <InformationCircleIcon class="mx-3 h-8 w-8 text-secondary" @click="isSitAndReachInfoVisible = true" />
            </step-card>

            <rider-styles-info-modal :is-open="isRiderStyleInfoVisible" @close="isRiderStyleInfoVisible = false" />
            <sit-and-reach-info-modal :is-open="isSitAndReachInfoVisible" @close="isSitAndReachInfoVisible = false" />

            <div v-if="currentStep == 5"
                class="ion-padding overflow-y-scroll py-6 xxs:py-12 xs:py-24 flex flex-col justify-between gap-6 h-full bg-[#00183B]">
                <h2 class="text-left text-5xl xs:text-6xl px-6">
                    Bike fitting
                </h2>
                <div class="flex flex-col justify-between h-full gap-3 px-3">
                    <div class="flex flex-col gap-6 items-center">
                        <img src="@/../resources/images/luszwost_woman_riding_a_bike_in.png" alt="person on a bike"
                            class="w-full h-48 xs:h-64 object-contain" />
                        <h3 class="text-lg xxs:text-xl xs:text-2xl font-semibold text-center">
                            Start with measuring yourself!
                        </h3>
                        <p class="text-base xxs:text-lg text-center px-3">
                            In order to bikefit you into your bike, we need to know your measurements.
                            You can pass your photo, or we can do it live with your phone camera!
                        </p>
                    </div>
                    <ion-button @click="goToMeasure()" expand="block" shape="round" mode="ios" type="button"
                        color="sand-desert" class="font-bold text-lg">
                        Measure me!
                    </ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent, IonButton, useIonRouter, IonAlert } from '@ionic/vue';
import { InformationCircleIcon } from "@heroicons/vue/24/outline"
import RiderStylesInfoModal from '@/views/FirstSteps/RiderStylesInfoModal.vue';
import SitAndReachInfoModal from '@/views/FirstSteps/SitAndReachInfoModal.vue';
import ButtonInput from '@/components/ButtonInput.vue';
import StepsRadioButton from '@/components/StepsRadioButton.vue';
import StepCard from '@/components/StepCard.vue';
import { User } from '@/entity/User';
import { Bike } from '@/entity/Bike';
import { saveDbForWeb } from '@/composables/useSqliteOnWeb';
import { getBikefittingParams } from '@/functions/calculatedBikeFittingParams';

const numberOfSteps = 5; // from 0 to 5
const currentStep = ref(0);
const isRiderStyleInfoVisible = ref(false);
const isSitAndReachInfoVisible = ref(false);

const form = ref({
    unitSystem: '',
    height: null,
    riderStyle: '',
    shoeSize: null,
    additionalSurvey: 0,
    errors: {
        unitSystem: "",
        height: "",
        riderStyle: "",
        shoeSize: "",
        additionalSurvey: "",
    }
});

const goToExampleBikeFitting = async () => {
    const user = new User();
    user.id = 1;
    // TODO We must add to logic program consideration unit System
    user.hasMeasuredWithCamera = false;
    user.measurementsInstructionShown = false;
    user.unitSystem = 'metric';
    user.overallHeight = 190;
    user.riderStyle = "casual";
    user.shoeSize = 42;
    user.inseamLength = 81;
    user.thighLength = 42;
    user.shankLength = 47;
    user.shoulderHeight = 145;
    user.armLength = 70;
    user.choiceFlexibilitySurvey = 1;
    await user.save();

    const bike = new Bike();
    bike.brand = "Romet";
    bike.model = "MTB";
    bike.type = "road";
    bike.style = "aerodynamic";
    bike.stemLength = 10;
    bike.crankLength = 18;

    bike.expectationsBackOrNeckPain = true;
    bike.expectationsButPain = true;
    bike.expectationsClickPedals = true;
    bike.expectationsFeetPain = true;
    bike.expectationsKneePain = true;
    bike.expectationsNothing = true;

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

    router.navigate('/bikes/' + bike.id, 'none', 'replace');
}

// const nextStepAnimation = (prevStepEl: any, nextStepEl: any) => {
//     return createAnimation()
//         .addElement(prevStepEl)
//         .easing('ease-out')
//         .duration(300)
//         .fromTo('opacity', '1', '0')
//         .fromTo('transform', 'translateX(0)', 'translateX(100%)')
//         .addElement(nextStepEl)
//         .fromTo('opacity', '0', '1')
//         .fromTo('transform', 'translateX(-100%)', 'translateX(0)');
// }



const nextStep = () => {
    cleanFormErrors();

    if (currentStep.value == 1) {
        if (form.value.unitSystem == '') {
            form.value.errors.unitSystem = "Please select unit system";
            return;
        }
    } else if (currentStep.value == 2) {
        if (form.value.height == null) {
            form.value.errors.height = "Please enter your height";
            return;
        }
        if (form.value.unitSystem == 'imperial') {
            if (form.value.height < 20 || form.value.height > 100) {
                form.value.errors.height = "Height must be between 20 and 100 inches";
                return;
            }
        }

        if (form.value.unitSystem == 'metric') {
            if (form.value.height < 50 || form.value.height > 250) {
                form.value.errors.height = "Height must be between 50 and 250 centimeters";
                return;
            }
        }

        if (form.value.shoeSize == null) {
            form.value.errors.shoeSize = "Please enter your shoe size";
            return;
        }
        if (form.value.shoeSize < 30 || form.value.shoeSize > 60) {
            form.value.errors.shoeSize = "Shoe size must be between 30 and 60 EU";
            return;
        }
    } else if (currentStep.value == 3) {
        if (form.value.riderStyle == '') {
            form.value.errors.riderStyle = "Please select ride style";
            return;
        }
    } else if (currentStep.value === 4) {
        if (form.value.additionalSurvey === 0) {
            form.value.errors.additionalSurvey = "Please select your flexibility";
            return;
        }

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

const cleanFormErrors = () => {
    if (form.value) {
        form.value.errors = {
            unitSystem: "",
            height: "",
            riderStyle: "",
            shoeSize: "",
            additionalSurvey: "",
        };
    }
}

const router = useIonRouter();

const goToMeasure = async () => {
    if (form.value.height == null) {
        form.value.errors.height = "Please enter your height";
        console.log(form.value.errors.height);
        currentStep.value = 2;
        return;
    }

    if (form.value.shoeSize == null) {
        form.value.errors.shoeSize = "Please enter your shoe size";
        console.log(form.value.errors.shoeSize);
        currentStep.value = 2;
        return;
    }

    const user = new User();
    user.id = 1;
    user.unitSystem = form.value.unitSystem;
    user.overallHeight = form.value.height;
    user.riderStyle = form.value.riderStyle;
    user.shoeSize = form.value.shoeSize;
    user.choiceFlexibilitySurvey = form.value.additionalSurvey;
    await user.save();
    saveDbForWeb();

    router.replace('/measure');
}


</script>