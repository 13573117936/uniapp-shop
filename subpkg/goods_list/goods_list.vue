<template>
	<view>
		<view class="goods-list">
			<view v-for="(item,index) in goodsList" :key="item.goods_id" @click="gotoDetail(item)">
				<goods-item :goods="item"></goods-item>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../http/service.js'
	import {
		showMsg
	} from '../../utils/utils.js'
	export default {
		data() {
			return {
				// 请求参数
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				total: 0,
				goodsList: [],
				loadMore: false
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
			// console.log(this.queryObj)
		},
		methods: {
			async getGoodsList(cb) {
				const {
					data: res
				} = await api.get('/api/public/v1/goods/search', this.queryObj)
				if (res.meta.status !== 200) {
					return showMsg()
				}
				console.log(res.message)
				this.total = res.message.total
				this.goodsList = [...this.goodsList, ...res.message.goods]
				cb && cb()
				this.loadMore = false
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},
		onReachBottom() {
			if (this.loadMore || this.goodsList.length >= this.total) return
			this.loadMore = true
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.pagenum = 1
			this.goodsList = []
			this.loadMore = false
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}

	}
</script>

<style lang="scss">
	.goods-item {
		padding: 10px 5px;
		display: flex;
		border-bottom: 1px solid #f0f0f0;

		image {
			width: 200px;
			height: 100px;
			display: block;
			margin-right: 5px;
		}

		.goods-info {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		.goods-name {
			font-size: 14px;
		}

		.goods-price {
			font-size: 16px;
			color: #c00000;
		}
	}
</style>
