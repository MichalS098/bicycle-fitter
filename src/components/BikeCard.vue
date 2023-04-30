<template>
    <div
        class="w-full aspect-[1.54] rounded-[30px] bg-gradient-to-br from-primary to-primary-tint p-5 relative flex flex-col justify-between items-start overflow-hidden">
        <div>
            <h2 class="text-3xl xs:text-4xl text-white font-bold">
                {{ bike.brand ?? 'No brand' }}
            </h2>
            <p class="text-base xs:text-lg text-white">
                {{ bike.model ?? 'No model' }}
            </p>
        </div>
        <div class="w-[45%]">
            <ion-progress-bar class="h-4 rounded-full" color="tertiary" :value="0.3"></ion-progress-bar>
        </div>
        <img src="@/../resources/images/bike.png" alt="realistic bike"
            class="absolute object-contain top-0 h-[115%] right-[-10px] " />
    </div>
</template>
<script setup lang="ts">
import { IonProgressBar } from '@ionic/vue';
import { Bike } from '@/entity/Bike';

const props = defineProps({
    bike: {
        type: Bike,
        required: true
    }
});
</script>
