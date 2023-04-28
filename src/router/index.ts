import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomeLayout from '@/views/HomeLayout.vue';
import { User } from '@/entity/User';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/pages/home'
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

const firstStepsCompleted = async () => {
  return await User.createQueryBuilder('user').getCount() > 0
}

firstStepsCompleted().then((completed) => {
  routes[0].redirect = completed ? '/pages/home' : '/first-steps'
})

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router