import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./../layout/index.vue'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/goApproval',
        name: 'goApproval',
        component: () => import('@/views/approval/goApproval.vue')
      },
      {
        path: '/myApproval',
        name: 'myApproval',
        component: () => import('@/views/approval/myApproval.vue')
      },
      {
        path: '/querryMyApply',
        name: 'querryMyApply',
        component: () => import('@/views/approval/querryMyApply.vue')
      },
      {
        path: '/myApprovalRecord',
        name: 'myApprovalRecord',
        component: () => import('@/views/approval/myApprovalRecord.vue')
      },
      {
        path: '/mine',
        name: 'Mine',
        component: () => import('@/views/mine.vue')
      },
      {
        path: '/approvalDetail',
        name: 'approvalDetail',
        component: () => import('@/views/approval/approvalDetail.vue')
      },
      {
        path: '/h5login',
        name: 'h5login',
        component: () => import('@/views/login/h5login.vue')
      },
      {
        path: '/ddqhbind',
        name: 'ddqhbind',
        component: () => import('@/views/login/ddqhBind.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
