<template>
    <ion-tab-bar slot="bottom" class="mb-3 mx-3 px-3 py-2 rounded-full bg-gray-100/60 backdrop-blur-lg">
        <ion-tab-button tab="home" href="/pages/home" aria-label="Home">
            <ion-icon aria-hidden="true" size="normal" :icon="homeOutline" />
        </ion-tab-button>

        <ion-tab-button tab="library" href="/pages/library">
            <ion-icon aria-hidden="true" size="normal" :icon="bookOutline" />
        </ion-tab-button>

        <ion-tab-button tab="camera" href="/pages/camera">
            <ion-icon aria-hidden="true" size="normal" :icon="cameraOutline" />
        </ion-tab-button>

        <ion-tab-button tab="favourites" href="/pages/favourites">
            <ion-icon aria-hidden="true" size="normal" :icon="heartOutline" />
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/pages/settings">
            <ion-icon aria-hidden="true" size="normal" :icon="cogOutline" />
        </ion-tab-button>
    </ion-tab-bar>
</template>
  
<script setup lang="ts">
import { homeOutline, bookOutline, cameraOutline, heartOutline, cogOutline } from 'ionicons/icons';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
</script>

<style scoped>
ion-tab-button {
    --background: transparent;
    --color: #fff;
    --color-selected: #000;
    --background-selected: #fff;
    border-radius: 1000px;
}

ion-tab-button.tab-selected {
    --background: #fff;
    --color: #000;
    --color-selected: #000;
    --background-selected: #fff;
    border-radius: 1000px;
}
</style>