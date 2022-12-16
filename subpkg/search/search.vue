<template>
	<view class="search-box">
		<uni-search-bar @input="handleInput" :radius="18" cancelButton="none" focus="true" />
	</view>
	<!-- 商品列表 -->
	<view class="goods-list" v-if="searchResults.length!==0">
		<view class="goods-item" v-for="(item,index) in searchResults" :key="item.goods_id" @click="gotoDetail(item)">
			<view class="goods-name">
				{{item.goods_name}}
			</view>
			<uni-icons type="right" size="16"></uni-icons>
		</view>
	</view>
	<!-- 搜索历史 -->
	<view class="history-box" v-else>
		<!-- 标题 -->
		<view class="history-title">
			<text>搜索历史</text>
			<uni-icons @click="deleteHistory()" type="trash" size="19"></uni-icons>
		</view>
		<!-- 历史记录 -->
		<view class="history-list">
			<view @click="gotoList(item)" class="history-item" v-for="(item,index) in history" :key="index">
				{{item}}
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
				timer: null,
				content: '',
				searchResults: [],
				historyList: []
			};
		},
		computed: {
			history() {
				return [...this.historyList].reverse()
			}
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('searchHistory'))
		},
		methods: {
			// 输入事件 防抖
			handleInput(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					// console.log(e)
					this.content = e
					this.getSearchList()
				}, 500)
			},
			async getSearchList() {
				if (this.content === '') {
					this.searchResults = []
					return
				}
				const {
					data: res
				} = await api.get('/api/public/v1/goods/qsearch', {
					query: this.content
				})
				if (res.meta.status !== 200) {
					showMsg()
				}
				// console.log(this.historyList)
				this.saveHistory()
				this.searchResults = res.message
			},
			// 跳转商品详情
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			// 跳转商品列表
			gotoList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + item
				})
			},
			// 保存搜索记录到本地
			saveHistory() {
				let set = new Set(this.historyList)
				set.delete(this.content)
				set.add(this.content)
				this.historyList = Array.from(set)
				uni.setStorageSync('searchHistory', JSON.stringify(this.historyList))
			},
			// 删除搜索记录
			deleteHistory() {
				this.historyList = []
				uni.setStorageSync('searchHistory', '[]')
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		background-color: #c00000;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		// padding: 0 20px;
		position: sticky;
		top: 0;
		z-index: 999;

		uni-search-bar {
			width: 100%;
		}
	}

	.goods-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 10px;
		border-bottom: 1px solid #efefef;

		.goods-name {
			font-size: 12px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}

	.history-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 5px;
		line-height: 40px;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
	}

	.history-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 5px;

		.history-item {
			padding: 5px 13px;
			border-radius: 4px;
			background-color: #efefef;
			margin: 5px 5px 0 0;
			font-size: 13px;
		}
	}
</style>
