// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import login from './components/login'
import register from './components/register'
import showvote from './components/showvote'
import userhome from './components/userHome'

Vue.use(VueRouter)
Vue.use(ElementUI)

const routes = [
  {path: '/', component: App},
  {path: '/login', component: login},
  {path: '/register', component: register},
  {path: '/userhome', component: userhome},
  {path: '/:id', component: showvote, props: true}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
})
