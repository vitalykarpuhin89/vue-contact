import Vue from 'vue'
import Vuelidate from 'vuelidate'

import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import profileContacts from '@/components/ProfileContacts.vue'

Vue.use(VueRouter)
Vue.use(Vuelidate)

const routes = [
{
  path: '/',
  name: 'register',
  component: Register
},

{
  path: '/registration',
  name: 'registration',
  component:() => import('@/components/Registration.vue')
},

{
  path: '/profileContacts',
  name: 'profileContacts',
  component: profileContacts
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
