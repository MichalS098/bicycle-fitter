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
                <li>seatHeigth: 0</li>
                <li>seatSetback: 0</li>
                <li>seatLength: 0</li>
                <li>seatDrop: 0</li>
                <li>spacerHeigth: 0</li> <!-- dla rama-siodelko -->
                <li>stemLength: 0</li> <!-- dla wspornika (ger. Vorbau) -->
                <li>stemAngle: 0</li>
                <li>stackMin: 0</li>
                <li>reachMin: 0</li>
                <li>stackMax: 0</li>
                <li> reachMax: 0</li>
                <li>stack2ReachIndex1: 0</li> 
                <li>stack2ReachIndex2: 0</li> 
                <li>stack2ReachIndex3: 0</li>
            </ul>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import {
    IonPage, IonContent, useIonRouter
} from '@ionic/vue';
import { onMounted, ref } from 'vue';

onMounted(async () => {
    
    console.log("Bike Fitting!")
   
});

const router = useIonRouter();

const goToHome = () => {
    router.navigate('/pages/home', 'none', 'replace');
};

</script>