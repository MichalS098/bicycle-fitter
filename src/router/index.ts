import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import HomeLayout from '@/views/HomeLayout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: () => {
      if (localStorage.getItem('firstTime') === 'true') {
        return '/first-steps'
      } else {
        return '/home'
      }
    }
  },
  {
    path: '/first-steps',
    component: () => import('@/views/FirstStepsPage.vue')
  },
  {
    path: '/pages',
    component: HomeLayout,
    children: [      
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'library',
        component: () => import('@/views/LibraryPage.vue')
      },
      {
        path: 'camera',
        component: () => import('@/views/CameraPage.vue')
      },
      {
        path: 'favourites',
        component: () => import('@/views/FavouritePage.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/SettingsPage.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
