<template>
    <ion-page>
        <ion-content :fullscreen="true" class="relative">
            <video playsinline="true" muted="true" loop="true" class="hidden" ref="video"
                style="position: absolute; z-index: -1;" ></video>
            <canvas class="absolute inset-0 w-full my-auto pd-15" ref="canvas"></canvas>

            <div class="fixed w-full h-full top-0 left-0 bg-transparent">
                <div class="absolute top-3/4 text-center text-base">Imagine this is a bike</div>
            </div>
            
            <transition>
                <div v-show="!allBodyPointsVisible"
                    class="absolute top-6 left-3 right-3 rounded-2xl bg-[#1f1f1f] border-gray-900 p-3 flex gap-3 items-start shadow-lg overflow-hidden">
                    <ion-icon :icon="alertCircleOutline" class="text-red-400 h-12 w-12 shrink-0"></ion-icon>
                    <div class="flex flex-col gap-3">
                        <h2 class="text-red-400 text-xl font-bold">
                            Some body points <br> are not visible.
                        </h2>
                        <p class="text-sm">
                            Please, make sure that you are in a well lit room and that your whole body is visible.
                        </p>
                    </div>
                </div>
                
            </transition>

            <ion-button @click="if (sideVisible=='right') sideVisible='left'; else sideVisible='right';">
                    current: {{ sideVisible }}
            </ion-button>
            
            <!--5s coundownd-->
            <transition>
                <div v-show="allBodyPointsVisible && counter > 0"
                    class="absolute bottom-6 left-3 right-3 rounded-2xl bg-secondary border-gray-900 p-3 flex gap-3 items-start shadow-lg overflow-hidden">
                    <ion-icon :icon="hourglassOutline" class="text-white h-8 w-16"></ion-icon>
                    <div class="text-4xl">
                        {{counter}}
                    </div>
                </div>
            </transition>

            <transition>
                <div v-show="allBodyPointsVisible && counter == 0"
                    class="absolute bottom-6 left-3 right-3 h-10 rounded-2xl bg-secondary border-gray-900 p-3 flex gap-3 items-start shadow-lg overflow-hidden">
                    <ion-progress-bar :value="measuringProgress / (samples)" class="w-full h-full" color="light"></ion-progress-bar>
                </div>
            </transition>

        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, IonIcon, IonProgressBar, IonButton } from '@ionic/vue';
import { ref, onMounted, Transition, watch, WatchOptions } from "vue";
import useMediapipe from '@/composables/useMediapipe';
import { Camera } from '@mediapipe/camera_utils';
import { alertCircleOutline, hourglassOutline, options } from 'ionicons/icons';
import { getBodyAnglesFromMediapipeResults, BodyAnglesFromMediapipe, BodyAnglesMaxMin, getMaxMinEveryAngle } from '@/functions/mediapipeCalculatedHumanParams';
import { useIonRouter } from '@ionic/vue';
import { getUserFromDatabase } from '@/helpers/helpersDataBase'
import { areAllBodyPointsVisible, areAllSideBodyPointsVisible, getAllRelevantRightBodyPointIndexes, getAllRelevantLeftBodyPointIndexes } from '@/helpers/mediapipeHelpers';
import MeasureFinishedModal from './MeasureFinishedModal.vue';
import { useRoute } from 'vue-router';
import { Bike } from '@/entity/Bike';
import { Angles } from '@/entity/Angles';

const router = useIonRouter();
const video = ref<HTMLVideoElement>();
const canvas = ref<HTMLCanvasElement>();
const camera = ref<Camera>();

const measuringDone = ref(false);
const allBodyPointsVisible = ref(false);
const measuringProgress = ref(0);
const counter = ref(5);
const sideVisible = ref<string>('left')

const route = useRoute(); //shouldnt we use IonicRouter?
const bike_id = Number(route.params.id);
const bike = ref<Bike | null>();

const samples = 60*5;

const bodyAngles = ref<BodyAnglesMaxMin>({
    footFloorAngleMax: 0,
    footFloorAngleMin: 0,
    thighShankAngleMax: 0,
    thighShankAngleMin: 0,
    torsoFloorAngleMax: 0,
    torsoFloorAngleMin: 0,
    torsoBicepAngleMax: 0,
    torsoBicepAngleMin: 0,
    bicepForearmAngleMax: 0,
    bicepForearmAngleMin: 0,
});
const bodyAnglesArray: BodyAnglesFromMediapipe[] = new Array(samples);


onMounted(async () => {
    if (video.value === undefined || canvas.value === undefined) {
        return;
    }
    setupMediaPipe(video.value, canvas.value);
});

const measureDone = async () => {
    measuringDone.value = true;
    const angles = new Angles();

    bike.value = await Bike.findOneBy({
        id: bike_id
    })
    console.log("bike: ", bike.value);

    console.log("footFlootAngleMax: ", angles.footFloorAngleMax = bodyAngles.value.footFloorAngleMax)
    console.log("footFloorAngleMin: ", angles.footFloorAngleMin = bodyAngles.value.footFloorAngleMin)
    console.log("torsoFloorAngleMax: ", angles.torsoFloorAngleMax = bodyAngles.value.torsoFloorAngleMax)
    console.log("torsoFloorAngleMin: ", angles.torsoFloorAngleMin = bodyAngles.value.torsoFloorAngleMin)
    console.log("thighShankAngleMax: ", angles.thighShankAngleMax = bodyAngles.value.thighShankAngleMax) 
    console.log("thighShankAngleMin: ", angles.thighShankAngleMin = bodyAngles.value.thighShankAngleMin) 
    console.log("torsoBicepAngleMax: ", angles.torsoBicepAngleMax = bodyAngles.value.torsoBicepAngleMax)
    console.log("torsoBicepAngleMin: ", angles.torsoBicepAngleMin = bodyAngles.value.torsoBicepAngleMin)
    console.log("bicepForearmAngleMax: ", angles.bicepForearmAngleMax = bodyAngles.value.bicepForearmAngleMax)
    console.log("bicepForearmAngleMin: ", angles.bicepForearmAngleMin = bodyAngles.value.bicepForearmAngleMin)

    if (bike.value != null){
        angles.footFloorAngleMax = bodyAngles.value.footFloorAngleMax
        angles.footFloorAngleMin = bodyAngles.value.footFloorAngleMin
        angles.thighShankAngleMax = bodyAngles.value.thighShankAngleMax
        angles.thighShankAngleMin = bodyAngles.value.thighShankAngleMin
        angles.torsoFloorAngleMax = bodyAngles.value.torsoFloorAngleMax
        angles.torsoFloorAngleMin = bodyAngles.value.torsoFloorAngleMin
        angles.torsoBicepAngleMax = bodyAngles.value.torsoBicepAngleMax
        angles.torsoBicepAngleMin = bodyAngles.value.torsoBicepAngleMin
        angles.bicepForearmAngleMax = bodyAngles.value.bicepForearmAngleMax
        angles.bicepForearmAngleMin = bodyAngles.value.bicepForearmAngleMin
        angles.crankAngle = 0 // TODO: It doesnt make sense to track the minimum and maximum angle of the crank
        // getMaxMinEveryAngle() doesnt calculate it either, remove later.
        angles.bike = bike.value
        await angles.save();
    
        router.navigate('/bikes/' + bike.value.id, 'none', 'replace')
    }
}

const setupMediaPipe = (video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
    const { pose, drawResults } = useMediapipe();

    pose.onResults((results) => {
        drawResults(results, canvas);

        if (results.poseLandmarks !== undefined){
            if (areAllSideBodyPointsVisible(results.poseLandmarks, sideVisible.value)) { 
                allBodyPointsVisible.value = true;

                if (counter.value == 0){
                    if (measuringProgress.value > samples){
                        measuringDone.value = true
                        camera.value?.stop()
                        bodyAngles.value = getMaxMinEveryAngle(bodyAnglesArray)
                        measureDone()
                    } 
                    else{
                        bodyAnglesArray[measuringProgress.value] = getBodyAnglesFromMediapipeResults(results, sideVisible.value) 
                    }
                    measuringProgress.value++
                }
            } 
            else {
                allBodyPointsVisible.value = false;
                measuringProgress.value = 0;
            }
        }
        else {
            allBodyPointsVisible.value = false;
            measuringProgress.value = 0;
        }
    }
    );

    camera.value = new Camera(video, {
        onFrame: async () => {
            await pose.send({ image: video });
        }
    })
    camera.value?.start();
}

let timer = 0;
//cur = current
watch( [allBodyPointsVisible, counter], function([curVis, curCounter], [oldVis, oldCounter]){
    if (timer != 0) clearTimeout(timer);
    if (curVis && curCounter > 0){
        timer = setTimeout(() => {
            counter.value--;
        }, 1000);
    }
    else if (!curVis){
        counter.value = 5;
    }
})

// let timer = 0;
// function countDown(): void{
//     if (timer != 0) clearTimeout(timer);
//     if (counter.value > 0) {
//         timer = setTimeout(() => {
//             counter.value--;
//             countDown()
//         }, 1000)
//     }
// }
// watch( allBodyPointsVisible, function(curVis, oldVis){
//     if (curVis){
//         countDown()
//     }
//     else if (!curVis){
//         counter.value = 5;
//     }
// })




</script>