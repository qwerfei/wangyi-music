// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import fastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store/index'
import router from './router/index'

import 'assets/stylus/index.styl'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)
// Vue.use(VueLazyload, {
//   loading: require('assets/image/default.png')
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
