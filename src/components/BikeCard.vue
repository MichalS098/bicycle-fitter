<template>
    <button type="button" :class="colorClass" @click="goToBike()" ref="bikeButton"
        class="bike-button w-full aspect-[1.54] rounded-[30px] p-5 sm:p-6 md:p-8 lg:p-12 relative flex flex-col justify-between items-start overflow-hidden z-[1]">
        <div>
            <h2 class="text-3xl xs:text-4xl text-white font-bold text-left">
                {{ bike.brand ?? 'No brand' }}
            </h2>
            <p class="text-base xs:text-lg text-white text-left">
                {{ bike.model ?? 'No model' }}
            </p>
        </div>
        <div class="flex flex-row gap-2 relative z-[1]">
            <span v-if="bike.type" class="bg-neutral-900/50 px-3 py-1 text-xs rounded-full capitalize">
                {{ bike.type }}            
            </span>                          
            <span v-if="bike.style" class="bg-neutral-900/50 px-3 py-1 text-xs rounded-full capitalize">
                {{ bike.style }}            
            </span>                                      
        </div>
        <img src="@/../resources/images/bike.png" alt="realistic bike"
            class="absolute object-contain top-[-25%] h-[145%] right-[-25%] z-[0]" />
    </button>
</template>
<script setup lang="ts">
import {
    useIonRouter, createAnimation, AnimationBuilder
} from '@ionic/vue';
import { Bike } from '@/entity/Bike';
import { defineProps, ref } from 'vue';

const bikeButton = ref<HTMLButtonElement | null>(null);
const goToBikeAnimation: AnimationBuilder = () => {
    if (bikeButton.value) {
        return createAnimation()
            .addElement(bikeButton.value)
            .duration(800)
            .easing('ease-in-out')
            .fill('both')
            .beforeAddWrite(() => {
                document.querySelector('ion-tab-bar')?.classList.add('ion-hide');
            })
            .beforeAddClass('bike-button-animation')
            .beforeStyles({
                'z-index': '9999',
                'border-radius': '100%',
            })
            .keyframes([
                { offset: 0, scale: '1', background: 'var(--ion-color-primary-shade)', borderRadius: '50px' },
                { offset: 0.5, scale: '6', background: 'var(--ion-color-primary-shade)', borderRadius: '100%' },
                { offset: 1, scale: '6', background: '#000' },
            ]);
    }
    return createAnimation();
};

const props = defineProps({
    bike: {
        type: Bike,
        required: true
    },
    color: {
        type: String,
        default: 'primary'
    }
});

const router = useIonRouter();
const goToBike = () => {
    router.navigate('/bikes/' + props.bike.id, 'none', 'replace', goToBikeAnimation);
};

let colorClass = '';
switch (props.color) {
    case 'primary':
        colorClass = 'from-primary-shade to-primary-tint';
        break;
    case 'secondary':
        colorClass = 'from-secondary-shade to-secondary-tint';
        break;
    case 'tertiary':
        colorClass = 'from-tertiary-shade to-tertiary-tint';
        break;
    case 'success':
        colorClass = 'from-success-shade to-success-tint';
        break;
    case 'warning':
        colorClass = 'from-warning-shade to-warning-tint';
        break;
    case 'danger':
        colorClass = 'from-danger-shade to-danger-tint';
        break;
    default:
        colorClass = 'from-primary-shade to-primary-tint';
        break;
}
</script>

<style scoped>
.bike-button {
    background: linear-gradient(135deg, var(--ion-color-primary-shade) 0%, transparent 100%) var(--ion-color-primary-tint);
    transition: all ease-in-out 300ms;
}

.bike-button:hover,
.bike-button:focus {
    background-color: var(--ion-color-primary-shade);
    scale: 1.03;
    transform: translateY(-3px);
}

.bike-button-animation>* {
    display: none;
}
</style>