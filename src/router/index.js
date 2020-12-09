import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    meta: {
      title: '我的余额'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '代理商登录'
    }
  },
  {
    path: '/withdraw',
    name: 'withdraw',
    component: () => import('@/views/withdraw.vue'),
    meta: {
      title: '提现'
    }
  },
  {
    path: '/userList',
    name: 'userList',
    component: () => import('@/views/userList.vue'),
    meta: {
      title: '用户注册列表'
    }
  },
  {
    path: '/invite',
    name: 'invite',
    component: () => import('@/views/invite.vue'),
    meta: {
      title: '邀请码'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register.vue'),
    meta: {
      title: '注册'
    }
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
	// Vue.prototype.$hideLoading();
  if (to.meta.title) {
    document.title = to.meta.title // 设置当前页面的title
  }
  next();
})

export default router
