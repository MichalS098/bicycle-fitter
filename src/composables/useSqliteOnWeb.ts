import { getCurrentInstance } from 'vue';
import SqliteDataSource from '@/data-sources/SqliteDataSource';
import { CapacitorSQLite } from '@capacitor-community/sqlite';

const app = getCurrentInstance();
const platform = app?.appContext.config.globalProperties.$platform;
const sqlite = app?.appContext.config.globalProperties.$sqlite;
//const sqlite = CapacitorSQLite;
const connection = SqliteDataSource;
const database = connection.options.database;


/**
 * @description This function is used to save database on web platform
 * which allows you to test your app database on web platform.
 */
export async function saveDbForWeb(): Promise<void> {
    //if (platform === 'web') {
        if (sqlite) {
            await sqlite.saveToStore(database);
            console.log("Save Data Base is completed");
        } else {
            console.error("Sqlite is undefined");
        }
    //}
}
