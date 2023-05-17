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
                <li>shankLength: {{ user?.shankLength.toFixed(2) }}</li>
                <li>thighLength: {{ user?.thighLength.toFixed(2) }}</li>
                <li>inseamLength: {{ user?.inseamLength.toFixed(2) }}</li>
                <li>shoulderHeight: {{ user?.shoulderHeight.toFixed(2) }}</li>
                <li>armLength: {{ user?.armLength.toFixed(2) }}</li>

                <li>left_shoulder_to_hip: {{ user?.left_shoulder_to_hip.toFixed(2) }}</li>
                <li>left_hip_to_knee: {{ user?.left_hip_to_knee.toFixed(2) }}</li>
                <li>left_knee_to_ankle: {{ user?.left_knee_to_ankle.toFixed(2) }}</li>
                <li>left_ankle_to_foot_index: {{ user?.left_ankle_to_foot_index.toFixed(2) }}</li>
                <li>right_shoulder_to_hip: {{ user?.right_shoulder_to_hip.toFixed(2) }}</li>
                <li>right_hip_to_knee: {{ user?.right_hip_to_knee.toFixed(2) }}</li>
                <li>right_knee_to_ankle: {{ user?.right_knee_to_ankle.toFixed(2) }}</li>
                <li>right_ankle_to_foot_index: {{ user?.right_ankle_to_foot_index.toFixed(2) }}</li>

                <li>leftElbowToLeftShoulder: {{ user?.right_shoulder_to_hip.toFixed(2) }}</li>
                <li>rightElbowToRightShoulder: {{ user?.right_hip_to_knee.toFixed(2) }}</li>
                <li>leftElbowToLeftWrist: {{ user?.right_knee_to_ankle.toFixed(2) }}</li>
                <li>rightElbowToRightWrist: {{ user?.right_ankle_to_foot_index.toFixed(2) }}</li>
            </ul>
            <space-for-tab-bar-menu />
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
/*
 @Column()
    left_shoulder_to_hip!: number;
    @Column()
    left_hip_to_knee!: number;
    @Column()
    left_knee_to_ankle!: number;
    @Column()
    left_ankle_to_foot_index!: number;
    @Column()
    right_shoulder_to_hip!: number;
    @Column()
    right_hip_to_knee!: number;
    @Column()
    right_knee_to_ankle!: number;
    @Column()
    right_ankle_to_foot_index!: number;
    @Column()


    leftElbowToLeftShoulder!: number;
    @Column()
    rightElbowToRightShoulder!: number;
    @Column()
    leftElbowToLeftWrist!: number;
    @Column()
    rightElbowToRightWrist!: number;
*/
import {
    IonPage, IonContent, useIonRouter
} from '@ionic/vue';
import { User } from '@/entity/User';
import { Bike } from '@/entity/Bike';
import { onMounted, ref } from 'vue';
import BikeCard from '@/components/BikeCard.vue';
import NewBikeCard from '@/components/NewBikeCard.vue';
import SpaceForTabBarMenu from '@/components/SpaceForTabBarMenu.vue';
import { getUserFromDatabase, dropDatabase, getLastBikeOfUser } from '@/helpers/helpersDataBase';

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

    const bikeTemp = await getLastBikeOfUser();

    if(bikeTemp != null){
        await Bike.remove(bikeTemp);
    }
    else{
        console.log("Last Bike not found")
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
  