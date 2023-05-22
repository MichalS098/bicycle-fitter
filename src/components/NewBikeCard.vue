<template>
    <button type="button" @click="create" ref="bikeButton"
        class="bike-button w-full aspect-[1.54] rounded-[30px] p-5 sm:p-6 md:p-8 lg:p-12 relative flex flex-col justify-between items-start overflow-hidden">
        <div>
            <h2 class="text-3xl xs:text-4xl text-white font-bold">
                New bike
            </h2>
            <p class="text-left text-base xs:text-lg text-white">Add new bike</p>
        </div>
        <plus-icon class="w-10 h-10 text-white" />
        <img src="@/../resources/images/bike.png" alt="realistic bike"
            class="absolute object-contain top-[-25%] h-[145%] right-[-25%]" />
    </button>
</template>
<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline';
import {
    useIonRouter,
    createAnimation,
    AnimationBuilder
} from '@ionic/vue';
import { ref } from 'vue';

const bikeButton = ref<HTMLButtonElement | null>(null);
const createBikeAnimation: AnimationBuilder = (baseEl: any, opts?: any) => {
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
                { offset: 0, scale: '1', background: 'var(--ion-color-tertiary-shade)', borderRadius: '50px' },
                { offset: 0.5, scale: '6', background: 'var(--ion-color-tertiary-shade)', borderRadius: '100%' },
                { offset: 1, scale: '6', background: '#000' },
            ]);
    }
    return createAnimation();
};

const router = useIonRouter();
const create = () => {
    router.navigate('/new-bike-steps', 'none', 'replace', createBikeAnimation);
};
</script>

<style scoped>
.bike-button {
    background: linear-gradient(135deg, var(--ion-color-tertiary-shade) 0%, transparent 100%) var(--ion-color-tertiary-tint);
    transition: all ease-in-out 300ms;
}

.bike-button:hover,
.bike-button:focus {
    background-color: var(--ion-color-tertiary-shade);
    scale: 1.03;
    transform: translateY(-3px);
}

.bike-button-animation>* {
    display: none;
}
</style>