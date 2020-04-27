import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import handleErrorMixin from './mixins/handle-error'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

// mixin the error handler to all components
Vue.mixin(handleErrorMixin)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
