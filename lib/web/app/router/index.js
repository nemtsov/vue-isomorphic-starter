import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login.vue';
import Hello from '../components/Hello.vue';

Vue.use(Router);

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/login',
        name: 'Login',
        component: Login,
      },
      {
        path: '/:id?',
        name: 'Hello',
        component: Hello,
      },
    ],
  });
}
