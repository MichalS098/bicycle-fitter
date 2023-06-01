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
                    <ion-toolbar>
                        <ion-buttons slot="end">
                            <ion-button @click="minimizeModal()" color="primary" mode="ios" :class="{
                                'opacity-0': isModalMinimized,
                                'opacity-100': !isModalMinimized,
                                'transition-opacity': true
                            }">
                                Close
                            </ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                    <div class="flex flex-col gap-6">
                        <div class="w-full flex items-center justify-between gap-6">
                            <button @click="prevPoint"
                                class="rounded-full bg-neutral-900 px-7 py-3 text-sm font-bold border-solid border-white border-2 focus:text-primary focus:border-primary transition-colors">
                                prev point
                            </button>
                            <button @click="nextPoint"
                                class="rounded-full bg-neutral-900 px-7 py-3 text-sm font-bold border-solid border-white border-2 focus:text-primary focus:border-primary transition-colors">
                                next point
                            </button>
                        </div>
                        <div>
                            <h2 class="fitter-h2 mt-3 mb-6 text-white">
                                Tips for you
                            </h2>
                            <tips-swiper :tips="tips" />
                        </div>
                        <div>
                            <h2 class="fitter-h2 mt-3 mb-6 text-white">
                                Your bike fit
                            </h2>
                            <bikefitting-chart />
                        </div>
                    </div>
                </ion-content>
            </ion-modal>
        </div>
    </ion-page>
</template>
  
<script lang="ts" setup>
import {
    IonPage, useIonRouter, IonModal, IonContent, IonButton, IonButtons, IonToolbar, IonHeader, onIonViewWillLeave, onIonViewWillEnter
} from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { Bike } from '@/entity/Bike';
import { Tip } from '@/entity/Tip';
import { useRoute } from 'vue-router';
import TipsSwiper from '@/components/TipsSwiper.vue';
import { threeDScene } from '@/classes/threeDScene';
import BikeMeasurePopover from '@/components/BikeMeasurePopover.vue';
import BikefittingChart from '@/components/BikefittingChart.vue';

const route = useRoute();
const bike_id = Number(route.params.id);
const bike = ref<Bike | null>();
const tips = ref<Tip[]>([]);
const showModal = ref<boolean>(true);
const router = useIonRouter();
const threeDS = new threeDScene;

/**
 * Bike measure popover options
 */
const measureOptions = [
    {
        title: 'Seat length',
        content: 'From the crossing point of saddle and seatpost to the middle of bar.',
        lengthCm: 0,
    },
    {
        title: 'Seat height',
        content: 'Crank is in extension of seat post, from middle of pedal to crossing point of saddle',
        lengthCm: 0,
    },
    {
        title: 'Drop',
        content: 'Vertical direction of seat length.',
        lengthCm: 0,
    },
    {
        title: 'Setback',
        content: 'From middle of the crank to crossing point of saddle',
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


onMounted(async () => {
    bike.value = await Bike.findOneBy({
        id: bike_id
    })

    if (!bike.value) {
        goToHome();
        return;
    }

    measureOptions[0].lengthCm = bike.value?.seatLength;
    measureOptions[1].lengthCm = bike.value?.seatHeight;
    measureOptions[2].lengthCm = bike.value?.seatDrop;
    measureOptions[3].lengthCm = bike.value?.seatSetback;

    currentBikeMeasureInfo.value = measureOptions[0];

    // TODO: get tips for this specific bike
    tips.value = await Tip.find();

    threeDS.init('#threejs-container');
});



const goToHome = () => {
    router.navigate('/pages/home', 'none', 'replace');
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

function hideBikeMeasurePopover() {
    showingBikeMeasurePopover.value = false;
    defaultBikePosition();
    resetBikeMeasureInfo();
    resetAnimationIndex();
}

function resetBikeMeasureInfo() {
    currentBikeMeasureInfo.value = measureOptions[0];
}

function resetAnimationIndex() {
    animationIndex.value = 0;
}


onIonViewWillEnter(() => {
    showModal.value = true;
});

onIonViewWillLeave(() => {
    // TODO: destroy 3d model here    
    // destroy3DModel();
    resetAnimationIndex();
    resetBikeMeasureInfo();
    hideBikeMeasurePopover();
    showModal.value = false;
    isModalMinimized.value = true;
});
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
</style>