//引入Vuex
import { createStore } from 'vuex'
//创建并暴露store
export default createStore({
	actions:{
		set(store,key,value) {
			localStorage.setItem(key, value);
		},
		get(store,key) {
			return localStorage.getItem(key);
		},
		setToken(store,value) {
			localStorage.setItem('VmtjNWNscFhOQT09', value);
			store.commit('setToken', value)
		},
		getToken(store) {
			let value = localStorage.getItem('VmtjNWNscFhOQT09');
			store.commit('setToken', value)
		},
		logout(store) {
			localStorage.removeItem('VmtjNWNscFhOQT09');
			store.commit('setToken', '')
		}
	},
	mutations:{
		//设置token
		setToken(state,token){
			state.token = token
		},
	},
	state:{
		token:'',//存储token
	},
	getters:{
	},
})