import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomeLayout from '@/views/HomeLayout.vue';
import { User } from '@/entity/User';

const firstStepsCompleted = async () => {
  return await User.createQueryBuilder('user').getCount() > 0
}

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
        path: 'tips',
        component: () => import('@/views/Tips/IndexPage.vue')
      },  
      {
        path: 'favourites',
        component: () => import('@/views/Tips/FavouritesPage.vue')
      },
      {
        path: 'profile',
        component: () => import('@/views/Profile/IndexPage.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const isCompleted = await firstStepsCompleted();  
  if (!isCompleted && to.path === '/') {
    next('/first-steps');
  } else {
    next();
  }
});

export default router