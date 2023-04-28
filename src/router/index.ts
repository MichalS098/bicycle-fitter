import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomeLayout from '@/views/HomeLayout.vue';
import { User } from '@/entity/User';

const firstStepsCompleted = async() => {
  return await User.createQueryBuilder('user').getCount() > 0
}
const homeOrFirstSteps = await firstStepsCompleted() ? '/pages/home' : '/first-steps'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: homeOrFirstSteps
  },
  {
    path: '/first-steps',
    component: () => import('@/views/FirstSteps/IndexPage.vue')
  },
  {
    path: '/new-bike-steps',
    component: () => import('@/views/NewBikeSteps/IndexPage.vue')
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
