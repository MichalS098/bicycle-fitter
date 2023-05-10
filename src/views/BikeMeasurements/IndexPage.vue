<template>
    <ion-page>
        <ion-content class="ion-padding" :fullscreen="true">
            <div class="flex flex-col justify-between gap-6 xxs:gap-12 pt-12">
                <button class="absolute top-0 right-0 p-2 xxs:p-4" @click="goToHome">X</button>
                <div class="px-3 xxs:px-6 pt-3 xxs:pt-6">
                    <h1 class="text-5xl xxs:text-6xl">
                        Trek
                    </h1>
                </div>
                <div class="px-3 xxs:px-6 pt-3 xxs:pt-6">
                    <h2 class="text-xl xxs:text-xl">
                        Suggested
                        <br>
                        measurements
                    </h2>
                </div>
            </div>
            <ul>
                <li>seatHeigth: {{ bikeRef?.seatHeigth }}</li>
                <li>seatSetback: {{ bikeRef?.seatSetback }}</li>
                <li>seatLength: {{ bikeRef?.seatLength }}</li>
                <li>seatDrop: {{ bikeRef?.seatDrop }}</li>
                <li>spacerHeigth: {{ bikeRef?.spacerHeigth }}</li>
                <li>stemLength: {{ bikeRef?.stemLength }}</li>
                <li>stemAngle: {{ bikeRef?.stemAngle }}</li>
                <li>stackMin: {{ bikeRef?.stackMin }}</li>
                <li>reachMin: {{ bikeRef?.reachMin }}</li>
                <li>stackMax: {{ bikeRef?.stackMax }}</li>
                <li>reachMax: {{ bikeRef?.reachMax }}</li>
                <li>stack2ReachIndex1: {{ bikeRef?.stack2ReachIndex1 }}</li>
                <li>stack2ReachIndex2: {{ bikeRef?.stack2ReachIndex2 }}</li>
                <li>stack2ReachIndex3: {{ bikeRef?.stack2ReachIndex3 }}</li>
            </ul>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts" setup>
import {
    IonPage, IonContent, useIonRouter
} from '@ionic/vue';
import { onMounted, ref } from 'vue';

import { Bike } from '@/entity/Bike';
import { User } from '@/entity/User';
import AppDataSource from '@/data-sources/SqliteDataSource';
import { updateProperty } from '@/helpers/helpersDataBase';

import { calculatedBikeFittingParams } from '@/functions/calculatedBikeFittingParams';
import { seatHeightCalc, sind, cosd } from '@/functions/bikefittinglogic/bikeFittingParamsLogic';
import { bikeParams, bikeType, ridingStyle } from '@/classes/bikeParams';
import { humanParams } from '@/classes/humanParams';
import { getLastBikeOfUser } from '@/helpers/helpersDataBase';

/*const seatHeigth = ref<HTMLDivElement>();
const seatSetback = ref<HTMLDivElement>();
const seatLength = ref<HTMLDivElement>();
const seatDrop = ref<HTMLDivElement>();
const spacerHeigth = ref<HTMLDivElement>();
const stemLength = ref<HTMLDivElement>();
const stemAngle = ref<HTMLDivElement>();
const stackMin = ref<HTMLDivElement>();
const reachMin = ref<HTMLDivElement>();
const stackMax = ref<HTMLDivElement>();
const reachMax = ref<HTMLDivElement>();
const stack2ReachIndex1 = ref<HTMLDivElement>();
const stack2ReachIndex2 = ref<HTMLDivElement>();
const stack2ReachIndex3 = ref<HTMLDivElement>();*/


const userRepository = AppDataSource.getRepository(User);
const bikeRepository = AppDataSource.getRepository(Bike);


const bikeRef = ref<Bike>();

function chooseBikeType(type: string) {
    switch (type) {
        case 'city':
            {
                return bikeType.City;

            }
        case 'road':
            {
                return bikeType.Road;

            }
        case 'gravel':
            {
                return bikeType.Mountain;

            }
        case 'cross':
            {
                return bikeType.Mountain;

            }
        case 'electric':
            {
                return bikeType.City;

            }
        case 'mtb':
            {
                return bikeType.Mountain;

            }
        default:
            {
                console.log("Problem with bike type !!!!")
                return bikeType.City;
            }

    }
}

function chooseRidingStyle(style: string) {
    switch (style) {
        case 'ergonomic':
            {
                return ridingStyle.Ergonomic;

            }
        case 'sportslike':
            {
                return ridingStyle.Sport;

            }
        case 'aerodynamic':
            {
                return ridingStyle.Aerodynamic;

            }
        default:
            {
                console.log("Problem with riding style !!!!")
                return ridingStyle.Aerodynamic;
            }

    }

}

onMounted(async () => {

    console.log("Bike Fitting!")

    const userToUpdate = await userRepository.findOne({
        where: {
            id: 1
        },
        relations: {
            bikes: true
        }
    })

    console.log("userToUpdate: ", userToUpdate);
    const lastBike = await getLastBikeOfUser();

    if (!lastBike) {
        console.log('No bikes found for this user');
        return;
    }

    console.log("lastBike: ", lastBike);
    
    const clickPedals = 1;
    const neckOrBackPain = 2;
    const butPain = 2;
    const feetPain = 2;
    const kneePain = 2;
    const choiceFlexibilitySurvey = 1;

    let shankLength;
    let thighLength;
    let shoeSize = 44; //this input must add to interview
    let inseamLength;
    let shoulderHeight;
    let armLength;
    let overallHeight;

    if ((userToUpdate != null) && (lastBike != null)) {
        shankLength = userToUpdate.shankLength;
        thighLength = userToUpdate.thighLength;
        shoeSize = 44; //this input must add to interview
        inseamLength = userToUpdate.inseamLength;
        shoulderHeight = userToUpdate.shoulderHeight;
        armLength = userToUpdate.armLength;
        overallHeight = userToUpdate.overallHeight;
        const person = new humanParams(shankLength, thighLength, shoeSize, inseamLength, shoulderHeight, armLength, 85, overallHeight, 37.5);

        const bike = new bikeParams();
        bike.type = chooseBikeType(lastBike.type);
        bike.style = chooseRidingStyle(lastBike.style);
        bike.crankLength = 18 //it we must know before bikefitting, we must add this to interview bike 
        bike.seatHeigth = 90
        bike.seatSetback = 20
        bike.seatLength = 40
        bike.seatDrop = -5
        bike.spacerHeigth = 2 //W programie matlabowym było to tak zdefiniowane 
        bike.stemLength = 10 //VL
        bike.stemAngle = 10 //VW
        const [returnedBike, returnedPerson] = calculatedBikeFittingParams(
            clickPedals,
            neckOrBackPain,
            butPain,
            feetPain,
            kneePain,
            choiceFlexibilitySurvey,
            person,
            bike
        );

        lastBike.seatHeigth = returnedBike.seatHeigth;
        lastBike.seatSetback = returnedBike.seatSetback;
        lastBike.seatLength = returnedBike.seatLength;
        lastBike.seatDrop = returnedBike.seatDrop;
        lastBike.spacerHeigth = returnedBike.spacerHeigth;
        lastBike.stemLength = returnedBike.stemLength;
        lastBike.stemAngle = returnedBike.stemAngle;
        lastBike.stackMin = returnedBike.stackMin;
        lastBike.reachMin = returnedBike.reachMin;
        lastBike.stackMax = returnedBike.stackMax;
        lastBike.reachMax = returnedBike.reachMax;
        lastBike.stack2ReachIndex1 = returnedBike.stack2ReachIndex1;
        lastBike.stack2ReachIndex2 = returnedBike.stack2ReachIndex2;
        lastBike.stack2ReachIndex3 = returnedBike.stack2ReachIndex3;

        await bikeRepository.save(lastBike);

        bikeRef.value = lastBike;
        
        console.log("seatHeigth: ", returnedBike.seatHeigth);
        console.log("seatSetback: ", returnedBike.seatSetback);
        console.log("seatLength: ", returnedBike.seatLength);
        console.log("seatDrop: ", returnedBike.seatDrop);
        console.log("spacerHeigth: ", returnedBike.spacerHeigth);
        console.log("stemLength: ", returnedBike.stemLength);
        console.log("stemAngle: ", returnedBike.stemAngle);
        console.log("stackMin: ", returnedBike.stackMin);
        console.log("reachMin: ", returnedBike.reachMin);
        console.log("stackMax: ", returnedBike.stackMax);
        console.log("reachMax: ", returnedBike.reachMax);
        console.log("stack2ReachIndex1: ", returnedBike.stack2ReachIndex1);
        console.log("stack2ReachIndex2: ", returnedBike.stack2ReachIndex2);
        console.log("stack2ReachIndex3: ", returnedBike.stack2ReachIndex3);
    }
    else {
        console.log("Error with human or bike params !!!");
    }

    //PLEASE DONT TOUCH THIS COMMENT, IT CAN BE NEEED IN THE FUTERE TO DEBUG 
    //const person = new humanParams(47, 42, 42, 81, 145, 70, 85, 190,0);

    /*const person = new humanParams(userToUpdate.shankLength,
     userToUpdate.thighLength,
     shoeSize,
     userToUpdate.inseamLength,
     userToUpdate.shoulderHeight,
     userToUpdate.armLength,
     85,
     userToUpdate.overallHeight,
     37.5);*/

});

const router = useIonRouter();

const goToHome = () => {
    router.navigate('/pages/home', 'none', 'replace');
};

</script>