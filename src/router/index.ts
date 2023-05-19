import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import { getUserFromDatabase } from '@/helpers/helpersDataBase'
import { User } from '@/entity/User';

const firstStepsCompleted = async () => {
    const user = await getUserFromDatabase();
    if (user != null) {
        if ((user.unitSystem != null) &&
            (user.overallHeight != null) &&
            (user.rideTime != null) &&
            (user.riderStyle != null)) {
            return true;
        }
        else {
            return false;
        }
    }

    return false;
}

const measureCompleted = async () => {
    const user = await getUserFromDatabase();
    if (user != null) {
        if ((user.shoulderHeight != null) &&
            (user.armLength != null) &&
            (user.shankLength != null) &&
            (user.thighLength != null) &&
            (user.inseamLength != null)) {
            return true;
        }
        else {
            return false;
        }
    }

    return false;
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
        path: '/bikes/:id',
        component: () => import('@/views/Bikes/BikeLayout.vue'),
        children: [
            {
                path: '',
                component: () => import('@/views/Bikes/ShowPage.vue')
            },
            {
                path: 'measure',
                component: () => import('@/views/Bikes/AngleMeasurePage.vue')
            },
            {
                path: 'display',
                component: () => import('@/views/Bikes/AngleDisplayPage.vue')
            }
   
        ]
    },
    {
        path: '/pages',
        component: () => import('@/views/HomeLayout.vue'),
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
    const firstStepsIsCompleted = await firstStepsCompleted();
    const measureIsCompleted = await measureCompleted();

    console.log("firstStepsIsCompleted", firstStepsIsCompleted)
    console.log("measureIsCompleted", measureIsCompleted)
    console.log("number of users in DB: ", await User.createQueryBuilder('user').getCount());

    if ((to.path === '/first-steps' && firstStepsIsCompleted) || (to.path === '/measure' && measureIsCompleted)) {
        next('/pages/home');
    } else if (!firstStepsIsCompleted && to.path !== '/first-steps') {
        next('/first-steps');
    } else if (firstStepsIsCompleted && !measureIsCompleted && to.path !== '/measure') {
        next('/measure');
    } else {
        next();
    }
});

export default router