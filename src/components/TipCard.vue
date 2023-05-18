<template>
    <div :class="colorClass" class="rounded-[10px] flex flex-col gap-3 p-3 aspect-[0.75]">
        <ion-img :src="tip.featured_image_path" class="tip-ion-img"></ion-img>
        <div class="flex flex-col gap-1">
            <div class="flex items-center justify-between gap-1">
                <h2 class="text-xl text-white font-bold leading-6 line-clamp-2">
                    {{ tip.title ?? 'No title' }}
                </h2>

                <HeartSolidIcon v-if="tip.favourite" class="w-5 h-5 text-white shrink-0" />
                <HeartIcon v-else class="w-5 h-5 text-white shrink-0" />
            </div>
            <p class="text-sm text-white leading-4 line-clamp-2">
                {{ tip.description ?? 'No description' }}
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Tip } from '@/entity/Tip';
import { defineProps } from 'vue';
import { HeartIcon } from '@heroicons/vue/24/outline';
import { IonImg } from '@ionic/vue';
import { HeartIcon as HeartSolidIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
    tip: {
        type: Tip,
        required: true
    },
    color: {
        type: String,
        default: 'primary'
    }
});

let colorClass = '';
switch (props.tip.color) {
    case 'primary':
        colorClass = 'bg-primary'
        break;
    case 'secondary':
        colorClass = 'bg-secondary'
        break;
    case 'tertiary':
        colorClass = 'bg-tertiary'
        break;
    case 'success':
        colorClass = 'bg-success'
        break;
    case 'warning':
        colorClass = 'bg-warning'
        break;
    case 'danger':
        colorClass = 'bg-danger'
        break;
    default:
        colorClass = 'bg-primary'
        break;
}
</script>

<style>
.tip-ion-img::part(image) {
    object-fit: cover;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    aspect-ratio: 1.28;
}
</style>