<template>
	<view>
		<view class="search-box">
			<SearchBar @click="gotoSearch"></SearchBar>
		</view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id" class="swiper-item">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<!-- 分类导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
				<image class="nav-img" :src="item.image_src"></image>
			</view>
		</view>

		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- title -->
				<image class="floor-title" :src="item.floor_title.image_src"></image>
				<!-- 图片 -->
				<view class="floor-img-box">
					<!-- 左侧图片 -->
					<navigator :url='item.product_list[0].url' class="left-img-box">
						<image :src="item.product_list[0].image_src"
							:style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧图片 -->
					<view class="right-img-box">
						<navigator :url="item2.url" class="right-img-item" v-for="(item2,index2) in item.product_list"
							:key="index2">
							<image :src="item2.image_src" v-if="index2!==0" :style="{width:item2.image_width+'rpx'}"
								mode="widthFix"></image>
						</navigator>
					</view>
				</view>
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
				// 轮播图
				swiperList: [],
				// 分类导航
				navList: [],
				// 楼层
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				const {
					data: res
				} = await api.get('/api/public/v1/home/swiperdata')
				// console.log(res.message)
				if (res.meta.status !== 200) {
					return showMsg()
				}
				this.swiperList = res.message
			},
			async getNavList() {
				const {
					data: res
				} = await api.get('/api/public/v1/home/catitems')
				// console.log(res.message)
				if (res.meta.status !== 200) {
					return showMsg()
				}
				this.navList = res.message
			},
			async getFloorList() {
				const {
					data: res
				} = await api.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) {
					return showMsg()
				}

				res.message.forEach((floor) => {
					floor.product_list.forEach((item) => {
						item.url = '/subpkg/goods_list/goods_list?' + item.navigator_url.split('?')[1]
					})
				})
				console.log(res.message)
				this.floorList = res.message
			},
			navClickHandler(item) {
				// console.log(item)
				uni.switchTab({
					url: '/pages/cate/cate'
				})
			},
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-box{
		position: sticky;
		top: 0;
		z-index: 999;
	}
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15rpx 0rpx;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;
	}

	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>
