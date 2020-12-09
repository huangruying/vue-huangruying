import Vue from 'vue'
import App from './App.vue'
import router from './router'

// icon 字体图标库，初始化样式
// import './iconfont/iconfont.css'
import './styles/base.css'

// 全局导入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 字体适配
import 'lib-flexible/flexible'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
