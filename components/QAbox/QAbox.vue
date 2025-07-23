<template>
	<view class='QAbox'>
		<view class='userPic'>
			<u-image :src="userInfo.avatarUrl" shape="circle" width="80rpx" height="80rpx"></u-image>
		</view>
		
		<view class='content-wrapper'>
			<view class='userInfo'>
				<text class='name'>{{  userInfo.nickName }}</text>
				<text class='word'>{{ content }}</text>
			</view>
			
			<view class='time'>2025-04-16 10:00:00</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"QAbox",
		props: {
			content: {
				type: String,
				default: ''
			},
			userInfo: {
				type: Object,
				default: () => ({
					nickName: '未知用户',
					avatarUrl: 'https://cdn.uviewui.com/uview/album/1.jpg'
				})
			}
		},
		data() {
			return {
				
			};
		},
		onLoad() {
			console.log('content',this.content)
		}
	}
</script>

<style lang="scss">
.QAbox {
	display: flex;
	flex-direction: row;
	padding: 20rpx;
	background-color: #fff;
	border-radius: 12rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	
	.userPic {
		margin-right: 20rpx;
	}
	
	.content-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	
	.userInfo {
		display: flex;
		flex-direction: column;
		margin-bottom: 10rpx;
		
		.name {
			font-size: 28rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 8rpx;
		}
		
		.word {
			font-size: 26rpx;
			color: #666;
			line-height: 1.5;
		}
	}
	
	.time {
		font-size: 24rpx;
		color: #999;
		align-self: flex-end;
	}
}
</style>