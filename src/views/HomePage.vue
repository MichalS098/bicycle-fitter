<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    Lista rowerów
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">
                        My bikes
                    </ion-title>
                </ion-toolbar>
            </ion-header>
            <div class="px-5 mt-10" router-link="/new-bike-steps">

                <div class="ion-padding">
                    <ion-list>
                        <ion-item v-for="bike in user?.bikes" :key="bike.id">
                            <ion-label>
                                <h2>{{ bike.brand }} {{ bike.model }}</h2>
                            </ion-label>
                        </ion-item>
                    </ion-list>
                </div>

                <ion-button router-link="/new-bike-steps">
                    test add new bike
                </ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
    IonList, IonItem, IonLabel
} from '@ionic/vue';
import { Bike } from '@/entity/Bike';
import { User } from '@/entity/User';
import { onMounted, ref } from 'vue';
import { saveDbForWeb } from '@/composables/useSqliteOnWeb';

const user = ref<User | null>(null);

onMounted(async () => {
    user.value = await User.findOne({
        where: {
            id: 1
        },
        relations: {
            bikes: true
        }
    });
});
</script>
  