<template>
    <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/pages/home">
            <ion-icon aria-hidden="true" :icon="home" />            
        </ion-tab-button>

        <ion-tab-button tab="library" href="/pages/library">
            <ion-icon aria-hidden="true" :icon="book" />
        </ion-tab-button>

        <ion-tab-button tab="camera" href="/pages/camera">
            <ion-icon aria-hidden="true" :icon="camera" />
        </ion-tab-button>

        <ion-tab-button tab="favourites" href="/pages/favourites">
            <ion-icon aria-hidden="true" :icon="heart" />
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/pages/settings">
            <ion-icon aria-hidden="true" :icon="cog" />
        </ion-tab-button>
    </ion-tab-bar>
</template>
  
<script setup lang="ts">
import { home, book, camera, heart, cog } from 'ionicons/icons';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
</script>