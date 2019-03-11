// 导入Vue框架
import Vue from 'vue'
// 导入主视图文件
import App from './App'
// 导入路由文件
import {router} from './router'
// 导入状态管理器
import store from './store'
// 导入element组件
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局svg-icon组件
// 导入介绍组件的组件
import SvgIcon from '@/components/SvgIcon'
// 导入点击波浪组件
import EventBus from '@/utils/eventBus'
// filters
import * as filters from '@/utils/filters'
// 省市区联动选择
import 'vue-area-linkage/dist/index.css';
import VueAreaLinkage from 'vue-area-linkage';
Vue.use(VueAreaLinkage)

// 注册全局svg-icon组件
Vue.component('svg-icon', SvgIcon)
// 待开发组件提示
Vue.config.productionTip = false
Vue.prototype.$bus = EventBus

// 使用element-ui
Vue.use(ElementUi)

Object.keys(filters).forEach(key=> {
  Vue.filter(key,filters[key])
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
