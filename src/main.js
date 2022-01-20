import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button } from 'vant';
import { Sidebar, SidebarItem } from 'vant';
import { Grid, GridItem } from 'vant';
import { Col, Row } from 'vant';
import { Image as VanImage } from 'vant';
import scroller from 'v-scroller'
import 'v-scroller/dist/v-scroller.css'
Vue.use(scroller)

Vue.use(Button);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
// import axios from 'axios'

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

