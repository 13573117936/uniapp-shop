// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// import {
// 	$http
// } from '@escook/request-miniprogram'
// uni.$http = $http
// console.log(uni)
// $http.baseUrl = 'https://www.uniav.com'

// $http.beforeRequest = function() {
// 	uni.showLoading({
// 		title: '加载中...'
// 	})
// }

// $http.afterRequest = function() {
// 	uni.hideLoading()
// }

Vue.config.productionTip = false

App.mpType = 'app'

// 
// 请求根路径


const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import Appv from './App.vue'
export function createApp() {
	const app = createSSRApp(Appv)
	return {
		app
	}
}
// #endif
