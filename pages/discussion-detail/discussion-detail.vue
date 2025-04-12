<template>
	<view class='tieba'>
		<view class='main'>
			<view class='title'>对于异形：夺命舰逆袭有什么看法?</view>
			<view class='detail'>
				<text>如何看待异形：夺命舰票房过十亿</text>
				<view class='button'>
					<u-button size='small' type='primary' plain @click="gotoWriteAnswer">写回答</u-button>
				</view>
			</view>
		</view>
		<view class='answer_title'>
			<text>回答 33</text></view>
		<view class='anwserBox'>
			<tbBox class='box' v-for="item in 10"></tbBox>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			gotoWriteAnswer() {
				uni.navigateTo({
					url: '/pages/write-answer/write-answer'
				});
			}
		}
	}
</script>

<style lang="scss">
.tieba{
	background-color: #F8F8F8;
	
	.main{
		background-color: white;
		padding-left: 2%;
		padding-bottom: 50rpx;
		.title{
			font-weight: 600;
			font-size: 40rpx;
		}
		.detail{
			.button{
				margin-left: 70%;
				width:20%
			}
		}
	}
	.answer_title{
		padding-left: 2%;
		font-weight: 500;
		background-color: #F8F8F8;
		height: 100rpx;
		display: flex;
		align-items: center;
		
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2); /* 灰色阴影 */


	}
	.anwserBox{
		.box{
		
		margin-top: 40rpx;
		}
	}
}
</style>
