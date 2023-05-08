<template>
    <ion-page>
        <ion-content :fullscreen="true" :scroll-y="false">

            <step-card 
                title="Your bike type" 
                sub-title="What is your bike type?"                                        
                :this-step="1"
                :current-step="currentStep"
                :number-of-steps="numberOfSteps"                                
                @prev="prevStep()"
                @next="nextStep()"
                color="primary"
            >   
                <steps-radio-button @click="nextStep()" v-model="form.bikeType" label="city" value="city" color="primary"/>
                <steps-radio-button @click="nextStep()" v-model="form.bikeType" label="road" value="road" color="primary"/>
                <steps-radio-button @click="nextStep()" v-model="form.bikeType" label="gravel" value="gravel" color="primary"/>
                <steps-radio-button @click="nextStep()" v-model="form.bikeType" label="cross" value="cross" color="primary"/>
                <steps-radio-button @click="nextStep()" v-model="form.bikeType" label="electric" value="electric" color="primary"/>
                <steps-radio-button @click="nextStep()" v-model="form.bikeType" label="mtb" value="mtb" color="primary"/>
            </step-card>                                                

            <step-card 
                title="Your bike model" 
                sub-title="What is your bike model?"                                        
                :this-step="2"
                :current-step="currentStep"
                :number-of-steps="numberOfSteps"                                
                @prev="prevStep()"
                @next="nextStep()"
                color="primary"
            >   
                <button-input type="text" color="primary" v-model="form.bikeCompany" placeholder="Your bike company" />
                <button-input type="text" color="primary" v-model="form.bikeModel" placeholder="Your bike model" />            
                <steps-radio-button @click="nextStep()" v-model="form.noBikeModel" label="I don't know my bike model" value="unknown" color="primary"/>                
            </step-card>       

            <step-card 
                title="Your goal" 
                sub-title="How do you want to sit on your bike?"                                        
                :this-step="3"
                :current-step="currentStep"
                :number-of-steps="numberOfSteps"                                
                @prev="prevStep()"
                @next="nextStep()"
                color="primary"
            >                   
                <steps-radio-button @click="nextStep()" v-model="form.bikeFittingGoal" label="ergonomic" value="ergonomic" color="primary"/>                
                <steps-radio-button @click="nextStep()" v-model="form.bikeFittingGoal" label="sportslike" value="sportslike" color="primary"/>                
                <steps-radio-button @click="nextStep()" v-model="form.bikeFittingGoal" label="aerodynamic" value="aerodynamic" color="primary"/>                
            </step-card>                   

            <step-card 
                title="Your expectations" 
                sub-title="What do you expect from bikefitting?"                                        
                :this-step="4"
                :current-step="currentStep"
                :number-of-steps="numberOfSteps"                                
                @prev="prevStep()"
                @next="createBike()"
                color="primary"
            >                   
                <steps-radio-button v-model="form.expectations" label="backpain" value="backpain" color="primary"/>                
                <steps-radio-button v-model="form.expectations" label="buttpain" value="buttpain" color="primary"/>                
                <steps-radio-button v-model="form.expectations" label="kneepain" value="kneepain" color="primary"/>                
                <steps-radio-button v-model="form.expectations" label="feetpain" value="feetpain" color="primary"/>                
                <steps-radio-button v-model="form.expectations" label="clickpedals" value="clickpedals" color="primary"/>                
                <steps-radio-button v-model="form.expectations" label="nothing" value="nothing" color="primary"/>                                                                                                                            
            </step-card>                   
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import {
    IonPage, IonContent
} from '@ionic/vue';
import ButtonInput from '@/components/ButtonInput.vue';
import StepsRadioButton from '@/components/StepsRadioButton.vue';
import StepCard from '@/components/StepCard.vue';

import { Bike } from '@/entity/Bike';
import { User } from '@/entity/User';
import AppDataSource from '@/data-sources/SqliteDataSource';
import { updateUserProperty } from '@/helpers/helpersDataBase';

const numberOfSteps = 4;
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

const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
    }
}

const createBike = () => {
    // TODO: create bike in database
    console.log(form.value);
}
</script>