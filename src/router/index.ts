import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomeLayout from '@/views/HomeLayout.vue';

const routes: Array<RouteRecordRaw> = [  
  {
    path: '/',
    redirect: () => {
      if (localStorage.getItem('first-steps-completed') === null) {
        return '/first-steps'
      } else {
        return '/pages/home'
      }
    }
  },
  {
    path: '/first-steps',
    component: () => import('@/views/FirstSteps/IndexPage.vue')
  },
  {
    path: '/measure',
    component: () => import('@/views/Measure/IndexPage.vue')
  },
  {
    path: '/pages',
    component: HomeLayout,
    children: [
      {
        path: '',
        redirect: '/pages/home'
      },
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
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
