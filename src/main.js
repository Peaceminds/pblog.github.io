// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App'
import Routers from './routers'
import axios from 'axios'

// axios global settings
axios.defaults.baseURL = 'https://vue-bgbd.firebaseio.com'
// axios.defaults.headers.common['Authorization'] = 'Token'
// axios.defaults.headers.post['Content-type'] = 'application/urlencode'
// axios.defaults.headers.get['Accepts'] = 'application/json'

Vue.config.productionTip = false
// Vue.use(VueResource)
Vue.use(VueRouter)

// 自定义指令
Vue.directive('crainbow', {
  bind(el, binding, vnode) {
    el.style.color = "#" + Math.random().toString(16).slice(2, 8);
  }
})

Vue.directive('theme', {
  bind(el, binding, vnode) {
    if (binding.value == 'wide') {
      el.style.maxWidth = "1260px";
    } else if (binding.value == 'narrow') {
      el.style.maxWidth = "560px";
    }

    if (binding.arg == 'column') {
      el.style.background = "#6677cc";
      el.style.padding = '20px';
    }
  }
})

Vue.filter("snippet", function (v) {
  return v.slice(0, 100) + "...";
})

// 创建路由
const myrouter = new VueRouter({
  routes: Routers,
  mode: "history"
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router: myrouter
})
