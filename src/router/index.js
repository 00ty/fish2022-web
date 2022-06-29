import {createRouter, createWebHashHistory} from 'vue-router'
import store from '@/store'

let routes = [
	{
      path: '/',
      redirect: '/home'
	},{
		path: '/home',
		// 需要底部导航添加
		meta: {navShow: true},
		component: () => import('@/views/Home.vue')
	},{ // 测试页面
		path: '/test',
		component: () => import('@/views/Test.vue')
	},{ // 论坛
		path: '/bbs',
		meta: {navShow: true},
		component: () => import('@/views/Bbs.vue')
	},{ // 仓库
		path: '/store',
		meta: {navShow: false},
		component: () => import('@/views/store/Store.vue')
	},
	{ // 仓库设置
		path: '/store/setting',
		meta: {navShow: false},
		component: () => import('@/views/store/setting/Setting.vue')
	},
	{ // 仓库用户管理
		path: '/store/user',
		meta: {navShow: false},
		component: () => import('@/views/store/user/User.vue')
	},
]

let userRoutes = [
	{
		path: '/user', 
		// 需要底部导航添加
		meta: {navShow: true},
		component: () => import('@/views/user/Home.vue')
	},{
		path: '/register',
		component: () => import('@/views/user/Register.vue')
	} 
]

let serviceRoutes = [
	{
		path: '/service',
		// 需要底部导航添加
		meta: {navShow: true},
		component: () => import('@/views/service/Home.vue')
	}
]

routes = routes.concat(userRoutes)
routes = routes.concat(serviceRoutes)


const router = new createRouter({
	history: createWebHashHistory(),
	routes
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
	// 返回 false 以取消导航
	// 获取 token
	let token = store.state.token
	if(to.path == '/register') {
		if(!token) {
			next()
		} else {
			next({ path: '/home' })
		}
	} else {
		if(!token) {
			next({ path: '/register' })
		} else {
			// 否则继续执行
			next()
		}
	}
})

export default router