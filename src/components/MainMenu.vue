<template>
    <ion-tab-bar slot="bottom" mode="ios" class="fixed bottom-6 inset-x-3 p-3 rounded-full bg-[#36363660] backdrop-blur-lg">
        <ion-tab-button tab="home" href="/pages/home" class="bg-transparent">
            <HomeIcon class="h-6 w-6" />
        </ion-tab-button>

        <ion-tab-button tab="library" href="/pages/library" class="bg-transparent">
            <LightBulbIcon class="h-6 w-6" />
        </ion-tab-button>

        <ion-tab-button tab="camera" href="/pages/camera" class="bg-transparent">
            <CameraIcon class="h-6 w-6" />
        </ion-tab-button>

        <ion-tab-button tab="favourites" href="/pages/favourites" class="bg-transparent">
            <HeartIcon class="h-6 w-6" />
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/pages/settings" class="bg-transparent">
            <UserIcon class="h-6 w-6" />
        </ion-tab-button>
    </ion-tab-bar>
</template>
  
<script setup lang="ts">
import { HomeIcon, HeartIcon, LightBulbIcon, UserIcon, CameraIcon } from "@heroicons/vue/24/outline"
import { IonTabBar, IonTabButton } from '@ionic/vue';
</script>

<style scoped>
ion-tab-button svg {
    color: #fff;
    stroke-width: 2;
}

ion-tab-button.tab-selected svg {
    color: #000;
}

ion-tab-button {
    flex-basis: 20%;
    transition: all 0.2s ease-in-out;
}

ion-tab-button.tab-selected {
    background-color: #fff;
    flex-basis: 25%;
    border-radius: 1000px;
}
</style>