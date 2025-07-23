	<template>
		<view class="newsbox" :class="{'job-box': isOuterJob}" @click="onClick">
			<!-- 校外兼职特殊布局 -->
			<template v-if="isOuterJob">
				<view class="job-container">
					<view class="job-left">
						<!-- 使用单一连体字样式 -->
						<view class="job-text-container">
							<text class="job-text job-we">We</text>
							<text class="job-text job-want">Want</text>
							<text class="job-text job-you">You</text>
						</view>
					</view>
					<view class="job-right">
						<text class="job-title">{{title}}</text>
						<text class="job-salary">{{getSalary(content)}}</text>
					</view>
				</view>
			</template>
			
			<!-- 普通布局 -->
			<template v-else>
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
			</template>
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
				},
				situation: {
					type: String,
					default: 'inner'
				}
			},
			computed:{
				displayPic() {
					return this.pic.length > 0 ? this.pic[0] : this.defaultPic;
				},
				isOuterJob() {
					// 判断是否为校外兼职
					return this.situation === 'outer' && this.typeLabel === 'jz';
				}
			},
			methods: {
				// 从内容中提取薪资信息
				getSalary(content) {
					// 尝试从内容中提取薪资信息，如果没有则返回默认值
					const salaryPattern = /(\d+[\-\~]?\d*元\/[天月时]|\d+[\-\~]?\d*[kK]?\/[天月时])/;
					const match = content.match(salaryPattern);
					
					if (match && match[0]) {
						return match[0];
					} else {
						// 如果没有找到薪资格式，返回一个默认值
						return "薪资面议";
					}
				},
				// 点击整个组件时触发
				onClick() {
					this.$emit('click');
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
		
		// 校外兼职特殊样式
		&.job-box {
			padding: 0;
			overflow: hidden;
			
			.job-container {
				display: flex;
				height: 180rpx;
				
				.job-left {
					width: 25%;
					background: linear-gradient(135deg, #2D3436, #4A5859);
					position: relative;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					overflow: hidden;
					
					// 装饰元素
					&::before {
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						height: 2rpx;
						background: linear-gradient(to right, transparent, rgba(255, 215, 0, 0.5), transparent);
					}
					
					&::after {
						content: '';
						position: absolute;
						bottom: 0;
						left: 0;
						right: 0;
						height: 2rpx;
						background: linear-gradient(to right, transparent, rgba(255, 215, 0, 0.5), transparent);
					}
					
					.job-text-container {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						position: relative;
						
						// 连体字效果的装饰线
						&::after {
							content: '';
							position: absolute;
							left: 50%;
							top: 15%;
							bottom: 15%;
							width: 1px;
							background: linear-gradient(to bottom, transparent, rgba(255, 215, 0, 0.3), transparent);
							transform: translateX(-50%);
						}
					}
					
					.job-text {
						font-family: 'Baskerville', 'Didot', 'Bodoni MT', serif;
						font-style: italic;
						color: #D4AF37; // 古金色
						text-align: center;
						position: relative;
						text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
						
						// 共同的连体字特性
						&::after {
							content: '';
							position: absolute;
							height: 1px;
							background: linear-gradient(to right, transparent, #D4AF37, transparent);
							left: 10%;
							right: 10%;
						}
						
						&.job-we {
							font-size: 34rpx;
							letter-spacing: 1rpx;
							transform: rotate(-2deg);
							margin-bottom: 2rpx;
							
							&::after {
								bottom: -2rpx;
							}
						}
						
						&.job-want {
							font-size: 38rpx;
							letter-spacing: 0;
							margin-bottom: 2rpx;
							
							&::after {
								bottom: -2rpx;
							}
						}
						
						&.job-you {
							font-size: 44rpx;
							letter-spacing: 1rpx;
							transform: rotate(2deg);
							
							// 装饰性花纹
							&::before {
								content: '~';
								position: absolute;
								bottom: -15rpx;
								left: 50%;
								transform: translateX(-50%) scaleX(2);
								font-size: 24rpx;
								color: rgba(212, 175, 55, 0.7);
							}
						}
					}
				}
				
				.job-right {
					width: 75%;
					padding: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					background: linear-gradient(to right, #f8f9fa, #ffffff);
					
					.job-title {
						font-size: 32rpx;
						font-weight: bold;
						color: #333;
						margin-bottom: 15rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					
					.job-salary {
						font-size: 28rpx;
						color: #2D3436;
						font-weight: bold;
						display: flex;
						align-items: center;
						
						&::before {
							content: '';
							display: inline-block;
							width: 8rpx;
							height: 8rpx;
							border-radius: 50%;
							background-color: #D4AF37;
							margin-right: 10rpx;
						}
					}
				}
			}
		}
		
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
				
				&.jz {
					background: linear-gradient(135deg, #2D3436, #4A5859);
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