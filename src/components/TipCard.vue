<template>
    <div :class="colorClass" class="rounded-[10px] flex flex-col gap-3 p-3">
        <img src="@/../resources/images/tip-test.png" class="object-cover w-full rounded-[10px] shadow-md" />
        <div class="flex flex-col gap-1">
            <div class="flex items-center justify-between gap-1">
                <h2 class="text-lg text-white font-bold">
                    {{ tip.title ?? 'No title' }}
                </h2>
                <HeartIcon class="w-5 h-5 text-white" />                
            </div>
            <p class="text-[10px] text-white leading-[10px]">
                {{ tip.description ?? 'No description' }}
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Tip } from '@/entity/Tip';
import { defineProps } from 'vue';
import { HeartIcon } from '@heroicons/vue/24/outline';

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
switch (props.color) {
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
