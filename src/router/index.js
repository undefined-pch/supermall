import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Shopcart = () => import('../views/shopcart/ShopCart')
const Profile = () => import('../views/profile/Profile')
const Detiail = () => import('../views/detail/Detiali')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: Shopcart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detiail:iid',
    component: Detiail
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})


export default router
