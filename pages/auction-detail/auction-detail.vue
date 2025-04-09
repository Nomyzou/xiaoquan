<template>
	<view class='esDetail'>
		<view class='header'>
			<view class='user'>  
			<u-image src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle" width="50rpx" height="50rpx"></u-image>
			<view class='user_info'>				
				<text>鱼刺</text>
			</view>
			</view>
			
			<view class='price'>
				<text class='fh'>¥</text>
				<text class='number'>100</text>
			</view>
		</view>
		
		<view class='detail'>
			仅用两个月!RTX3060电脑台式电脑主机组装机吃鸡永劫制图多开台毫无压力
			
			不满意可以退
		</view>
		<view class='images'>
		
		<u-image src='https://cdn.uviewui.com/uview/album/1.jpg' radius='20rpx'></u-image>
		</view>
		
		<view class='images'>
			
			
			<u-album :urls="urls2" keyName="src2"></u-album>

		</view>
		
		<view class='gap'>
			留言
		</view>
		
		<view class="QA">
			<view class='card'>
				<view class='user'>  
					<view class='userPic'>
					<u-image src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle" width="50rpx" height="50rpx"></u-image>
					</view>
				<view class='user_info'>				
					<text>鱼刺</text>
					<text>什么显示屏</text>
					<QAbox></QAbox>
				</view>
				</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				urls2: [
				                    'https://cdn.uviewui.com/uview/album/1.jpg',
				                    'https://cdn.uviewui.com/uview/album/2.jpg',
				                    'https://cdn.uviewui.com/uview/album/3.jpg',
				                    'https://cdn.uviewui.com/uview/album/4.jpg',
				                    'https://cdn.uviewui.com/uview/album/5.jpg',
				                    'https://cdn.uviewui.com/uview/album/6.jpg',
				                    'https://cdn.uviewui.com/uview/album/7.jpg',
				                    'https://cdn.uviewui.com/uview/album/8.jpg',
				                    'https://cdn.uviewui.com/uview/album/9.jpg',
				                    'https://cdn.uviewui.com/uview/album/10.jpg',
				                ],
			};
		}
	}
</script>

<style lang="scss">
.esDetail{
	.header{
		padding: 50rpx 50rpx 0 0;
		.user{
		display: flex;
		flex-direction: row;
	}
	.price{
		.fh{
			font-size: 50rpx;
			color: darkred;
		}
		.number{
			font-size: 75rpx;
			color: #F72525;
			
		}
		
	}
	}
	
	.detail{
	 

		display: flex;
		justify-content: center;
	}
	
	.images{
		display: flex;
		justify-content: center;
	}
	.QA{
		.card{
			.user{
				display: flex;
				flex-direction: row;
				.user_info{
					display: flex;
					flex-direction: column;
				}
			}
		}
	}
	.gap{
		padding:20rpx;
		font-size: 50rpx;
		font-weight: 500;
	}
	
}
</style>
