import Vue from 'vue'
import MyVueRouter from './my_vue_router'

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Hellow from './components/HelloWorld.vue'

Vue.use(MyVueRouter)

export default new MyVueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: Home },
    {
      path: '/login',
      component: Login,
      children: [
        {
          path: '/hellow',
          component: Hellow,
        },
      ],
    },
  ],
})
