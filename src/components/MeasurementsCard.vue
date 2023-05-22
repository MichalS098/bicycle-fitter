<template>
    <button type="button" @click="goToMeasurePage()" ref="measurementsCard"
        class="measurements-card rounded-3xl w-full flex items-start px-6 py-4 h-full">
        <div class="grid grid-cols-2 w-full gap-1 justify-items-start">
            <h3 class="text-lg xxs:text-xl col-span-2 pb-3 text-left font-bold">
                <span v-if="height && legLength">
                    My measurements
                </span>
                <span v-else>
                    No measurements
                </span>
            </h3>
            <p v-if="!height && !legLength" class="text-white text-sm text-left col-span-2 pr-3">
                Add your measurements to get more accurate results!
            </p>
            <span v-if="height" class="text-white font-bold text-2xl xxs:text-3xl text-left">
                {{ height + unit }}
            </span>
            <span v-if="legLength" class="text-white font-bold text-2xl xxs:text-3xl text-left">
                {{ legLength + unit }}
            </span>
            <span v-if="height" class="text-white text-sm text-left">
                height
            </span>
            <span v-if="legLength" class="text-white text-sm text-left">
                leg length
            </span>
        </div>
        <div class="h-full flex flex-col justify-between gap-4 items-end">
            <ellipsis-horizontal-icon class="h-6 w-6 text-white" />
            <chart-bar-icon class="h-16 w-16 text-white" />
        </div>
    </button>
</template>
<script setup lang="ts">
import {
    useIonRouter,
    createAnimation,
    AnimationBuilder
} from '@ionic/vue';
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline';
import { ChartBarIcon } from '@heroicons/vue/24/solid';
import { onMounted, ref } from 'vue';
import { defineProps, PropType } from 'vue';
import { User } from '@/entity/User';

const props = defineProps({
    user: {
        type: Object as PropType<User>
    }
});

const height = ref<number>(0);
const legLength = ref<number>(0);
const unitSystem = ref<string>('metric');
const unit = ref<string>('cm');
const measurementsCard = ref<HTMLButtonElement>();

onMounted(() => {
    console.log(props.user)
    if (props.user) {
        height.value = props.user.overallHeight;
        legLength.value = props.user.shankLength + props.user.thighLength;
        unitSystem.value = props.user.unitSystem;
        unit.value = unitSystem.value == 'metric' ? 'cm' : 'in';
    }
});

const createMeasurementsCardAnimation: AnimationBuilder = (baseEl: any, opts?: any) => {
    if (measurementsCard.value) {
        return createAnimation()
            .addElement(measurementsCard.value)
            .duration(800)
            .easing('ease-in-out')
            .fill('both')
            .beforeAddWrite(() => {
                document.querySelector('ion-tab-bar')?.classList.add('ion-hide');
            })
            .beforeAddClass('measurements-card-animation')
            .beforeStyles({
                'z-index': '9999',
                'border-radius': '100%',
            })
            .keyframes([
                { offset: 0, scale: '1', background: 'var(--ion-color-secondary-shade)', borderRadius: '50px' },
                { offset: 0.5, scale: '6', background: 'var(--ion-color-secondary-shade)', borderRadius: '100%' },
                { offset: 1, scale: '6', background: 'var(--ion-color-secondary-shade)' },
            ]);
    }
    return createAnimation();
};

const router = useIonRouter();
const goToMeasurePage = () => {
    router.navigate('/pages/profile/measurements', 'none', 'replace', createMeasurementsCardAnimation);
};
</script>
<style scoped>
.measurements-card {
    background: linear-gradient(135deg, var(--ion-color-secondary-shade) 0%, transparent 100%) var(--ion-color-secondary-tint);
    transition: all ease-in-out 300ms;
}

.measurements-card:hover,
.measurements-card:focus {
    background-color: var(--ion-color-secondary-shade);
    scale: 1.03;
    transform: translateY(-3px);
}

.measurements-card-animation>* {
    display: none;
}
</style>
