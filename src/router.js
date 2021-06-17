import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'index',
    component: () => import('./views/Index.vue'),
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('./views/Home')
      },
      {
        path: '/me',
        name: 'me',
        component: () => import('./views/Me')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('./views/Order')
      },
      {
        path: '/address',
        name: 'address',
        component: () => import('./views/Address')
      },
      {
        path: '/city',
        name: 'city',
        component: () => import('./views/City')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue')
  },

]
const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.ele_login ? true : false;
  if (to.path == '/login') {
    next();
  } else {
    // 是否在登录状态下
    isLogin ? next() : next('/login');
  }
})

export default router
