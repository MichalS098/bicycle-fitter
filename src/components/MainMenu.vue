<template>
    <!-- TODO: Change "tab change" animation -->
    <ion-tab-bar slot="bottom" mode="ios"
        class="fixed bottom-3 xxs:bottom-4 xs:bottom-6 inset-x-3 p-1 xxs:p-2 xs:p-3 rounded-full bg-[#36363660] backdrop-blur-lg h-16 max-w-xl mx-auto">
        <ion-tab-button tab="home" href="/pages/home" mode="ios">
            <HomeIcon />
        </ion-tab-button>

        <ion-tab-button tab="tips" href="/pages/tips" mode="ios">
            <LightBulbIcon />
        </ion-tab-button>

        <ion-tab-button tab="camera" href="/pages/camera" mode="ios">
            <CameraIcon />
        </ion-tab-button>

        <ion-tab-button tab="favourites" href="/pages/favourites" mode="ios">
            <HeartIcon />
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/pages/profile" mode="ios">
            <UserIcon />
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
    width: 24px;
    height: 24px;
    transition: all 0.2s ease-in-out;
}

ion-tab-button.tab-selected svg {
    color: #000;
}

ion-tab-button {
    background-color: transparent;
    flex-basis: 20%;
    transition: all 0.2s ease-in-out;
}

ion-tab-button.tab-selected {
    background-color: #fff;
    flex-basis: 28%;
    border-radius: 1000px;
}
</style>