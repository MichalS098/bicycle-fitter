<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Media pipe test</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <div class="ion-padding">
        <ion-button @click="startVideo">Start video</ion-button>
        <ion-button @click="stopVideo">Stop video</ion-button>
      </div>

      <div class="ion-padding">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Video</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <video width="640" height="480" ref="video"></video>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-card-title>Canvas</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <canvas width="640" height="480" ref="canvas"></canvas>
          </ion-card-content>
        </ion-card>
      </div>

      <div class="ion-padding">
        <ion-list>
          <ion-item>
            <ion-label>Shoulder height</ion-label>
            <ion-label>{{ shoulderHeightResult }}</ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/vue';
import { ref } from 'vue';
import useMediapipe from '@/composables/useMediapipe';
import { onMounted } from 'vue';
import { Camera } from '@mediapipe/camera_utils';
import { shoulderHeight } from '@/functions/mediapipeHelpers';

const video = ref<HTMLVideoElement>();
const canvas = ref<HTMLCanvasElement>();
const shoulderHeightResult = ref(0);
const { pose, drawResults } = useMediapipe();
const camera = ref<Camera>();

onMounted(() => {
  pose.onResults((results) => {
    drawResults(results, canvas.value);
    shoulderHeightResult.value = shoulderHeight(results);
  });

  camera.value = new Camera(video.value, {
    onFrame: async () => {
      await pose.send({ image: video.value });
    },
    width: 1280,
    height: 720
  });
});

const startVideo = () => {
  camera.value.start();
};

const stopVideo = () => {
  camera.value.stop();
};

</script>