import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Detail = () => import('../views/detail/Detail.vue')

Vue.use(VueRouter)

  const routes = [
  { 
	path: '/', 
	redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  //分类路由
  {
    path: '/category',
    name: 'Category',
	  component: Category
  },
  //购物车路由
  {
    path: '/cart',
    name: 'Cart',
	component: Cart
  },
  {
    path: '/profile',
    name: 'Profile',
	component: Profile
  },
  {
    path: '/detail/:iid',
    name: 'Detail',
	component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
