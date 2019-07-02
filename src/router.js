import Vue from 'vue'
import VueRouter from 'vue-router'

import WelcomePage from './components/welcome.vue'
import SigninPage from './components/signin.vue'
import Dashboard from '@/components/dashboard.vue'
import store from '@/store/store'
import customAxios from '@/utils/axios-auth'
//using the vue router in vue application
Vue.use(VueRouter)

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/signin', component: SigninPage },
  { path: '/dashboard', component: Dashboard,
  // This is navigation gaurd used to protect the route. It will be redirected only if the token is available
  //next() is important. If next() is missing, then the route will not redirected
    beforeEnter (to,from,next) {
      if (store.state.token) {
        next()
      } else {
        next('/signin')
      }
    }
  }
]

export default new VueRouter({mode: 'history', routes})