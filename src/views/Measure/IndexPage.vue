<template>
    <ion-page>
        <ion-content :fullscreen="true" class="relative">
            <video class="hidden" ref="video"></video>
            <canvas class="absolute inset-0 w-full my-auto" ref="canvas"></canvas>

            <!-- <div class=" inset-0 w-full flex items-start justify-center pt-12 pb-1">
                <div ref="shoulderHeight"> </div>
            </div>
            <div class=" inset-0 w-full flex items-end justify-center p-1">
                <div ref="footLength"> </div>
            </div>
            <div class=" inset-0 w-full flex items-start justify-center p-1">
                <div ref="armLength"> </div>
            </div>
            <div class=" inset-0 w-full flex items-end justify-center p-1">
                <div ref="shankLength"> </div>
            </div>
            <div class=" inset-0 w-full flex items-center justify-center p-1">
                <div ref="thighLength"> </div>
            </div>
            <div class=" inset-0 w-full flex items-center justify-center p-1">
                <div ref="inseamLength"> </div>
            </div> -->

            <div class="absolute bottom-0 left-0 w-full p-4 flex items-center justify-center flex-col gap-1">
                <div class="flex items-center justify-evenly w-full">
                    <ion-button fill="clear" size="large">
                        <ArrowUturnLeftIcon class="w-6 h-6 text-white" />
                    </ion-button>
                    <button class="rounded-full w-16 h-16 p-1 bg-white flex items-center justify-center">
                        <div class="w-full h-full bg-[#E48C56] rounded-full">
                        </div>
                    </button>
                    <ion-button fill="clear" size="large">
                        <PhotoIcon class="w-6 h-6 text-white" />
                    </ion-button>
                </div>
                <div class="flex items-center justify-center gap-1 w-full">
                    <ion-button fill="clear" size="large">
                        <ion-icon class="text-white" :icon="flashOutline"></ion-icon>
                    </ion-button>
                    <ion-button fill="clear" size="large">
                        <ion-icon class="text-white" :icon="refreshOutline"></ion-icon>
                    </ion-button>
                    <ion-button fill="clear" size="large">
                        <ion-icon class="text-white" :icon="stopwatchOutline"></ion-icon>
                    </ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts" setup>
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import { ref, onMounted } from "vue";
import useMediapipe from '@/composables/useMediapipe';
import { Camera } from '@mediapipe/camera_utils';
import { ArrowUturnLeftIcon, PhotoIcon } from '@heroicons/vue/24/outline';
import { refreshOutline, stopwatchOutline, flashOutline } from 'ionicons/icons';
import { globalCalcMediaPipe } from '@/functions/mediapipeCalculatedHumanParams';

const video = ref<HTMLVideoElement>();
const canvas = ref<HTMLCanvasElement>();
const camera = ref<Camera>();
const shoulderHeight = ref<HTMLDivElement>();
const footLength = ref<HTMLDivElement>();
const armLength = ref<HTMLDivElement>();
const shankLength = ref<HTMLDivElement>();
const thighLength = ref<HTMLDivElement>();
const inseamLength = ref<HTMLDivElement>();

let measuringProgress = 0;
let shoulderHeightResult = 0.0, footLengthResult = 0.0, armLengthResult = 0.0, shankLengthResult = 0.0, thighLengthResult = 0.0, inseamLengthResult = 0.0;
const shoulderHeightTable = new Array(60);
const footLengthTable     = new Array(60);
const armLengthTable      = new Array(60);
const shankLengthTable    = new Array(60);
const thighLengthTable    = new Array(60);
const inseamLengthTable   = new Array(60);

onMounted(async () => {
    if (video.value === undefined || canvas.value === undefined) {
        return;
    }

    // 
    
    setupMediaPipe(video.value, canvas.value);
});


const setupMediaPipe = (video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
    const { pose, drawResults } = useMediapipe();

    pose.onResults((results) => {
        // zapisac do jakiejs tabeli
        // tutaj obliczyc srednia

        // jesli wszystkie punkty nie sa widoczne to niech
        // apka wyswietli jakas informacje na ekranie 

        // showInfoNotVisible.value = true;

        

        if (results.poseLandmarks !== undefined) {
            drawResults(results, canvas);
            const [shoulderHeightTemp, footLengthTemp, armLengthTemp, shankLengthTemp, thighLengthTemp, inseamLengthTemp] = globalCalcMediaPipe(results);


            // to jest tylko do wyświetlenia na ekranie na biezaco
            // shoulderHeight.value.innerHTML = shoulderHeightTemp.toString();
            // shoulderHeight.value.style.color = 'white';
            // shoulderHeight.value.style.fontSize = '1rem';
            
            // footLength.value.innerHTML = footLengthTemp.toString();
            // footLength.value.style.color = 'white';
            // footLength.value.style.fontSize = '1rem';
            
            // armLength.value.innerHTML = armLengthTemp.toString();
            // armLength.value.style.color = 'white';
            // armLength.value.style.fontSize = '1rem';
            
            // shankLength.value.innerHTML = shankLengthTemp.toString();
            // shankLength.value.style.color = 'white';
            // shankLength.value.style.fontSize = '1rem';

            // thighLength.value.innerHTML = thighLengthTemp.toString();
            // thighLength.value.style.color = 'white';
            // thighLength.value.style.fontSize = '1rem';
        
            // inseamLength.value.innerHTML = inseamLengthTemp.toString();
            // inseamLength.value.style.color = 'white';
            // inseamLength.value.style.fontSize = '1rem';



            shoulderHeightTable[measuringProgress] = shoulderHeightTemp;
            footLengthTable[measuringProgress]     = footLengthTemp;
            armLengthTable[measuringProgress]      = armLengthTemp;
            shankLengthTable[measuringProgress]    = shankLengthTemp;
            thighLengthTable[measuringProgress]    = thighLengthTemp;
            inseamLengthTable[measuringProgress]   = inseamLengthTemp;            

            if (measuringProgress === 59) {
                
                // const tableValues = [4, 2, 9, 7, 5, 3, 1];
                // console.log(median(tableValues)); // Output: 4


                shoulderHeightResult = median(shoulderHeightTable);
                footLengthResult = median(footLengthTable);
                armLengthResult = median(armLengthTable);
                shankLengthResult  = median(shankLengthTable);
                thighLengthResult = median(thighLengthTable);
                inseamLengthResult = median(inseamLengthTable);

                console.log("shoulderHeightResult:", shoulderHeightResult);
                console.log("footLengthResult:", footLengthResult);
                console.log("armLengthResult:", armLengthResult);
                console.log("shankLengthResult:", shankLengthResult);
                console.log("thighLengthResult:", thighLengthResult);
                console.log("inseamLengthResult:", inseamLengthResult);


                // measuringProgress = 0;
                measureDone();
            } else {
                measuringProgress++;

                // console.log all tables:
                console.log("shoulderHeightTable:", shoulderHeightTable);
                console.log("footLengthTable:", footLengthTable);
                console.log("armLengthTable:", armLengthTable);
                console.log("shankLengthTable:", shankLengthTable);
                console.log("thighLengthTable:", thighLengthTable);
                console.log("inseamLengthTable:", inseamLengthTable);
            }
            
        } else {
            measuringProgress = 0;
        }
        // console.log(measuringProgress);
    }
);

function median(arr: number[]): number {
  // Sort the array in ascending order
  const sortedArr = arr.slice().sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedArr.length / 2);

  // If the array has an odd number of elements, return the middle value
  if (sortedArr.length % 2 !== 0) {
    return sortedArr[middleIndex];
  }

  // If the array has an even number of elements, return the average of the two middle values
  const middleValue1 = sortedArr[middleIndex - 1];
  const middleValue2 = sortedArr[middleIndex];
  return (middleValue1 + middleValue2) / 2;
}



const measureDone = () => {
    // wyswietlic wyniki
}

    new Camera(video, {
        onFrame: async () => {            
            await pose.send({ image: video });
        }
    }).start();
}
</script>