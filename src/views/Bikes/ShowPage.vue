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
                <li>seatHeight: {{ bike?.seatHeight }}</li>
                <li>seatSetback: {{ bike?.seatSetback }}</li>
                <li>seatLength: {{ bike?.seatLength }}</li>
                <li>seatDrop: {{ bike?.seatDrop }}</li>
                <li>spacerHeight: {{ bike?.spacerHeight }}</li>
                <li>stemLength: {{ bike?.stemLength }}</li>
                <li>stemAngle: {{ bike?.stemAngle }}</li>
                <li>stackMin: {{ bike?.stackMin }}</li>
                <li>reachMin: {{ bike?.reachMin }}</li>
                <li>stackMax: {{ bike?.stackMax }}</li>
                <li>reachMax: {{ bike?.reachMax }}</li>
                <li>stack2ReachIndex1: {{ bike?.stack2ReachIndex1 }}</li>
                <li>stack2ReachIndex2: {{ bike?.stack2ReachIndex2 }}</li>
                <li>stack2ReachIndex3: {{ bike?.stack2ReachIndex3 }}</li>
            </ul>
            <button class="absolute bottom-0 right-0 p-2 xxs:p-4" @click="goToAngleMeasure">></button>
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

import { seatHeightCalc, sind, cosd } from '@/functions/bikefittinglogic/bikeFittingParamsLogic';
import { calculatedBikeFittingParams } from '@/functions/calculatedBikeFittingParams';
import { bikeParams, bikeType, ridingStyle } from '@/classes/bikeParams';
import { humanParams } from '@/classes/humanParams';
import { getLastBikeOfUser } from '@/helpers/helpersDataBase';
import { useRoute } from 'vue-router';

// get router params props
const route = useRoute();
const bike_id = Number(route.params.id);
const bike = ref<Bike | null>();


const router = useIonRouter();

const goToHome = () => {
    router.navigate('/pages/home', 'none', 'replace');
};

const goToAngleMeasure = () => {
    // router.navigate('/angles', 'none', 'replace');
    if (bike.value != null)
        router.navigate('/bikes/' + bike.value.id + '/measure', 'none', 'replace');
    else {
        console.log("goToAngleMeasure(): bike entity is null")
    }
};


onMounted(async () => {
    bike.value = await Bike.findOneBy({
        id: bike_id
    })
    console.log("bike: ", bike.value);

    if (!bike.value) {
        console.log('No bike found');
        goToHome();        
        return;
    }
});

//     bikeRef.value = bike;    
// });


// const bike = ref<Bike>();
// onMounted(async () => {
//     bike = await Bike.findOne({
//         where: {
//             id: 1
//         }
//     });

//     console.log("Bike Fitting!")

//     const userToUpdate = await userRepository.findOne({
//         where: {
//             id: 1
//         },
//         relations: {
//             bikes: true
//         }
//     })

//     console.log("userToUpdate: ", userToUpdate);
//     const lastBike = await getLastBikeOfUser();

//     if (!lastBike) {
//         console.log('No bikes found for this user');
//         return;
//     }

//     console.log("lastBike: ", lastBike);

//     const clickPedals = 1;
//     const neckOrBackPain = 2;
//     const butPain = 2;
//     const feetPain = 2;
//     const kneePain = 2;
//     const choiceFlexibilitySurvey = 1;

//     let shankLength;
//     let thighLength;
//     let shoeSize = 44; //this input must add to interview
//     let inseamLength;
//     let shoulderHeight;
//     let armLength;
//     let overallHeight;

//     if ((userToUpdate != null) && (lastBike != null)) {
//         shankLength = userToUpdate.shankLength;
//         thighLength = userToUpdate.thighLength;
//         shoeSize = 44; //this input must add to interview
//         inseamLength = userToUpdate.inseamLength;
//         shoulderHeight = userToUpdate.shoulderHeight;
//         armLength = userToUpdate.armLength;
//         overallHeight = userToUpdate.overallHeight;
//         const person = new humanParams(shankLength, thighLength, shoeSize, inseamLength, shoulderHeight, armLength, 85, overallHeight, 37.5);

//         const bike = new bikeParams();
//         bike.type = chooseBikeType(lastBike.type);
//         bike.style = chooseRidingStyle(lastBike.style);
//         bike.crankLength = 18 //it we must know before bikefitting, we must add this to interview bike 
//         bike.seatHeight = 90
//         bike.seatSetback = 20
//         bike.seatLength = 40
//         bike.seatDrop = -5
//         bike.spacerHeight = 2 //W programie matlabowym było to tak zdefiniowane 
//         bike.stemLength = 10 //VL
//         bike.stemAngle = 10 //VW
//         const [returnedBike, returnedPerson] = calculatedBikeFittingParams(
//             clickPedals,
//             neckOrBackPain,
//             butPain,
//             feetPain,
//             kneePain,
//             choiceFlexibilitySurvey,
//             person,
//             bike
//         );

//         lastBike.seatHeight = returnedBike.seatHeight;
//         lastBike.seatSetback = returnedBike.seatSetback;
//         lastBike.seatLength = returnedBike.seatLength;
//         lastBike.seatDrop = returnedBike.seatDrop;
//         lastBike.spacerHeight = returnedBike.spacerHeight;
//         lastBike.stemLength = returnedBike.stemLength;
//         lastBike.stemAngle = returnedBike.stemAngle;
//         lastBike.stackMin = returnedBike.stackMin;
//         lastBike.reachMin = returnedBike.reachMin;
//         lastBike.stackMax = returnedBike.stackMax;
//         lastBike.reachMax = returnedBike.reachMax;
//         lastBike.stack2ReachIndex1 = returnedBike.stack2ReachIndex1;
//         lastBike.stack2ReachIndex2 = returnedBike.stack2ReachIndex2;
//         lastBike.stack2ReachIndex3 = returnedBike.stack2ReachIndex3;

//         await bikeRepository.save(lastBike);

//         bikeRef.value = lastBike;

//         console.log("seatHeight: ", returnedBike.seatHeight);
//         console.log("seatSetback: ", returnedBike.seatSetback);
//         console.log("seatLength: ", returnedBike.seatLength);
//         console.log("seatDrop: ", returnedBike.seatDrop);
//         console.log("spacerHeight: ", returnedBike.spacerHeight);
//         console.log("stemLength: ", returnedBike.stemLength);
//         console.log("stemAngle: ", returnedBike.stemAngle);
//         console.log("stackMin: ", returnedBike.stackMin);
//         console.log("reachMin: ", returnedBike.reachMin);
//         console.log("stackMax: ", returnedBike.stackMax);
//         console.log("reachMax: ", returnedBike.reachMax);
//         console.log("stack2ReachIndex1: ", returnedBike.stack2ReachIndex1);
//         console.log("stack2ReachIndex2: ", returnedBike.stack2ReachIndex2);
//         console.log("stack2ReachIndex3: ", returnedBike.stack2ReachIndex3);
//     }
//     else {
//         console.log("Error with human or bike params !!!");
//     }

//     //PLEASE DONT TOUCH THIS COMMENT, IT CAN BE NEEED IN THE FUTERE TO DEBUG 
//     //const person = new humanParams(47, 42, 42, 81, 145, 70, 85, 190,0);

//     /*const person = new humanParams(userToUpdate.shankLength,
//      userToUpdate.thighLength,
//      shoeSize,
//      userToUpdate.inseamLength,
//      userToUpdate.shoulderHeight,
//      userToUpdate.armLength,
//      85,
//      userToUpdate.overallHeight,
//      37.5);*/

// });

</script>