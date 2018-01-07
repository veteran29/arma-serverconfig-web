import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueHighlightJS from "vue-highlightjs";
import App from './App.vue'

Vue.use(BootstrapVue);
Vue.use(VueHighlightJS);

new Vue({
  el: '#app',
  render: h => h(App)
})
