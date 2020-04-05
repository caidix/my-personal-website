import Vue from 'vue';
import App from './app';
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import './index.css'
import './h.css'

new Vue({
  el: '#root',
  template: '<App/>',
  components: { App }
});

// 开启js的HMR
if (module.hot) {
  module.hot.accept();
}