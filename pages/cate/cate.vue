<template>
	<view>
		<SearchBar @click="gotoSearch"></SearchBar>
		<view class="scroll-view-container">
			<!-- 左侧滑动区 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height : wh + 'px'}">
				<view :class="['left-scroll-view-item',index===active ? 'active' :'']" v-for="(item,index) in cateList"
					:key="item.cat_id" @click="activeChange(index)">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<!-- 右侧滑动区 -->
			<scroll-view scroll-y="true" style="height: 300px;" :style="{height : wh + 'px',background:'#fff'}">
				<!-- 二级分类 -->
				<view class="cate-lv2" v-for="(item2,index2) in cateLevel2" :key="item2.cat_id">
					<view class="cate-lv2-title" v-if="item2.children!==undefined">
						{{item2.cat_name}}
					</view>
					<view class="cate-lv3">
						<view class="cate-lv3-item" v-for="(item3,index3) in item2.children" :key="item3.cat_id"
							@click="gotoGoodsList(item3)">
							<image :src="imageUrl(item3.cat_icon)"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
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
				wh: 0,
				cateList: [],
				active: 0,
				cateLevel2: []
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			this.getCateList()
		},
		methods: {
			async getCateList() {
				const {
					data: res
				} = await api.get('/api/public/v1/categories')
				if (res.meta.status !== 200) {
					showMsg()
				}
				// console.log(res.message[this.active].children)
				this.cateList = res.message
				this.cateLevel2 = res.message[0].children
			},
			activeChange(index) {
				this.active = index
				this.cateLevel2 = this.cateList[index].children
				console.log(this.cateLevel2)
			},
			// 接口返回地址中图片地址无效，其中dev需要改成web才可使用
			imageUrl(url) {
				const arr = url.split('dev')
				return arr[0] + 'web' + arr[1]
			},
			gotoGoodsList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			},
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;

			.left-scroll-view-item {
				text-align: center;
				line-height: 60px;
				background-color: #f7f7f7;
				font-size: 12px;

				&.active {
					background-color: #fff;
					position: relative;

					&:before {
						content: ' ';
						display: block;
						background-color: #c00000;
						width: 3px;
						height: 30px;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}
				}
			}
		}
	}

	.cate-lv2-title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 10px 0;
		border-bottom: 1px solid #f7f7f7;
	}

	.cate-lv3 {
		display: flex;
		flex-wrap: wrap;

		.cate-lv3-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-bottom: 10px;
			width: 33.33%;

			image {
				width: 60px;
				height: 60px;
			}

			text {
				font-size: 12px;
			}
		}
	}
</style>
