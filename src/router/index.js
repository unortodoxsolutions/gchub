import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard, { ROUTE_NAME as ROUTE_NAME_DASHBOARD } from '../views/Dashboard.vue'
import Login, { ROUTE_NAME as ROUTE_NAME_LOGIN } from '../views/Login.vue'
import AuthCallback, { ROUTE_NAME as ROUTE_NAME_AUTH_CALLBACK } from '../views/AuthCallback.vue'
import { ROUTE_NAME as ROUTE_NAME_TRANSACTIONS } from '../views/Transactions.vue'
import { ROUTE_NAME as ROUTE_NAME_INCRESELIMIT } from '../views/increaseLimit.vue'
import { ROUTE_NAME as ROUTE_NAME_INCRESELIMITFORM } from '../views/increaseLimitForm.vue'
import { ROUTE_NAME as ROUTE_NAME_TICKETS } from '../views/Tickets.vue'
import { ROUTE_NAME as ROUTE_NAME_TICKET_DETAIL } from '../views/TicketDetail.vue'
import { ROUTE_NAME as ROUTE_NAME_TICKET_CREATE } from '../views/TicketCreate.vue'
import { ROUTE_NAME as ROUTE_NAME_LOGOUT } from '../views/Logout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: ROUTE_NAME_DASHBOARD,
    component: Dashboard
  },
  {
    path: '/hub/login',
    name: ROUTE_NAME_LOGIN,
    component: Login
  },
  {
    path: '/hub/auth-callback',
    name: ROUTE_NAME_AUTH_CALLBACK,
    component: AuthCallback
  },
  {
    path: '/hub/transactions',
    name: ROUTE_NAME_TRANSACTIONS,
    component: () => import(/* webpackChunkName: "Transactions" */ '../views/Transactions.vue')
  },
  {
    path: '/hub/increaselimit',
    name: ROUTE_NAME_INCRESELIMIT,
    component: () => import(/* webpackChunkName: "Transactions" */ '../views/increaseLimit.vue')
  },
  {
    path: '/hub/increaselimitform',
    name: ROUTE_NAME_INCRESELIMITFORM,
    component: () => import(/* webpackChunkName: "Transactions" */ '../views/increaseLimitForm.vue')
  },
  {
    path: '/hub/logout',
    name: ROUTE_NAME_LOGOUT,
    component: () => import(/* webpackChunkName: "Transactions" */ '../views/Logout.vue')
  },
  {
    path: '/hub/tickets',
    name: ROUTE_NAME_TICKETS,
    component: () => import(/* webpackChunkName: "Tickets" */ '../views/Tickets.vue')
  },
  {
    path: '/hub/ticket/new',
    name: ROUTE_NAME_TICKET_CREATE,
    component: () => import(/* webpackChunkName: "TicketCreate" */ '../views/TicketCreate.vue')
  },
  {
    path: '/hub/ticket/:id',
    name: ROUTE_NAME_TICKET_DETAIL,
    component: () => import(/* webpackChunkName: "TicketDetail" */ '../views/TicketDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
