import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import 'lib-flexible/flexible.js'
import { Button } from 'mint-ui';
import { Field } from 'mint-ui';
import { Search } from 'mint-ui';

Vue.component(Search.name, Search);
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
