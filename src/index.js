import Vue from 'vue';
import App from './app';
import VueRouter from 'vue-router'
import lodash from 'lodash'
Vue.use(VueRouter)
import './index.css'
import './h.css'
Vue.prototype._ = lodash;
new Vue({
  el: '#root',
  template: '<App/>',
  components: { App }
});

// 开启js的HMR
if (module.hot) {
  module.hot.accept();
}