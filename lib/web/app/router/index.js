import Vue from 'vue';
import Router from 'vue-router';
import Hello from '../components/Hello.vue';

Vue.use(Router);

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Hello',
        component: Hello,
      },
    ],
  });
}
