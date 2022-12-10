<template>
	<view>
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
			<view class="nav-item" v-for="(item,index) in navList" :key="index">
				<image class="nav-img" :src="item.image_src"></image>
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
				swiperList: [],
				navList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
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
				// console.log(uni.$http)
				const {
					data: res
				} = await api.get('/api/public/v1/home/catitems')
				console.log(res.message)
				if (res.meta.status !== 200) {
					return showMsg()
				}
				this.navList = res.message
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}
	.nav-list{
		display: flex;
		justify-content: space-around;
		margin: 15rpx 0rpx;
		.nav-img{
			width: 128rpx;
			height: 140rpx;
		}
	}
</style>
