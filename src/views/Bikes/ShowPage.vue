<template>
    <ion-page>
        <ion-header :translucent="true" class="bikefitter-header">
            <!-- DO NOT REMOVE THIS DIV -->
            <div>
            </div>
        </ion-header>
        <div class="h-screen w-screen bg-black relative">
            <div id="threejs-container" class="w-full h-full"></div>

            <div class="absolute top-0 left-0 right-0 w-full px-6 py-6 xxs:py-12 xs:py-24 z-[10] flex justify-between">
                <div>
                    <h1 class="text-4xl xs:text-5xl text-white font-bold">
                        {{ bike?.brand ?? 'No brand' }}
                    </h1>
                    <h2 class="text-base xs:text-lg text-white">
                        {{ bike?.model ?? 'No model' }}
                    </h2>
                </div>
                <x-mark-icon class="w-8 h-8 text-white" @click="goToHome" />
            </div>


            <BikeMeasurePopover :show="showingBikeMeasurePopover" :bikeMeasureInfo="currentBikeMeasureInfo"
                @close="hideBikeMeasurePopover()" />


            <ion-modal ref="modal" :is-open="showModal" :breakpoints="[0.25, 1]" :initial-breakpoint="0.25"
                :backdrop-dismiss="true" :backdrop-breakpoint="1" :swipe-to-close="true" :keyboard-close="true"
                :showBackdrop="true" :animated="true" @ionBreakpointDidChange="ionBreakpointChange()">
                <ion-content class="ion-padding">
                    <div class="flex flex-col gap-6">
                        <div class="w-full h-[72px] flex items-center justify-between">
                            <div v-if="!isModalMinimized" class="w-full flex items-center justify-between">
                                <button @click="goToHome()" type="button" class="text-primary">
                                    Home
                                </button>
                                <button @click="minimizeModal()" type="button" class="text-primary">
                                    Close
                                </button>
                            </div>
                            <div class="w-full flex items-center justify-between gap-6" v-if="isModalMinimized">
                                <button @click="prevPoint"
                                    class="rounded-full bg-neutral-900 px-7 py-3 text-sm font-bold border-solid border-white border-2 focus:text-primary focus:border-primary transition-colors">
                                    prev point
                                </button>
                                <button @click="nextPoint"
                                    class="rounded-full bg-neutral-900 px-7 py-3 text-sm font-bold border-solid border-white border-2 focus:text-primary focus:border-primary transition-colors">
                                    next point
                                </button>
                            </div>
                        </div>
                        <div>
                            <h2 class="fitter-h2 mt-3 mb-3 text-white">
                                Tips for you
                            </h2>
                            <tips-swiper :tips="tips" />
                        </div>
                        <div>
                            <h2 class="fitter-h2 mt-3 mb-3 text-white">
                                Your bike fit
                            </h2>
                            <angle-bar-chart :angles="anglesFirst" />
                        </div>
                        <div>
                            <h2 class="fitter-h2 mt-3 mb-3 text-white">
                                Measure on bike
                            </h2>
                            <button type="button" @click="goToAngleMeasure()"
                                class="p-5 grid grid-cols-3 gap-3 bg-neutral-800 rounded-[30px]">
                                <div class="col-span-2 flex flex-col gap-1 items-start justify-start text-left">
                                    <h3 class="text-white font-bold text-2xl">
                                        Bike measurement
                                    </h3>
                                    <p class="text-sm">
                                        To make our recommendations
                                        as accurate as possible, we suggest
                                        measuring yourself while cycling.
                                    </p>
                                </div>
                                <svg class="w-full text-neutral-300 self-center" xmlns="http://www.w3.org/2000/svg"
                                    width="90" height="50" viewBox="0 0 90 50" fill="none">
                                    <path
                                        d="M70.0887 12.0362C67.5001 12.0362 65.0313 12.5578 62.7807 13.5002L57.399 3.05845H64.9208C65.7368 3.05845 66.4006 3.72234 66.4006 4.53834C66.4006 5.35433 65.7368 6.01822 64.9208 6.01822H63.3159C62.4711 6.01822 61.7867 6.70291 61.7867 7.54745C61.7867 8.39199 62.4711 9.07667 63.3159 9.07667H64.9208C67.4232 9.07667 69.4591 7.04076 69.4591 4.53834C69.4591 2.03591 67.4234 0 64.9208 0H54.8907C54.3575 0 53.8626 0.277912 53.5849 0.733213C53.3074 1.18851 53.287 1.75576 53.5313 2.22982L56.2074 7.42246H34.137L31.9105 3.05845H35.4316C36.2763 3.05845 36.9608 2.37377 36.9608 1.52923C36.9608 0.684686 36.2763 0 35.4316 0H25.4013C24.5565 0 23.872 0.684686 23.872 1.52923C23.872 2.37377 24.5565 3.05845 25.4013 3.05845H28.4768L31.4488 8.88338L27.9557 14.2954C25.282 12.8549 22.226 12.0362 18.982 12.0362C8.51534 12.0362 0 20.5514 0 31.018C0 41.4847 8.51534 50 18.982 50C28.9338 50 37.1209 42.3015 37.9022 32.5472H42.3893L40.6462 38.2192H39.6426C38.7979 38.2192 38.1134 38.9039 38.1134 39.7485C38.1134 40.593 38.7979 41.2777 39.6426 41.2777H45.1479C45.9926 41.2777 46.6771 40.593 46.6771 39.7485C46.6771 38.9039 45.9926 38.2192 45.1479 38.2192H43.8458L45.858 31.6713L58.5824 12.0305L60.0646 14.9061C54.6904 18.2618 51.1067 24.2289 51.1067 31.018C51.1067 41.4847 59.6221 50 70.0889 50C80.5556 50 89.0709 41.4847 89.0709 31.018C89.0707 20.5514 80.5554 12.0362 70.0887 12.0362ZM33.056 12.0332L41.9618 29.4888H37.902C37.4612 23.9866 34.6637 19.1394 30.5223 15.9584L33.056 12.0332ZM34.8305 29.4888H21.7892L28.8565 18.5397C32.1615 21.1608 34.4066 25.0618 34.8305 29.4888ZM18.982 46.9415C10.2016 46.9415 3.05845 39.7984 3.05845 31.018C3.05845 22.2378 10.2016 15.0945 18.982 15.0945C21.6151 15.0945 24.0988 15.7408 26.289 16.8772L17.697 30.1886C17.3934 30.659 17.3712 31.2578 17.6391 31.7494C17.9068 32.241 18.4221 32.547 18.982 32.547H34.8305C34.0581 40.6126 27.2463 46.9415 18.982 46.9415ZM44.6165 27.9622L35.6974 10.4807H55.9422L44.6165 27.9622ZM70.0887 46.9415C61.3083 46.9415 54.165 39.7982 54.165 31.018C54.165 25.4113 57.0803 20.4757 61.4723 17.6377L68.7294 31.7186C69.0009 32.2453 69.5356 32.5474 70.09 32.5474C70.3259 32.5474 70.5652 32.4926 70.7893 32.3772C71.5403 31.9904 71.8351 31.0682 71.4481 30.3172L64.1888 16.2322C66.0149 15.5011 68.0045 15.0943 70.0887 15.0943C78.8691 15.0943 86.0123 22.2376 86.0123 31.0178C86.0123 39.7984 78.8691 46.9415 70.0887 46.9415Z"
                                        fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </ion-content>
            </ion-modal>
        </div>
    </ion-page>
</template>
  
<script lang="ts" setup>
import {
    IonPage, useIonRouter, IonModal, IonContent, IonButton, IonHeader, onIonViewWillLeave, onIonViewWillEnter
} from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { Bike } from '@/entity/Bike';
import { Tip } from '@/entity/Tip';
import { useRoute } from 'vue-router';
import TipsSwiper from '@/components/TipsSwiper.vue';
import { threeDScene } from '@/classes/threeDScene';
import BikeMeasurePopover from '@/components/BikeMeasurePopover.vue';
import AngleBarChart from '@/components/AngleBarChart.vue';
import { Angles } from '@/entity/Angles';

const route = useRoute();
const bike_id = Number(route.params.id);
const bike = ref<Bike | null>();
const tips = ref<Tip[]>([]);
const showModal = ref<boolean>(true);
const router = useIonRouter();
const threeDS = new threeDScene;
const anglesFirst = ref<Angles | null>(null);

/**
 * Bike measure popover options
 */
const measureOptions = [
    {
        title: 'Reach',
        content: 'From the crossing point of saddle and seatpost to the middle of bar.',
        lengthCm: 0,
    },
    {
        title: 'Seat height',
        content: 'Crank is in extension of seat post, from middle of pedal to crossing point of saddle',
        lengthCm: 0,
    },
    {
        title: 'Setback',
        content: 'From middle of the crank to crossing point of saddle',
        lengthCm: 0
    },
    {
        title: 'Drop',
        content: 'Vertical direction of seat length.',
        lengthCm: 0,
    }
]


const currentBikeMeasureInfo = ref<{
    title: string,
    content: string,
    lengthCm: number,
}>({
    title: '',
    content: '',
    lengthCm: 0,
});
const showingBikeMeasurePopover = ref<boolean>(false);

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

    if (!bike.value) {
        goToHome();
        return;
    }

    anglesFirst.value = await Angles.findOneBy({
        bike: bike.value
    });

    measureOptions[0].lengthCm = bike.value?.seatLength;
    measureOptions[1].lengthCm = bike.value?.seatHeight;
    measureOptions[2].lengthCm = bike.value?.seatSetback;
    measureOptions[3].lengthCm = bike.value?.seatDrop;

    currentBikeMeasureInfo.value = measureOptions[0];

    // TODO: get tips for this specific bike
    tips.value = await Tip.find();
    console.log(threeDS);
    if (!threeDS.isInitialized()) {
        // console.log("threeDS is not initialized, creating new instance")        
        threeDS.init('#threejs-container');
        // threeDS.createAnimation(threeDS.bikeModelPoints.handleBarGrip, threeDS.bikeModelPoints.handleBar, 2);
        // threeDS.drawCylinderBetweenPoints(threeDS.bikeModelPoints.handleBar, threeDS.bikeModelPoints.handleBarGrip);
    }
});



const goToHome = () => {
    router.navigate('/pages/home', 'back', 'replace');
};

const modal = ref<typeof IonModal>();
const isModalMinimized = ref<boolean>(true);

const minimizeModal = () => {
    if (modal.value) {
        modal.value.$el.setCurrentBreakpoint(0.25);
    }
}

const ionBreakpointChange = () => {
    if (modal.value?.$el.currentBreakpoint == 1) {
        isModalMinimized.value = false;
    } else {
        isModalMinimized.value = true;
    }
}


const animationIndex = ref<number>(0);
function prevPoint() {
    if (animationIndex.value == 0) {
        animationIndex.value = 3;
    }
    else {
        animationIndex.value--;
    }
    threeDS.createNextAnimation(animationIndex.value, 1.5);

    showBikeMeasurePopover(
        measureOptions[animationIndex.value].title,
        measureOptions[animationIndex.value].content,
        measureOptions[animationIndex.value].lengthCm
    );
}

function defaultBikePosition() {      // Execute this when you close the window with bike param info
    threeDS.createDefaultCameraPozAnimation();
}

function nextPoint() {
    if (animationIndex.value == 3) {
        animationIndex.value = 0;
    }
    else {
        animationIndex.value++;
    }
    threeDS.createNextAnimation(animationIndex.value, 1.5);

    showBikeMeasurePopover(
        measureOptions[animationIndex.value].title,
        measureOptions[animationIndex.value].content,
        measureOptions[animationIndex.value].lengthCm
    );
}


function showBikeMeasurePopover(title: string, content: string, lengthCm: number) {
    showingBikeMeasurePopover.value = true;
    currentBikeMeasureInfo.value = {
        title,
        content,
        lengthCm,
    };
}


onIonViewWillEnter(() => {
    showModal.value = true;
});

onIonViewWillLeave(() => {
    showModal.value = false;
    isModalMinimized.value = true;
    hideBikeMeasurePopover();
});

function resetBikeMeasureInfo() {
    currentBikeMeasureInfo.value = measureOptions[0];
}

function resetAnimationIndex() {
    animationIndex.value = 0;
}

function hideBikeMeasurePopover() {
    showingBikeMeasurePopover.value = false;
    defaultBikePosition();
    resetBikeMeasureInfo();
    resetAnimationIndex();
}
</script>


<style  scoped>
ion-toolbar {
    --background: transparent;
}

ion-header {
    --background: transparent;
    --border-color: transparent;
    padding-top: var(--ion-safe-area-top, 0);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>