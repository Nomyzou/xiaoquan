	<template>
		<view class="newsbox">
			<view class='header'> 
			<view :class="['rectangle',typeLabel]"> {{seqNum}}</view> 
			<view class='channel'> {{title}} </view>
			</view>
			<view class='content'>
				<view class='text'>
					<view class='te'>
					{{content}}
				</view> 
				</view>
				<view class='pic'>
					<img :src="pic" class='full-image' />
				</view>
			</view>
		
			
			
		</view>
	</template>

	<script>
		export default {
			name:"newsbox",
			data() {
				return {
					
				};
				
			},
			props:{
				seqNum:{
					type:Number,
					default:1
				},
				title:{
					type:String,
					default:"默认标签",
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
				      default: '../../static/images/geren.png' // 默认图片路径
				    },
				 pic: {
				      type: Array,
				      default: () => []
				    },
				
			},
			computed:{
				displayPic() {
				      // 如果 picurls 数组为空，则使用默认图片路径
				      return this.pic.length > 0 ? this.pic[0] : this.defaultPic;
				    }
			}
			
		}
	</script>

	<style lang="scss">
	.newsbox{
		.header{
			display: flex;
			
		.rectangle{
			
			margin-right: 20rpx;
			width:50rpx;
			height:40rpx;
			border-radius: 10rpx; /* 圆角半径 */
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.dz{
			background: linear-gradient(to right, #ffeb3b, #ffc107); /* 渐变颜色从浅黄色到深黄色 */
			
		}
		.xz{
			background:linear-gradient(to right,#00AB5B,#0EAB52);
		}
		.tz{
			background:linear-gradient(to right,#0097FF,#24BBFC) ;
		}
		}
		.content{
		display:flex;
		justify-content: space-between;
		overflow: hidden; /* 确保图片不会超出容器 */
		
		.text{
			
			flex:1;
			padding-right: 10rpx;
			 .te{
				 display: -webkit-box;
				  -webkit-box-orient: vertical;
				  -webkit-line-clamp: 3;
				  overflow: hidden;
				  text-overflow: ellipsis;
			 }
		}
	}
		.pic{
			width: 230rpx;
			height: 160rpx;
			image{
				width: 100%;
				height: 100%;
				object-fit: contain; /* 使图片覆盖容器，同时保持纵横比 */

			}
		}
	}
	.full-image {
  width: 100%; /* 宽度适应父容器 */
  height: auto; /* 高度根据宽度自动调整，保持比例 */
  object-fit: contain; /* 确保图片完整显示而不裁剪 */
}
	</style>