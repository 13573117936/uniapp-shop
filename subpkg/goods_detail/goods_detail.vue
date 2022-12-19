<template>
	<view class="goods-detail" v-if="goodsInfo.goods_name">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="(item,index) in goodsInfo.pics" :key="index">
				<image :src="item.pics_big"></image>
			</swiper-item>
		</swiper>
		<view class="goods-info-box">
			<!-- 价格 -->
			<view class="goods-price">
				￥{{goodsInfo.goods_price}}
			</view>
			<!-- 商品名 -->
			<view class="goods-name">
				<view class="name">
					{{goodsInfo.goods_name}}
				</view>
				<view class="icon">
					<uni-icons type="star" size="16"></uni-icons>
					<text>收藏</text>
				</view>

			</view>
			<!-- 运费 -->
			<view class="goods-trans">
				快递：免运费
			</view>
		</view>
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		<!-- 商品导航 -->
		<view class="goods-nav">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
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
				goodsInfo: {},
				options: [{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				],
			};
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodsInfo(goods_id)
		},
		methods: {
			async getGoodsInfo(goods_id) {
				const {
					data: res
				} = await api.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return showMsg()

				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;"').replace(/webp/g, 'jpg')
				console.log(res)
				this.goodsInfo = res.message
			},
			onClick(e) {
				if(e.content.text==='购物车')
				uni.switchTab({
					url:'/pages/cart/cart'
				})
			},
			buttonClick(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-box {
		padding: 10px;
		padding-right: 0;
		background-color: white;

		.goods-price {
			margin: 10px 0;
			color: #c00000;
		}

		.goods-name {
			display: flex;
			justify-content: space-between;

			.name {
				font-size: 13px;
				margin-right: 10px;
			}

			.icon {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 120px;
				border-left: 1px solid #efefef;
				font-size: 12px;
				color: gray;
			}
		}

		.goods-trans {
			font-size: 12px;
			color: gray;
			margin: 10px 0;
		}
	}

	.goods-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.goods-detail {
		padding-bottom: 50px;
	}
</style>
