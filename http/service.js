import {
	$http
} from '@escook/request-miniprogram'


const api = $http

api.baseUrl = 'https://www.uinav.com'
api.beforeRequest = function() {
	uni.showLoading({
		title: '加载中...'
	})
}

api.afterRequest = function() {
	uni.hideLoading()
}

export default api
