<template>
    <div class="fixed bottom-0 mb-5 py-2 rounded-full bg-gray-100/10 backdrop-blur-lg flex justify-around items-center w-full">
        <router-link to="/pages/home" class="w-10 h-20 flex items-center"  v-slot="{ isActive }">
        <div :class="isActive ? 'bg-white px-10 py-6 rounded-full' : ''">
            <HomeIcon :class="isActive ? 'text-black stroke-2' : 'text-white stroke-1.5'" class="h-7 w-7 " />
        </div>
        </router-link>

        <router-link to="/pages/library" class="w-10 h-20 flex items-center"  v-slot="{ isActive }">
        <div :class="isActive ? 'bg-white px-10 py-6 rounded-full' : ''">
            <LightBulbIcon :class="isActive ? 'text-black stroke-2' : 'text-white stroke-1.5'" class="h-7 w-7" />
        </div>
        </router-link>

        <router-link to="/pages/camera" class="w-10 h-20 flex items-center"  v-slot="{ isActive }">
        <div :class="isActive ? 'bg-white px-10 py-6 rounded-full' : ''">
            <CameraIcon :class="isActive ? 'text-black stroke-2' : 'text-white stroke-1.5'" class="h-7 w-7" />
        </div>
        </router-link>

        <router-link to="/pages/favourites" class="w-10 h-20 flex items-center"  v-slot="{ isActive }">
        <div :class="isActive ? 'bg-white px-10 py-6 rounded-full' : ''">
            <HeartIcon :class="isActive ? 'text-black stroke-2' : 'text-white stroke-1.5'" class="h-7 w-7" />
        </div>
        </router-link>

        <router-link to="/pages/settings" class="w-10 h-20 flex items-center"  v-slot="{ isActive }">
        <div :class="isActive ? 'bg-white px-10 py-6 rounded-full' : ''">
            <UserIcon :class="isActive ? 'text-black stroke-2' : 'text-white stroke-1.5'" class="h-7 w-7" />
        </div>
        </router-link>
    </div>
</template>
  
<script setup lang="ts">
import { HomeIcon, HeartIcon, LightBulbIcon, UserIcon, CameraIcon } from "@heroicons/vue/24/outline"

</script>
  

<style scoped>

</style>