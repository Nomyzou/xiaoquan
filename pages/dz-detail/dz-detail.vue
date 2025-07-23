<template>
	<view class="dz-detail">
		<!-- 头部框 -->
		<view class="header">
			<view class="title-container">
				<text class="title">{{detailData.head}}</text>
				<view class="count">
					<text class="count-text">{{detailData.currentCount || 0}}/{{detailData.maxCount || 1}}</text>
					<text class="count-label">申请人数</text>
				</view>
			</view>
		</view>
		
		<!-- 中部框：内容 -->
		<view class="content">
			<view class="info-section">
				<view class="info-item">
					<text class="label">发布者</text>
					<text class="value">{{detailData.hb}}</text>
				</view>
				<view class="info-item">
					<text class="label">类型</text>
					<text class="value type-tag">{{detailData.type}}</text>
				</view>
				<view class="info-item">
					<text class="label">发布时间</text>
					<text class="value">{{formatTime(detailData.posttime)}}</text>
				</view>
			</view>
			
			<view class="description">
				<text class="label">详细描述</text>
				<text class="value">{{detailData.detail}}</text>
			</view>
		</view>
		
		<!-- 下部框：图片 -->
		<view class="image-section" v-if="detailData.picurls && detailData.picurls.length > 0">
			<text class="section-title">相关图片</text>
			<scroll-view scroll-x class="image-scroll">
				<view class="image-list">
					<image 
						v-for="(item, index) in detailData.picurls" 
						:key="index" 
						:src="item" 
						mode="aspectFill"
						class="gallery-image"
						@click="previewImage(index)"
					></image>
				</view>
			</scroll-view>
		</view>
		
		<!-- 悬浮按钮 -->
		<view class="float-button">
			<u-button 
				:type="buttonType"
				@click="handleApply"
				:disabled="isCreator || hasApplied"
				:customStyle="buttonStyle"
			>
				<text class="button-text">{{buttonText}}</text>
			</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailData: {
					_id: '',
					posttime: '',
					picurls: [],
					hType: '',
					hb: '',
					head: '',
					detail: '',
					type: '',
					situation: '',
					currentCount: 0,
					maxCount: 1
				},
				isCreator: false,
				hasApplied: false
			}
		},
		
		computed: {
			buttonText() {
				if (this.isCreator) return '已发布';
				if (this.hasApplied) return '已申请';
				return '申请加入';
			},
			buttonType() {
				if (this.isCreator) return 'info';
				if (this.hasApplied) return 'warning';
				return 'primary';
			},
			buttonStyle() {
				return {
					width: '90%',
					height: '88rpx',
					borderRadius: '44rpx',
					fontSize: '32rpx',
					fontWeight: 'bold'
				}
			}
		},
		
		onLoad() {
			this.initData();
		},
		
		methods: {
			initData() {
				const eventChannel = this.getOpenerEventChannel();
				eventChannel.on('sendData', (data) => {
					this.detailData = {
						...this.detailData,
						...data
					};
					this.isCreator = data.ID_token === uni.getStorageSync('token');
					this.checkApplyStatus();
				});
			},
			
			formatTime(timestamp) {
				if (!timestamp) return '';
				const date = new Date(timestamp);
				return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
			},
			
			previewImage(index) {
				uni.previewImage({
					urls: this.detailData.picurls,
					current: index
				});
			},
			
			checkApplyStatus() {
				uniCloud.callFunction({
					name: 'checkApplyStatus',
					data: {
						postId: this.detailData._id,
						token: uni.getStorageSync('token')
					}
				}).then(res => {
					if (res.result.code === 0) {
						this.hasApplied = res.result.hasApplied;
					}
				});
			},
			
			handleApply() {
				if (this.isCreator || this.hasApplied) return;
				
				uni.showModal({
					title: '确认申请',
					content: '确定要申请加入吗？',
					success: (res) => {
						if (res.confirm) {
							this.submitApply();
						}
					}
				});
			},
			
			submitApply() {
				uniCloud.callFunction({
					name: 'applyDz',
					data: {
						postId: this.detailData._id,
						token: uni.getStorageSync('token')
					}
				}).then(res => {
					if (res.result.code === 0) {
						uni.showToast({
							title: '申请成功',
							icon: 'success'
						});
						this.hasApplied = true;
					} else {
						uni.showToast({
							title: res.result.message || '申请失败',
							icon: 'none'
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
.dz-detail {
	min-height: 100vh;
	background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
	padding-bottom: 140rpx;
	
	.header {
		background: linear-gradient(120deg, #ffffff 0%, #f8f9fa 100%);
		padding: 40rpx 30rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
		
		.title-container {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			
			.title {
				font-size: 40rpx;
				font-weight: bold;
				background: linear-gradient(120deg, #2c3e50 0%, #3498db 100%);
				-webkit-background-clip: text;
				color: transparent;
				flex: 1;
				line-height: 1.4;
			}
			
			.count {
				background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
				padding: 16rpx 24rpx;
				border-radius: 16rpx;
				text-align: center;
				margin-left: 20rpx;
				box-shadow: 0 4rpx 15rpx rgba(106, 17, 203, 0.2);
				
				.count-text {
					font-size: 32rpx;
					color: #ffffff;
					font-weight: bold;
					display: block;
				}
				
				.count-label {
					font-size: 24rpx;
					color: rgba(255, 255, 255, 0.8);
					margin-top: 4rpx;
					display: block;
				}
			}
		}
	}
	
	.content {
		background: linear-gradient(120deg, #ffffff 0%, #f8f9fa 100%);
		padding: 30rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
		
		.info-section {
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 30rpx;
			padding-bottom: 30rpx;
			border-bottom: 1px solid rgba(0, 0, 0, 0.05);
			
			.info-item {
				width: 50%;
				margin-bottom: 20rpx;
				
				.label {
					font-size: 26rpx;
					color: #666;
					margin-bottom: 8rpx;
					display: block;
				}
				
				.value {
					font-size: 28rpx;
					color: #333;
					
					&.type-tag {
						display: inline-block;
						background: linear-gradient(120deg, #00c6fb 0%, #005bea 100%);
						color: #ffffff;
						padding: 6rpx 20rpx;
						border-radius: 8rpx;
						font-size: 24rpx;
						box-shadow: 0 2rpx 8rpx rgba(0, 198, 251, 0.2);
					}
				}
			}
		}
		
		.description {
			.label {
				font-size: 28rpx;
				background: linear-gradient(120deg, #2c3e50 0%, #3498db 100%);
				-webkit-background-clip: text;
				color: transparent;
				font-weight: bold;
				margin-bottom: 16rpx;
				display: block;
			}
			
			.value {
				font-size: 28rpx;
				color: #666;
				line-height: 1.6;
			}
		}
	}
	
	.image-section {
		background: linear-gradient(120deg, #ffffff 0%, #f8f9fa 100%);
		padding: 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
		
		.section-title {
			font-size: 28rpx;
			background: linear-gradient(120deg, #2c3e50 0%, #3498db 100%);
			-webkit-background-clip: text;
			color: transparent;
			font-weight: bold;
			margin-bottom: 20rpx;
			display: block;
		}
		
		.image-scroll {
			width: 100%;
			white-space: nowrap;
			
			.image-list {
				display: inline-flex;
				padding: 10rpx 0;
				
				.gallery-image {
					width: 240rpx;
					height: 240rpx;
					margin-right: 20rpx;
					border-radius: 12rpx;
					box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.1);
					transition: transform 0.3s ease;
					
					&:active {
						transform: scale(0.98);
					}
					
					&:last-child {
						margin-right: 0;
					}
				}
			}
		}
	}
	
	.float-button {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx 30rpx;
		background: linear-gradient(120deg, #ffffff 0%, #f8f9fa 100%);
		box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.08);
		display: flex;
		justify-content: center;
		
		.button-text {
			font-size: 32rpx;
			font-weight: bold;
		}
	}
}
</style> 