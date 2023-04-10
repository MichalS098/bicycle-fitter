<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="ion-padding">
                <h1>let your <span class="text-primary-">bike</span>
                    fit you</h1>
                <h2>
                    Start with measuring yourself!
                </h2>
                <p>
                    In order to bikefit you into your bike,
                    we need to know your measurements.
                    You can pass your photo,
                    or we can do it live!
                </p>
                <ion-button href="/measurements" expand="block" fill="outline">                    
                    Get started!
                </ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
</script>
  