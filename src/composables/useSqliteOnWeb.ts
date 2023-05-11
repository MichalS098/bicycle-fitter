import { getCurrentInstance } from 'vue';
const app = getCurrentInstance();
const platform = app?.appContext.config.globalProperties.$platform;
const sqlite = app?.appContext.config.globalProperties.$sqlite;

/**
 * @description This function is used to save database on web platform
 * which allows you to test your app database on web platform.
 */
export async function saveDbForWeb(): Promise<void> {
    if (platform === 'web') {
        await sqlite.saveToStore('app-bicycle-fitter');        
    }
}