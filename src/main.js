/* Styles */
import '@/scss/main.scss'
import Vue from 'vue'
import Buefy from 'buefy'
import router from './router'
import store from './store'
import App from './App.vue'

const defaultDocumentTitle = 'Time Scheduler'

router.afterEach(to => {
  if (to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }
})

Vue.config.productionTip = false

Vue.use(Buefy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
