import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

import PageHome from '@/pages/PageHome';
import PageMeetupDetail from '@/pages/PageMeetupDetail';
import PageMeetupFind from "@/pages/PageMeetupFind";
import PageRegister from "@/pages/PageRegister";
import PageLogin from "@/pages/PageLogin";
import PageNotFound from "@/pages/PageNotFound";
import PageSecret from "@/pages/PageSecret";
import PageNotAuthenticated from "@/pages/PageNotAuthenticated";
import PageMeetupCreate from "@/pages/PageMeetupCreate";
import PageProfile from "@/pages/PageProfile";
import PageMeetupEdit from "@/pages/PageMeetupEdit";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'PageHome',
      component: PageHome
    },
    {
      path: '/find/:category',
      name: 'PageMeetupFindCategory',
      component: PageMeetupFind,
      props: true, // informing that the param from path is going to comp as a prop
      beforeEnter: (to, from, next) => {
        store.dispatch('meta/fetchMetaData')
          .then(() => {
            next();
          });
      }
    },
    {
      path: '/find',
      name: 'PageMeetupFind',
      component: PageMeetupFind,
      beforeEnter: (to, from, next) => {
        store.dispatch('meta/fetchMetaData')
          .then(() => {
            next();
          });
      }
    },
    {
      path: '/meetups/new',
      name: 'PageMeetupCreate',
      component: PageMeetupCreate,
      meta: {onlyAuthUser: true},
      beforeEnter: (to, from, next) => {
        store.dispatch('meta/fetchMetaData')
          .then(() => {
            next();
          });
      }
    },
    {
      path: '/meetups/secret',
      name: 'PageSecret',
      component: PageSecret,
      meta: {onlyAuthUser: true}
    },
    {
      path: '/meetups/:id',
      name: 'PageMeetupDetail',
      component: PageMeetupDetail
    },
    {
      path: '/meetups/:meetupId/edit',
      name: 'PageMeetupEdit',
      component: PageMeetupEdit,
      props: true,
      meta: {onlyAuthUser: true}
    },
    {
      path: '/login',
      name: 'PageLogin',
      component: PageLogin,
      meta: {onlyGuestUser: true}
    },
    {
      path: '/register',
      name: 'PageRegister',
      component: PageRegister,
      meta: {onlyGuestUser: true}
    },
    {
      path: '/me',
      name: 'PageProfile',
      component: PageProfile,
      meta: {onlyAuthUser: true}
    },
    {
      path: '/401', //catches the url if nothing found - 404
      name: 'PageNotAuthenticated',
      component: PageNotAuthenticated
    },
    {
      path: '*', //catches the url if nothing found - 404
      name: 'PageNotFound',
      component: PageNotFound
    }
  ],
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  store.dispatch('auth/getAuthUser')
    .then(() => {
      const isAuthenticated = store.getters['auth/isAuthenticated'];
      if (to.meta.onlyAuthUser) {
        if (isAuthenticated) {
          next();
        } else {
          next({name: 'PageNotAuthenticated'});
        }
      } else if (to.meta.onlyGuestUser) {
        if (isAuthenticated) {
          next({name: 'PageHome'});
        } else {
          next();
        }
      } else {
        next();
      }
    });
});

export default router;