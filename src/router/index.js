import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView'
import UserListView from '../views/UserListView'
import UserProfileView from '../views/UserProfileView'
import LoginView from '../views/LoginView'
import RegisterView from '../views/RegisterView'
import NotFoundView from '../views/NotFound'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/UserList/',
    name: 'UserList',
    component: UserListView
  },
  {
    path: '/UserProfile/:userId/',
    name: 'UserProfile',
    component: UserProfileView
  },
  {
    path: '/Login/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/Register/',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/404/',
    name: 'NotFound',
    component: NotFoundView
  },
  {
    path: '/:catchAll(.*)',
    redirect:'/404/'
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
