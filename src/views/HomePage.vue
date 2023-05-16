<template>
    <ion-page>
        <ion-content class="ion-padding" :fullscreen="true">
            <div class="flex flex-col justify-between gap-6 xxs:gap-12">
                <div class="px-3 xxs:px-6 pt-3 xxs:pt-6">
                    <h1 class="fitter-h1">
                        My
                        <br>
                        Bikes
                    </h1>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 xxs:gap-6">
                    <bike-card v-for="bike in user?.bikes" :key="bike.id" :bike="bike" />
                    <new-bike-card />
                </div>
                <ion-button @click="deleteDataBaseAndReturnFirstSteps()" expand="block" shape="round" color="primary" mode="ios" type="button"
                        class="font-bold text-lg">
                        Delete Data Base
                    </ion-button>
                    <ion-button @click="saveFile()" expand="block" shape="round" color="primary" mode="ios" type="button"
                        class="font-bold text-lg">
                        Save media pipe measure
                    </ion-button>
            </div>
            <ul>
                <li>name: {{ user?.nameOfUser }}</li>
                <li>overallHeight: {{ user?.overallHeight }}</li>
                <li>shankLength: {{ user?.shankLength }}</li>
                <li>thighLength: {{ user?.thighLength }}</li>
                <li>inseamLength: {{ user?.inseamLength }}</li>
                <li>shoulderHeight: {{ user?.shoulderHeight }}</li>
                <li>armLength: {{ user?.armLength }}</li>
            </ul>
            <space-for-tab-bar-menu />
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import {
    IonPage, IonContent, useIonRouter
} from '@ionic/vue';
import { User } from '@/entity/User';
import { onMounted, ref } from 'vue';
import BikeCard from '@/components/BikeCard.vue';
import NewBikeCard from '@/components/NewBikeCard.vue';
import SpaceForTabBarMenu from '@/components/SpaceForTabBarMenu.vue';
import { getUserFromDatabase, dropDatabase } from '@/helpers/helpersDataBase';

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

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
const router = useIonRouter();

const deleteDataBaseAndReturnFirstSteps = async () => {


    const userTemp  = await getUserFromDatabase();
    
    console.log("userTemp before delete: ", userTemp)

    if(userTemp != null){
        await User.remove(userTemp);
    }
    else{
        console.log("USer not found")
    }

    router.replace('/first-steps');
    
    
}

const saveFile = async () => {

    const userTemp  = await getUserFromDatabase();

    if(userTemp == null){
        console.log("USer not found")
        return;
    }

    const shankLength = userTemp.shankLength;
    const thighLength = userTemp.thighLength;
    const inseamLength = userTemp.inseamLength;
    const shoulderHeight = userTemp.shoulderHeight;
    const armLength = userTemp.armLength;

    const fileName = userTemp.nameOfUser;
      const fileContent = `shankLength(podudzie): ${shankLength}   \nthighLength(udo): ${thighLength}   \ninseamLength(wewnątrz noga): ${inseamLength}   \nshoulderHeight(wysokość ramion): ${shoulderHeight}    \n armLength: ${armLength}`;
      console.log("fileName: ", fileName)
      console.log("fileContent:  ", fileContent)

      try {
        const result = await Filesystem.writeFile({
          path: fileName,
          data: fileContent,
          directory: Directory.Documents,
          encoding: Encoding.UTF8
        });
        console.log('File saved at ', result.uri);
      } catch (error) {
        console.error('Unable to write file', error);
      }
    }




</script>
  