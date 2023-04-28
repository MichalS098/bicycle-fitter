import { getCurrentInstance } from 'vue';
import SqliteDataSource from '@/data-sources/SqliteDataSource';
const app = getCurrentInstance();
const platform = app?.appContext.config.globalProperties.$platform;
const sqlite = app?.appContext.config.globalProperties.$sqlite;
const connection = SqliteDataSource;
const database = connection.options.database;

/**
 * @description This function is used to save database on web platform
 * which allows you to test your app database on web platform.
 */
export async function saveDbForWeb(): Promise<void> {
    if (platform === 'web') {
        await sqlite.saveToStore(database);
    }
}