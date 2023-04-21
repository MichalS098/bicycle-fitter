<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    Ustawienia
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">
                        Ustawienia
                    </ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-list>
                <ion-item>
                    <ion-input label="Solid input" label-placement="floating" fill="solid" v-model="name"
                        placeholder="Enter text"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input label="Outline input" label-placement="floating" fill="outline" v-model="height"
                        placeholder="Enter text"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-button @click="save()">Zapisz</ion-button>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonList, IonItem, IonLabel, IonCard, IonButton } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { Storage } from '@ionic/storage';
import { Drivers } from '@ionic/storage';

const name = ref('');
const height = ref('');

const store = new Storage({
    name: '__mydb',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
});
store.create();

// json data test
const test = {
    name: 'test',
    height: 180,
    array: [1, 2, 3, 4, 5],
    object: {
        a: '1',
        b: '2',
        c: '3'
    }
};

onMounted(async () => {
    name.value = await store.get('name');
    height.value = await store.get('height');

    const test_from_db = await store.get('test');
    if (test_from_db !== null) {
        console.log("jest test");
        console.log(test_from_db);
    } else {
        console.log("nie ma test");
        await store.set('test', test);
    }
});

const save = async () => {
    await store.set('name', name.value);
    await store.set('height', height.value);
    console.log("zapis");
    console.log(name, height);
};
</script>
  