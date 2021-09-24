import Vue from 'vue'
import 'default-passive-events'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css
import './elementUI'
import 'lib-flexible'
import App from './App'
import lodash from 'lodash'
import store from './store'
import '@/permission' // permission control
import router from './router'
import '@/icons' // icon
Vue.prototype.$store = store
// 在页面刷新时将store中的数据保存到sessionStorage中
Vue.prototype.$_ = lodash
// 在页面刷新后获取sessionStorage中的token
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
