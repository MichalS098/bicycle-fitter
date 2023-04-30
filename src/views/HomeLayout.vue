<template>
  <ion-page class="font-sans">
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>            
      <MainMenu />
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabs, IonPage, IonRouterOutlet } from '@ionic/vue';
import MainMenu from '@/components/MainMenu.vue';
</script>
