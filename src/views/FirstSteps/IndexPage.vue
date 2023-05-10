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

            <step-card title="Your height" sub-title="What is your height?" :this-step="2" :current-step="currentStep"
                :number-of-steps="numberOfSteps" @prev="prevStep" @next="nextStep">
                <!-- TODO: Test this button on mobile and fix validation -->
                <button-input :max="form.unitSystem === 'metric' ? 250 : 100" :min="form.unitSystem === 'metric' ? 50 : 20"
                    v-model="form.height" type="number" inputmode="numeric" placeholder="Enter your height"
                    :postfix="form.unitSystem === 'metric' ? 'cm' : 'inch'" />
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
                <steps-radio-button @click="nextStep()" v-model="form.rideStyle" label="Casual" value="casual" />
                <steps-radio-button @click="nextStep()" v-model="form.rideStyle" label="Recreational"
                    value="recreational" />
                <steps-radio-button @click="nextStep()" v-model="form.rideStyle" label="Avid" value="avid" />
                <steps-radio-button @click="nextStep()" v-model="form.rideStyle" label="Weekend Warrior"
                    value="weekendwarrior" />
                <steps-radio-button @click="nextStep()" v-model="form.rideStyle" label="Racer" value="racer" />
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
                    <ion-button router-link="/measure" expand="block" shape="round" mode="ios" type="button"
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
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { InformationCircleIcon } from "@heroicons/vue/24/outline"
import RiderStylesInfoModal from '@/views/FirstSteps/RiderStylesInfoModal.vue';
import ButtonInput from '@/components/ButtonInput.vue';
import StepsRadioButton from '@/components/StepsRadioButton.vue';
import StepCard from '@/components/StepCard.vue';
import { User } from '@/entity/User';
import AppDataSource from '@/data-sources/SqliteDataSource';
import { getUserFromDatabase } from '@/helpers/helpersDataBase'

const numberOfSteps = 5; // from 0 to 6
const currentStep = ref(0);
const isRiderStyleInfoVisible = ref(false);
const userRepository = AppDataSource.getRepository(User);
const newDataBase = true;

const form = ref({
    unitSystem: '',
    weight: '',
    height: 0,
    gender: '',
    rideTime: 0,
    rideStyle: '',
});




async function initializationDataBase() {

    //inicjalization data base
    let allUser = await userRepository.find();

    console.log("All User from the db: before save", allUser);


    const user = new User();

    //user.unitSystem = form.value.unitSystem;
    await userRepository.save(user);

    allUser = await userRepository.find();
    console.log("All User from the db: after save", allUser)

}

//DONT TOUCH MAYBE IS WORK IN FUTURE
/*async function checkWhichStepIsActual() {

    const userToUpdate = await userRepository.findOneBy({
        id: 1,
    });

    if (userToUpdate != null) {

        if (userToUpdate.unitSystem == null) {
            currentStep.value = 1
        }
        else if (userToUpdate.height == null) {
            currentStep.value = 2
        }
        else if (userToUpdate.rideTime == null) {
            currentStep.value = 3
        }
        else if (userToUpdate.riderStyle == null) {
            currentStep.value = 4
        }
        else {
            currentStep.value = 5
        }
    }

}*/


const nextStep = async () => {


    if (currentStep.value == 0) {

        if (await User.createQueryBuilder('user').getCount() == 0) {
            initializationDataBase();
        }

        const allUser = await userRepository.find();
        console.log("newDataBase false All User from the db:", allUser)

        //checkWhichStepIsActual();

    }

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
        else {

            const user = await getUserFromDatabase();

            console.log("step 5!!!!!!!!!")
            if (user != null) {
                user.unitSystem = form.value.unitSystem;
                user.overallHeight = form.value.height;
                user.rideTime = form.value.rideTime;
                user.riderStyle = form.value.rideStyle;
                await userRepository.save(user);
                console.log("save user")
            }
            else {
                console.log("user not found")
            }

            console.log("All User from the db: ", user);
            console.log("await User.createQueryBuilder('user').getCount(): ", await User.createQueryBuilder('user').getCount());
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