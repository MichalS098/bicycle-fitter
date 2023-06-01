<template>
    <div>
        <transition name="fade">
            <!-- backdrop -->
            <div v-if="show" class="fixed inset-0 z-[11]" @click="$emit('close')"></div>
        </transition>
        <transition name="fade">
            <div v-if="show" class="absolute top-0 left-0 right-0 w-full px-3 pt-3 z-[12] flex justify-between">
                <div class="px-6 py-3 bg-white rounded-[20px] shadow-xl flex w-full">
                    <div
                        class="text-center text-red-600 font-black leading-none flex items-center justify-center flex-col pr-3 mr-3 border-r border-gray-400">
                        <span class="text-4xl text-red-500 font-bold leading-[36px]">
                            {{ length }}
                        </span>
                        <span class="text-4xl text-red-500 font-bold  leading-[36px]">
                            {{ unitSystem === 'metric' ? 'cm' : 'in' }}
                        </span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="flex items-center justify-between gap-2 py-1">
                            <h3 class="text-xl font-bold text-gray-800">
                                {{ bikeMeasureInfo.title }}
                            </h3>
                            <x-mark-icon class="shrink-0 w-8 h-8 text-gray-800" @click="$emit('close')" />
                        </div>
                        <p class="text-base  text-gray-800">
                            {{ bikeMeasureInfo.content }}
                        </p>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

interface BikeMeasureInfo {
    title: string;
    content: string;
    lengthCm: number;
}

const props = defineProps({
    show: {
        type: Boolean,
        default: true,
    },
    bikeMeasureInfo: {
        type: Object as () => BikeMeasureInfo,
        required: true,
    },
    unitSystem: {
        type: String,
        default: 'metric',
    },
})

const length = ref<number>(0);
onMounted(() => {
    if (props.unitSystem === 'metric') {
        length.value = props.bikeMeasureInfo.lengthCm;
    } else {
        length.value = props.bikeMeasureInfo.lengthCm * 0.393701;
    }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>