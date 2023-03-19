<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button @click="takePhoto()">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { camera, trash, close } from 'ionicons/icons';
import {
  IonPage, IonHeader, IonFab, IonFabButton, IonIcon,
  IonToolbar, IonTitle, IonContent, IonGrid, IonRow,
  IonCol, IonImg
} from '@ionic/vue';
import { usePhotoGallery } from '@/composables/usePhotoGallery';

const { takePhoto } = usePhotoGallery();
</script>