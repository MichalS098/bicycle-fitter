<template>
    <div
        class="w-full aspect-[1.54] rounded-[30px] bg-gradient-to-br from-tertiary to-tertiary-tint p-5 relative flex flex-col justify-between items-start overflow-hidden">
        <div>
            <h2 class="text-3xl xs:text-4xl text-white font-bold">
                New bike
            </h2>
            <p class="text-base xs:text-lg text-white">
                Add new bike
            </p>
        </div>        
        <plus-icon class="w-10 h-10 text-white" />
        <img src="@/../resources/images/bike.png" alt="realistic bike" class="absolute object-contain top-0 h-[115%] right-[-10px] " />
    </div>
</template>
<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline';
</script>