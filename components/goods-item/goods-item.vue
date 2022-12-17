<template>
	<view class="goods-item">
		<image :src="goods.goods_small_logo"></image>
		<view class="goods-info">
			<view class="goods-name">
				{{goods.goods_name}}
			</view>
			<view class="goods-price">
				￥{{goods.goods_price}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "GoodsItem",
		data() {
			return {

			};
		},
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		methods: {
			fix(num) {
				return Number(num).toFixed(2)
			}
		},

	}
</script>

<style lang="scss">
	.goods-item {
		padding: 10px 5px;
		display: flex;
		border-bottom: 1px solid #f0f0f0;

		image {
			width: 210px;
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
