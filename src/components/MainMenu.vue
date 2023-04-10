<template>
    <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
            <ion-icon aria-hidden="true" :icon="home" />            
        </ion-tab-button>

        <ion-tab-button tab="library" href="/library">
            <ion-icon aria-hidden="true" :icon="book" />
        </ion-tab-button>

        <ion-tab-button tab="camera" href="/camera">
            <ion-icon aria-hidden="true" :icon="camera" />
        </ion-tab-button>

        <ion-tab-button tab="favourites" href="/favourites">
            <ion-icon aria-hidden="true" :icon="heart" />
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/settings">
            <ion-icon aria-hidden="true" :icon="cog" />
        </ion-tab-button>
    </ion-tab-bar>
</template>
  
<script setup lang="ts">
import { home, book, camera, heart, cog } from 'ionicons/icons';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
</script>