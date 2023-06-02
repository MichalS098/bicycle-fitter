<template>
    <ion-page>
        <ion-content class="ion-padding" :fullscreen="true">
            <div class="flex flex-col justify-between gap-6 xxs:gap-12 pt-12">
                <button class="absolute top-0 right-0 p-2 xxs:p-4" @click="goToHome">X</button>
                <div class="px-3 xxs:px-6 pt-3 xxs:pt-6">
                    <h1 class="text-5xl xxs:text-6xl">
                        Trek
                    </h1>
                </div>
                <div class="px-3 xxs:px-6 pt-3 xxs:pt-6">
                    <h2 class="text-xl xxs:text-xl">
                        Suggested
                        <br>
                        angles
                    </h2>
                </div>
            </div>

            <ul>
                <li v-for="set in angles" :key="set.id">
                    footFloorMax: {{ set?.footFloorAngleMax }} <br>
                    footFloorMin: {{ set?.footFloorAngleMin }}<br>
                    torsoFloorMax: {{ set?.torsoFloorAngleMax }}<br>
                    torsoFloorMin: {{ set?.torsoFloorAngleMin }}<br>
                    thighshankMax: {{ set?.thighShankAngleMax }}<br>
                    thighshankMin: {{ set?.thighShankAngleMin }}<br>
                    torsoBicepMax: {{ set?.torsoBicepAngleMax }}<br>
                    torsoBicepMin: {{ set?.torsoBicepAngleMin }}<br>
                    bicepForearmMax: {{ set?.bicepForearmAngleMax }}<br>
                    bicepForearmMin: {{ set?.bicepForearmAngleMin }}<br>
                </li>
            </ul>

        </ion-content>
    </ion-page>
</template>
  
<script lang="ts" setup>
import { IonPage, IonContent, useIonRouter} from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { Bike } from '@/entity/Bike';
import { Angles } from '@/entity/Angles'
import { useRoute } from 'vue-router';

// get router params props
const route = useRoute();
const bike_id = Number(route.params.id);
const bike = ref<Bike | null>();
const angles = ref<Angles[]>();

const router = useIonRouter();

const goToHome = () => {
    router.navigate('/pages/home', 'none', 'replace');
};


onMounted(async () => {
    //Since a single bike has many different angle measurements, you need to fetch all measurements that apply to
    //this specific bike.
    bike.value = await Bike.findOneBy({
        id: bike_id
    })
    if (bike.value != null){
        angles.value = await Angles.findBy({
            bike: bike.value
        })
    }
});


</script>