import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/tailwind.css';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

/**
 * Database
 */
import {
  defineCustomElements as jeepSqlite,
  applyPolyfills,
} from 'jeep-sqlite/loader';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite } from '@capacitor-community/sqlite';
import AppDataSource from './data-sources/SqliteDataSource';
import sqliteConnection from '@/database';

applyPolyfills().then(() => {
  jeepSqlite(window);
});

window.addEventListener('DOMContentLoaded', async () => {
  const app = createApp(App)
    .use(IonicVue)
    .use(router);

  //	const platform = ref(Capacitor.getPlatform());
  const platform = Capacitor.getPlatform();
  app.config.globalProperties.$platform = platform;
  app.config.globalProperties.$sqlite = sqliteConnection;

  try {
    if (platform === 'web') {
      const jeepEl = document.querySelector('jeep-sqlite');
      if (jeepEl != null) {
        document.body.removeChild(jeepEl);
      }
      // Create the 'jeep-sqlite' Stencil component
      const jeepSqlite = document.createElement('jeep-sqlite');
      document.body.appendChild(jeepSqlite);
      await customElements.whenDefined('jeep-sqlite');
      // Initialize the Web store
      await sqliteConnection.initWebStore();
    }

    // when using Capacitor, you might want to close existing connections,
    // otherwise new connections will fail when using dev-live-reload
    // see https://github.com/capacitor-community/sqlite/issues/106
    CapacitorSQLite.checkConnectionsConsistency({
      dbNames: [], // i.e. "i expect no connections to be open"
    }).catch((e) => {
      // the plugin throws an error when closing connections. we can ignore
      // that since it is expected behaviour
      console.log('ignore this: CapacitorSQLite.checkConnectionsConsistency', e);      
      return {};
    });

    for (const connection of [AppDataSource]) {
      if (!connection.isInitialized) {
        await connection.initialize();
      }      
      await connection.runMigrations();
    }

    if (platform === 'web') {
      // save the database from memory to store
      await sqliteConnection.saveToStore('app-bicycle-fitter');
    }

    router.isReady().then(() => {
      app.mount('#app');
    });

    defineCustomElements(window);

  } catch (err) {
    console.log(`Error: ${err}`);
    throw new Error(`Error: ${err}`);
  }
});