<template>
	<view class='QAbox'>
		<view class='userPic'>
				<u-image src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle" width="50rpx" height="50rpx"></u-image>
		</view>
		
		<view class='userInfo'>
			<text class='name'>小凡古</text>
			<text class='word'>{{ content }}</text>
		</view>
		
		<view class='time'>2025-04-16 10:00:00</view>
	</view>
</template>

<script>
	export default {
		name:"QAbox",
		props: {
			content: {
				type: String,
				default: '我想知道问题是什么'
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
.QAbox{
	display: flex;
	flex-direction: row;
	.userInfo{
		display: flex;
		flex-direction: column;
	}
}
</style>