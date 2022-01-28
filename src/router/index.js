import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/Home.vue'
import Login from '@/views/login/Login.vue'
import Register from '@/views/register/Register.vue'
import Shop from '@/views/shop/Shop.vue'
import OrderConfirmation from '@/views/orderConfirmation/OrderConfirmation.vue'
import OrderList from '@/views/orderList/OrderList.vue'
import CartList from '@/views/cartList/CartList.vue'
import Mine from '@/views/mine/Mine.vue'
import Search from '@/views/search/Search.vue'
import SearchResult from '@/views/search/SearchResult.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/searchResult',
    name: 'SearchResult',
    component: SearchResult
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: OrderConfirmation
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: CartList
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: OrderList
  },
  {
    path: '/mine',
    name: 'Mine',
    component: Mine
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter (to, from) {
      const { isLogin } = localStorage
      return isLogin ? { name: 'Home' } : true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter (to, from) {
      const { isLogin } = localStorage
      return isLogin ? { name: 'Home' } : true
    }
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'Login' || name === 'Register')
  return (isLogin || isLoginOrRegister) ? true : { name: 'Login' }
})

export default router
