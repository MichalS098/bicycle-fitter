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
                        <ion-item v-for="bike in bikes" :key="bike.id">
                            <ion-label>
                                <h2>{{ bike.brand }} {{ bike.model }}</h2>
                            </ion-label>
                        </ion-item>
                    </ion-list>
                </div>

                <!-- test db -->
                <ion-button @click="addNewBike()" expand="block" fill="clear" size="large">
                    test add new bike
                </ion-button>

                <ion-button @click="testDb()" expand="block" fill="clear" size="large">
                    test db
                </ion-button>
                <!-- /test db -->
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
    onIonViewDidEnter, onIonViewDidLeave, onIonViewWillEnter, onIonViewWillLeave,
    IonList, IonItem, IonLabel
} from '@ionic/vue';
import { Bike } from '@/entity/Bike';
import { User } from '@/entity/User';
import { onMounted, ref, getCurrentInstance } from 'vue';
import SqliteDataSource from '@/data-sources/SqliteDataSource';

// on mounted get all bikes
const bikes = ref<Bike[]>([]);
const user = ref<User | null>(null);
const app = getCurrentInstance();
const platform = app?.appContext.config.globalProperties.$platform;
const sqlite = app?.appContext.config.globalProperties.$sqlite;

const connection = SqliteDataSource;
const database = connection.options.database;

onMounted(async () => {
    // add user if not exists
    const users = await User.find();
    if (users.length === 0) {
        const newUser = new User();
        newUser.id = 1;
        newUser.height = 180;
        await newUser.save();
        if (platform === 'web') {
            await sqlite.saveToStore(database);
        }
        user.value = newUser;
    }
    else {
        user.value = users[0];
    }

    // get all bikes
    bikes.value = await Bike.findBy({ user: user.value });
    console.log("user", user.value);
    console.log("bikes", bikes.value);
});



const addNewBike = async () => {
    if (user.value) {
        const newBike = new Bike();
        newBike.brand = "test brand";
        newBike.model = "test model";
        newBike.user = user.value;
        await newBike.save();
        bikes.value = await Bike.findBy({ user: user.value });

        if (platform === 'web') {
            await sqlite.saveToStore(database);
        }
    }
}

const testDb = async () => {
    const users = await User.find();
    console.log("users", users);
    const bikes = await Bike.find();
    console.log("bikes", bikes);
}


onIonViewDidEnter(() => {
    console.log('Page did enter');
});

onIonViewDidLeave(() => {
    console.log('Page did leave');
});

onIonViewWillEnter(() => {
    console.log('Page will enter');
});

onIonViewWillLeave(() => {
    console.log('Page will leave');
});
const goToNewBikeSteps = () => {
    console.log("goToNewBikeSteps")
}
</script>
  