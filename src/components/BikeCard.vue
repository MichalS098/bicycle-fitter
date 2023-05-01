<template>
    <div :class="colorClass"
        class="w-full aspect-[1.54] rounded-[30px] bg-gradient-to-br p-5 sm:p-6 md:p-8 lg:p-12 relative flex flex-col justify-between items-start overflow-hidden">
        <div>
            <h2 class="text-3xl xs:text-4xl text-white font-bold">
                {{ bike.brand ?? 'No brand' }}
            </h2>
            <p class="text-base xs:text-lg text-white">
                {{ bike.model ?? 'No model' }}
            </p>
        </div>
        <div class="w-[45%]">
            <ion-progress-bar class="h-4 rounded-full" color="dark" :value="0.3"></ion-progress-bar>
        </div>
        <img src="@/../resources/images/bike.png" alt="realistic bike"
            class="absolute object-contain top-[-25%] h-[145%] right-[-25%]" />
    </div>
</template>
<script setup lang="ts">
import { IonProgressBar } from '@ionic/vue';
import { Bike } from '@/entity/Bike';
import { defineProps } from 'vue';

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
