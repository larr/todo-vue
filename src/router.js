import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import LandingPage from './components/marketing/LandingPage'
import App from './App'
import About from './components/marketing/About'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import Register from './components/auth/Register'
import TestTodosVariable from './components/marketing/TestTodosVariable'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/todo',
      name: 'todo',
      component: App,
      meta: {
        requiresAuth: true
      }
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: function () {
      //   return import(/* webpackChunkName: "about" */ './views/About.vue')
      // }
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/todos/:id',
      name: 'todos',
      component: TestTodosVariable
    },
  ]
})
