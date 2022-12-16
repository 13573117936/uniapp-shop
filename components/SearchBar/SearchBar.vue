<template>
	<view @click="handleClick" class="search-container" :style="{backgroundColor:bgcolor}">
		<view class="search-box" :style="{borderRadius:radius}">
			<uni-icons type="search" size="17"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "SearchBar",
		props: {
			bgcolor: {
				type: String,
				default: '#c00000'
			},
			radius: {
				type: Number,
				default: 18 // px
			}
		},
		data() {
			return {

			};
		},
		methods: {
			handleClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.search-container {
		background-color: #c00000;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 10px;

		.search-box {
			height: 33px;
			background-color: #fff;
			font-size: 15px;
			border-radius: 18px;
			line-height: 33px;
			text-align: center;
			width: 100%;

			text {
				margin-left: 5px;
			}
		}
	}
</style>
