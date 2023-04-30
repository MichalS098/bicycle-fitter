<template>
    <button type="button"
        class="w-full aspect-[1.54] rounded-[30px] bg-gradient-to-br from-tertiary-shade to-tertiary-tint p-5 relative flex flex-col justify-between items-start overflow-hidden">
        <div>
            <h2 class="text-3xl xs:text-4xl text-white font-bold">
                New bike
            </h2>
            <p class="text-left text-base xs:text-lg text-white">Add new bike</p>
        </div>
        <plus-icon class="w-10 h-10 text-white" />
        <img src="@/../resources/images/bike.png" alt="realistic bike"
            class="absolute object-contain top-[-60px] h-[145%] right-[-90px]" />
    </button>
</template>
<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline';
// TODO: add action to this button and animation for creating new bike,
//  after clicking this button user should be redirected to the new bike page
// TODO: Improve bike.png quality and convert it to webp
</script>