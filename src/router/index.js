import { createRouter, createWebHashHistory } from 'vue-router'
import { getUserAuth } from '@/utils/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home,
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/Home.vue')
  },
  {
    path: '/search',
    name: 'Search',
    // component: Search,
    component: () => import(/* webpackChunkName: "search" */ '@/views/search/Search.vue')
  },
  {
    path: '/searchResult',
    name: 'SearchResult',
    // component: SearchResult,
    component: () => import(/* webpackChunkName: "searchResult" */ '@/views/search/SearchResult.vue')
  },
  {
    path: '/merchants/:id',
    name: 'Shop',
    // component: Shop,
    component: () => import(/* webpackChunkName: "merchants" */ '@/views/shop/Shop.vue')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    // component: OrderConfirmation,
    component: () => import(/* webpackChunkName: "orderConfirmation" */ '@/views/orderConfirmation/OrderConfirmation.vue')
  },
  {
    path: '/cartList',
    name: 'CartList',
    // component: CartList,
    component: () => import(/* webpackChunkName: "cartList" */ '@/views/cartList/CartList.vue')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    // component: OrderList,
    component: () => import(/* webpackChunkName: "orderList" */ '@/views/orderList/OrderList.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    // component: Mine,
    component: () => import(/* webpackChunkName: "mine" */ '@/views/mine/Mine.vue')
  },
  {
    path: '/addressManage',
    name: 'AddressManage',
    // component: AddressManage,
    component: () => import(/* webpackChunkName: "addressManage" */ '@/views/address/AddressManage.vue')
  },
  {
    path: '/editAddress',
    name: 'EditAddress',
    // component: EditAddress,
    component: () => import(/* webpackChunkName: "editAddress" */ '@/views/address/EditAddress.vue')
  },
  {
    path: '/newAddress',
    name: 'NewAddress',
    // component: NewAddress,
    component: () => import(/* webpackChunkName: "newAddress" */ '@/views/address/NewAddress.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // component: Login,
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login.vue'),
    beforeEnter (to, from) {
      const authInfo = getUserAuth()
      const token = authInfo?.token
      // console.log('token', token)
      return token ? { name: 'Home' } : true
    }
  },
  {
    path: '/register',
    name: 'Register',
    // component: Register,
    component: () => import(/* webpackChunkName: "register" */ '@/views/register/Register.vue'),
    beforeEnter (to, from) {
      const authInfo = getUserAuth()
      const token = authInfo?.token
      return token ? { name: 'Home' } : true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  const authInfo = getUserAuth()
  const token = authInfo?.token
  const { name } = to
  const isLoginOrRegister = (name === 'Login' || name === 'Register')
  return (token || isLoginOrRegister) ? true : { name: 'Login' }
})

export default router
