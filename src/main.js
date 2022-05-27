import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$confirm = ElementUI.MessageBox.confirm
Vue.prototype.$message = ElementUI.Message

// 全局路由守卫,路由拦截: 路由跳转前拦截检查是否登录,如果没有登录,则跳转到登录页面,如果已经登录,则继续执行路由跳转,且已登录状态下,不能跳转到登录页面
router.beforeEach((to, from, next) => { 
  store.commit('getToken')
  const token = store.state.user.token
  if ( !token && to.path !== '/login') {
    next('/login')
  }else if( token && to.path === '/login') {
    next('/')
  }else {
    next()  
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
