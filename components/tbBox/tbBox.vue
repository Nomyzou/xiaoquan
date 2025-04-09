<template>
	<view class='tbBox'>
		<view class='header'>
			<u-image src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle" width="50rpx" height="50rpx"></u-image>
			<text>鱼刺</text>
		

			
		</view>
		<view class='content'>
			
		要说什么才可以呢要说什么才可以呢要说什么才可以呢要说什么才可以呢要说什么才可以呢要说什么才可以呢要说什么才可以呢要说什么才可以呢
		要说什么才可以呢要说什么才可以呢要说什么才可以呢要说什么才可以呢要说什么才可以呢要说什么才可以呢要说什么才可以呢要说什么才可以呢
		要说什么才可以呢要说什么才可以呢要说什么才可以呢要说什么才可以呢要说什么才可以呢要说什么才可以呢要说什么才可以呢要说什么才可以呢
		</view>
	</view>
</template>

<script>
	export default {
		name:"tbBox",
		data() {
			return {
				
			};
			
		}
	}
</script>

<style lang="scss">
.tbBox{
	background-color: white;
	.header{
		display: flex;
		flex-direction: row;
	}
	.content{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}
}
</style>