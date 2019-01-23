import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store';
import Muse from './muse-ui-config'
import VueTouch from 'vue-touch'

import './assets/sass/_icon.scss'

Vue.use(Muse)
Vue.use(VueAxios,axios)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

// 自动跳转至message页面
router.replace('/MessageView')

// 网络请求获取全部数据
store.dispatch('getAllData', axios)

