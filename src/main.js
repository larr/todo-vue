import Vue from 'vue'
import Master from './components/layouts/Master'
import router from './router'
import {store} from './store/store'
import VeeValidate from 'vee-validate'
import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'

const toastrConfigs = {
  position: 'bottom right',
  showDuration: 2000,
  timeOut: 5000,
  progressBar: true
}

window.eventBus = new Vue

Vue.config.productionTip = false
Vue.use(VeeValidate)
Vue.use(CxltToastr, toastrConfigs)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        path: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.loggedIn) {
      next({
        path: 'todo',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

new Vue({
  router,
  store:store,
  render: function (h) { return h(Master) }
}).$mount('#app')
