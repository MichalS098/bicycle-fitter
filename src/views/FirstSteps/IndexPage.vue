<template>
    <ion-page>
        <ion-content :fullscreen="true" :scroll-y="false">
            <div v-if="currentStep == 0"
                class="ion-padding py-6 xxs:py-12 xs:py-24 flex flex-col justify-between gap-3 xs:gap-6 h-full">
                <h2 class="text-right text-4xl xxs:text-5xl xs:text-6xl">
                    let your <span class="text-primary font-semibold">bike</span> <br>
                    fit <span class="text-primary font-semibold">you</span>
                </h2>
                <div class="flex flex-col gap-12 px-3">
                    <div class="flex flex-col gap-6">
                        <h3 class="text-2xl font-semibold text-left">
                            Tell us about yourself!
                        </h3>
                        <p class="text-lg text-left">
                            As with real bike fitting, we will start
                            with a short survey about you, your
                            riding style and your expectations
                        </p>
                    </div>
                    <ion-button @click="nextStep()" expand="block" shape="round" color="primary" mode="ios" type="button"
                        class="font-bold text-lg">
                        Get started!
                    </ion-button>
                </div>
            </div>

            <step-card title="Your unit system" sub-title="What unit system do you prefer?" :this-step="1"
                :current-step="currentStep" :number-of-steps="numberOfSteps" @prev="prevStep" @next="nextStep">
                <steps-radio-button @click="nextStep()" v-model="form.unitSystem" label="Metric" value="metric" />
                <steps-radio-button @click="nextStep()" v-model="form.unitSystem" label="Imperial" value="imperial" />
            </step-card>

            <step-card title="Your height and shoe size" sub-title="What is your height?" :this-step="2"
                :current-step="currentStep" :number-of-steps="numberOfSteps" @prev="prevStep" @next="nextStep">
                <button-input v-model="form.height" type="number" inputmode="numeric" placeholder="Enter your height"
                    :postfix="form.unitSystem === 'metric' ? 'cm' : 'inch'" />
                <ion-alert :is-open="form.errors.height != ''" header="Wrong height" :message="form.errors.height"
                    :buttons="['OK']" @did-dismiss="form.errors.height = ''">
                </ion-alert>

                <button-input v-model="form.shoeSize" type="number" inputmode="numeric" placeholder="Enter your shoe size" postfix="EU"/>
                <ion-alert :is-open="form.errors.shoeSize != ''" header="Wrong shoe size" :message="form.errors.shoeSize"
                    :buttons="['OK']" @did-dismiss="form.errors.shoeSize = ''">
                </ion-alert>
                <button-input v-model="form.nameOfUser" type="text" inputmode="text" placeholder="Enter your name" postfix=""/>
            </step-card>

            <step-card title="Your ride time" sub-title="Typically how much time per week do you spend on the bike?"
                :this-step="3" :current-step="currentStep" :number-of-steps="numberOfSteps" @prev="prevStep"
                @next="nextStep">
                <steps-radio-button @click="nextStep()" v-model="form.rideTime" label="1 hour or less" value="1" />
                <steps-radio-button @click="nextStep()" v-model="form.rideTime" label="1 - 3 hours" value="2" />
                <steps-radio-button @click="nextStep()" v-model="form.rideTime" label="3 - 6 hours" value="3" />
                <steps-radio-button @click="nextStep()" v-model="form.rideTime" label="6 hours or more" value="4" />
            </step-card>

            <step-card title="Your rider level" sub-title="At what level of cycling would you define yourself?"
                :this-step="4" :current-step="currentStep" :number-of-steps="numberOfSteps" @prev="prevStep"
                @next="nextStep" class="overflow-y-auto">
                <steps-radio-button @click="nextStep()" v-model="form.riderStyle" label="Casual" value="casual" />
                <steps-radio-button @click="nextStep()" v-model="form.riderStyle" label="Recreational"
                    value="recreational" />
                <steps-radio-button @click="nextStep()" v-model="form.riderStyle" label="Avid" value="avid" />
                <steps-radio-button @click="nextStep()" v-model="form.riderStyle" label="Weekend Warrior"
                    value="weekendwarrior" />
                <steps-radio-button @click="nextStep()" v-model="form.riderStyle" label="Racer" value="racer" />
                <InformationCircleIcon class="mx-3 h-8 w-8 text-secondary" @click="isRiderStyleInfoVisible = true" />
            </step-card>

            <rider-styles-info-modal :is-open="isRiderStyleInfoVisible" @close="isRiderStyleInfoVisible = false" />

            <div v-if="currentStep == 5"
                class="ion-padding overflow-y-scroll py-6 xxs:py-12 xs:py-24 flex flex-col justify-between gap-6 h-full bg-secondary-shade">
                <h2 class="text-left xs:text-right text-4xl xxs:text-5xl xs:text-6xl">
                    Bike fitting
                </h2>
                <div class="flex flex-col justify-between h-full gap-3 px-3">
                    <div class="flex flex-col gap-6">
                        <img src="@/../resources/images/person-on-bike.png" alt="person on a bike"
                            class="w-full h-24 xxs:h-32 xs:h-48 object-contain" />
                        <h3 class="text-lg xxs:text-xl xs:text-2xl font-semibold text-left">
                            Start with measuring yourself!
                        </h3>
                        <p class="text-base xxs:text-lg text-left">
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
import ButtonInput from '@/components/ButtonInput.vue';
import StepsRadioButton from '@/components/StepsRadioButton.vue';
import StepCard from '@/components/StepCard.vue';
import { User } from '@/entity/User';
import { saveDbForWeb } from '@/composables/useSqliteOnWeb';

const numberOfSteps = 5; // from 0 to 6
const currentStep = ref(0);
const isRiderStyleInfoVisible = ref(false);

const form = ref({
    unitSystem: '',
    height: 0,
    rideTime: 0,
    riderStyle: '',
    shoeSize: 0,
    errors: {
        unitSystem: "",
        height: "",
        rideTime: "",
        riderStyle: "",
        shoeSize: "",
    },
    nameOfUser: ''
});

const nextStep = () => {
    form.value.errors = {
        unitSystem: "",
        height: "",
        rideTime: "",
        riderStyle: "",
        shoeSize: "",
    };

    if (currentStep.value == 1) {
        if (form.value.unitSystem == '') {
            form.value.errors.unitSystem = "Please select unit system";
            return;
        }
    } else if (currentStep.value == 2) {
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

        if (form.value.shoeSize < 30 || form.value.shoeSize > 60) {
            form.value.errors.shoeSize = "Shoe size must be between 30 and 60 EU";
            return;
        }
    } else if (currentStep.value == 3) {
        if (form.value.rideTime == 0) {
            form.value.errors.rideTime = "Please select ride time";
            return;
        }
    } else if (currentStep.value == 4) {
        if (form.value.riderStyle == '') {
            form.value.errors.riderStyle = "Please select ride style";
            return;
        }
    }

    if (currentStep.value < numberOfSteps) {
        currentStep.value++;
    }
}

const router = useIonRouter();

const goToMeasure = async () => {
    const user = new User();
    user.id = 1;
    // TODO We must add to logic program consideration unit System
    user.unitSystem = form.value.unitSystem;
    user.overallHeight = form.value.height;
    user.rideTime = form.value.rideTime;
    user.riderStyle = form.value.riderStyle;
    user.shoeSize = form.value.shoeSize;
    user.nameOfUser = form.value.nameOfUser;
    await user.save();
    saveDbForWeb();

    router.replace('/measure');
}

const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
    }
}
</script>