<template>
	<view>
	<view class='user-box'>
		<view class='user-info'>
			<image src="../../static/logo.png"></image>
			

				
				
			</view>
			
		<view class='tabs' >
			<view class='box'>
				<view class='number'>0</view>
				<view class='text'>创作</view>
			</view>
			<view class='box'>
				<view class='number'>0</view>
				<view class='text'>赞同</view>
			</view>
			<view class='box'>
				<view class='number'>0</view>
				<view class='text'>喜欢</view>
			</view>
			<view class='box'>
				<view class='number'>0</view>
				<view class='text'>收藏</view>
			</view>	
			
		</view>
	</view>
	<view class='recently-viewed'>
		<view class='title'>最近游览</view>
		<view class='newsbox' v-for='i in 10'>
			<Newsbox @click.native="gotoDetail"></Newsbox>
		</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		
		},
		methods:{
			gotoDetail(){
				uni.navigateTo({
					url:"/pages/detail/detail"
				})
			}
		}
	}
</script>

<style lang="scss" scpoed>
	.recently-viewed{
		.title{
			padding:20rpx;
		}
		.newsbox{
			padding:0 10rpx;
		}
	}
	
	
.user-box{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 40vh; /* 使容器充满视口高度 */
  background-color: #FFFFFE; /* 米白色背景 */
  background-image: 
    radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, rgba(0, 0, 0, 0) 1px);
  background-size: 1px 1px; /* 控制颗粒的密度 */
  .tabs{
	  display: flex;
	  flex-direction: row;
	  justify-content: space-evenly;
	  align-items: center;
	  .box{
		  padding: 0 50rpx;
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  .number{
			  font-size: 2em;
		  }
		  .text{
			  font-weight: 100;
		  }
	  }
  }
	
	.user-info{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		
	image{
		  width: 10vh; /* 设置图片的宽度 */
		  height: 10vh; /* 设置图片的高度 */
		  border-radius: 50%; /* 将边框半径设为宽度的一半，形成圆形 */
		  // overflow: hidden; /* 隐藏溢出的部分 */
		  
	}	
	
	}
}
</style>
