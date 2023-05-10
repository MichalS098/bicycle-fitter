import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomeLayout from '@/views/HomeLayout.vue';
import { User } from '@/entity/User';
import AppDataSource from '@/data-sources/SqliteDataSource';
import SqliteDataSource from '@/data-sources/SqliteDataSource';

import { getUserFromDataBase }  from '@/helpers/helpersDataBase'

import { saveDbForWeb } from '@/composables/useSqliteOnWeb'
import {
  useIonRouter,
  createAnimation,
  AnimationBuilder
} from '@ionic/vue';


/*const firstStepsCompleted = async () => {
  return await User.createQueryBuilder('user').getCount() > 0
}*/

const firstStepsCompleted = async () => {
  let key = false;
  const user  = await getUserFromDataBase();

if( user!= null){
  if ((user.unitSystem != null) &&
    (user.overallHeight != null) &&
    (user.rideTime != null) &&
    (user.riderStyle != null)) {
    key = true;
  }
  else {
    key = false;
  }
}

  return key;
}

const measureCompleted = async () => {
  
  let key = false;
  const user  = await getUserFromDataBase();

if( user!= null){
  if ((user.shoulderHeight != null) &&
    (user.armLength != null) &&
    (user.shankLength != null) &&
    (user.thighLength != null)&&
    user.inseamLength) {
    key = true;
  }
  else {
    key = false;
  }
}

  return key;

 
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/first-steps'
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
    path: '/bike-measurements',
    component: () => import('@/views/BikeMeasurements/IndexPage.vue')
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

//const routerIon = useIonRouter();
router.beforeEach(async (to, from, next) => {

  await saveDbForWeb();

  const isCompleted = await firstStepsCompleted();
  const measureIsCompleted = await measureCompleted();

  console.log("isCompleted", isCompleted)
  console.log("await User.createQueryBuilder('user').getCount(): ", await User.createQueryBuilder('user').getCount());

  if (!isCompleted && to.path === '/') {
    console.log("test");
    next('/first-steps');//routerIon.navigate('/first-steps', 'none', 'replace');//
  } else {

    if (!measureIsCompleted && to.path === '/') {
      next('/measure');//routerIon.navigate('/measure', 'none', 'replace');//
    }
    else if (measureIsCompleted && to.path === '/') {
      next('/pages/home');//routerIon.navigate('/pages/home', 'none', 'replace');//
    }
    else 
    {
      next();
    }
    //

  }
  /*const isCompleted = await firstStepsCompleted();  
  if (!isCompleted && to.path === '/') {
    next('/first-steps');
  } else {
    next();
  }*/
});

export default router