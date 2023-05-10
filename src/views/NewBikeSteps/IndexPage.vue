<template>
    <ion-page>
        <ion-content :fullscreen="true" :scroll-y="false">

            <step-card title="Your bike type" sub-title="What is your bike type?" :this-step="1" :current-step="currentStep"
                :number-of-steps="numberOfSteps" @prev="prevStep()" @next="nextStep()" color="primary">
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
                :current-step="currentStep" :number-of-steps="numberOfSteps" @prev="prevStep()" @next="createBike()"
                color="primary">
                <steps-radio-button v-model="form.expectations" label="backpain" value="backpain" color="primary" />
                <steps-radio-button v-model="form.expectations" label="buttpain" value="buttpain" color="primary" />
                <steps-radio-button v-model="form.expectations" label="kneepain" value="kneepain" color="primary" />
                <steps-radio-button v-model="form.expectations" label="feetpain" value="feetpain" color="primary" />
                <steps-radio-button v-model="form.expectations" label="clickpedals" value="clickpedals" color="primary" />
                <steps-radio-button v-model="form.expectations" label="nothing" value="nothing" color="primary" />
            </step-card>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import {
    IonPage, IonContent
} from '@ionic/vue';
import {
    useIonRouter,
    createAnimation,
    AnimationBuilder
} from '@ionic/vue';

import ButtonInput from '@/components/ButtonInput.vue';
import StepsRadioButton from '@/components/StepsRadioButton.vue';
import StepCard from '@/components/StepCard.vue';

import { Bike } from '@/entity/Bike';
import { User } from '@/entity/User';
import AppDataSource from '@/data-sources/SqliteDataSource';
import { updateProperty } from '@/helpers/helpersDataBase';
import { onMounted } from 'vue';
import { getLastBikeOfUser } from '@/helpers/helpersDataBase';

const numberOfSteps = 4;
const currentStep = ref(1);

const userRepository = AppDataSource.getRepository(User);
const bikeRepository = AppDataSource.getRepository(Bike);

const form = ref({
    bikeType: '',
    bikeCompany: '',
    bikeModel: '',
    noBikeModel: false,
    suggestNewBike: false,
    bikeFittingGoal: '',
    expectations: '',
});


async function checkIfUserEndOfTheInterview() {
    const lastBike = await getLastBikeOfUser();

    if (lastBike != null) {
        if ((lastBike.type != null) &&
            (lastBike.brand != null) &&
            (lastBike.model != null) &&
            (lastBike.style != null)) //&&lastBike.expectations
        {

            console.log("jestem tu 1")
            return true;
        }
        else {
            console.log("jestem tu 2")
            return false;
        }

    }
    else {
        console.log("jestem tu 3")
        return true;
    }

}


async function initializeBikeInUser() {
    const userToUpdate = await userRepository.findOneBy({
        id: 1,
    })

    if (!userToUpdate) {
        console.log('User not found');
        return;
    }

    const bike = new Bike();

    bike.user = userToUpdate;

    await bikeRepository.save(bike);

    const allBike = await bikeRepository.find();

    console.log("allBike: ", allBike)


    // Sprawdź, czy użytkownik istnieje
    if (userToUpdate) {
        // Jeśli lista rowerów nie istnieje, zainicjuj ją jako pustą tablicę
        if (!userToUpdate.bikes) {
            userToUpdate.bikes = [];
        }

        // Dodaj nowy rower do listy rowerów użytkownika
        userToUpdate.bikes.push(bike);
    } else {
        console.error('User not found');
    }

    await userRepository.save(userToUpdate);

    const allUser = await userRepository.find();
    console.log("All User from the db after Bike Steps: ", allUser);

}

onMounted(async () => {

    const interviewCompleted = await checkIfUserEndOfTheInterview();
    if (interviewCompleted) {
        initializeBikeInUser();
    }
});

const nextStep = async () => {

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
        else {
            console.log("TEST 1")
            const lastBike = await getLastBikeOfUser();

            if (!lastBike) {
                console.log('No bikes found for this user');
                return;
            }
            console.log("expectations", form.value); //WE neeed to add this to structure in program, you must remember that if you ad this to structure in program, you must change function "checkIfUserEndOfTheInterview()"
            lastBike.type = form.value.bikeType;
            lastBike.brand = form.value.bikeCompany;
            lastBike.model = form.value.bikeModel;
            lastBike.style = form.value.bikeFittingGoal;
            await bikeRepository.save(lastBike);
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

const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
    }
}

const router = useIonRouter();
const createBike = async () => {
    console.log("createBike", form.value);

    const allUser = await userRepository.find();
    console.log("All User from the db after Bike Steps: ", allUser);

    router.navigate('/bike-measurements', 'none', 'replace');
}
</script>