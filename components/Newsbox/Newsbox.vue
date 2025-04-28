	<template>
		<view class="newsbox">
			<view class='header'> 
				<view :class="['rectangle', typeLabel]"> 
					<text class="seq-num">{{seqNum}}</text>
				</view> 
				<text class='channel'>{{title}}</text>
			</view>
			<view class='content'>
				<view class='text'>
					<text class='content-text'>{{content}}</text>
				</view>
				<view class='pic'>
					<image :src="displayPic" class='news-image' mode="aspectFill" />
				</view>
			</view>
		</view>
	</template>

	<script>
		export default {
			name:"newsbox",
			props:{
				seqNum:{
					type:Number,
					default:1
				},
				title:{
					type:String,
					default:"默认标签"
				},
				content:{
					type:String,
					default:"这里是默认内容"
				},
				typeLabel:{
					type:String,
					default:'tz'
				},
				defaultPic: {
					type: String,
					default: '../../static/images/geren.png'
				},
				pic: {
					type: Array,
					default: () => []
				}
			},
			computed:{
				displayPic() {
					return this.pic.length > 0 ? this.pic[0] : this.defaultPic;
				}
			}
		}
	</script>

	<style lang="scss">
	.newsbox {
		padding: 20rpx;
		background-color: #fff;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
		
		.header {
			display: flex;
			align-items: center;
			margin-bottom: 16rpx;
			
			.rectangle {
				width: 50rpx;
				height: 40rpx;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 20rpx;
				
				.seq-num {
					color: #fff;
					font-size: 24rpx;
					font-weight: bold;
				}
				
				&.dz {
					background: linear-gradient(135deg, #ffeb3b, #ffc107);
				}
				
				&.xz {
					background: linear-gradient(135deg, #00AB5B, #0EAB52);
				}
				
				&.tz {
					background: linear-gradient(135deg, #0097FF, #24BBFC);
				}
			}
			
			.channel {
				font-size: 28rpx;
				font-weight: bold;
				color: #333;
			}
		}
		
		.content {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			gap: 20rpx;
			
			.text {
				flex: 1;
				min-width: 0; // 防止文本溢出
				
				.content-text {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 26rpx;
					color: #666;
					line-height: 1.5;
				}
			}
			
			.pic {
				width: 230rpx;
				height: 160rpx;
				border-radius: 8rpx;
				overflow: hidden;
				flex-shrink: 0;
				
				.news-image {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
		}
	}
	</style>