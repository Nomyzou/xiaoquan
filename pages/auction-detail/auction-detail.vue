<template>
	<view class='auction-detail'>
		<!-- 商品详情主体 -->
		<view class='main'>
			<!-- 标题区域 -->
			<view class='title-container'>
				<view class='title'>{{detailData.head}}</view>
				<view class='more-button' v-if="isCreator" @click="showActionSheet">
					<text class="more-icon">•••</text>
				</view>
			</view>
			
			<!-- 商品详情内容 -->
		<view class='detail'>
				<!-- 图片展示区 -->
				<view class="image-gallery" v-if="detailData.picurls && detailData.picurls.length > 0">
				<image 
						v-for="(item, index) in detailData.picurls" 
					:key="index" 
						:src="item" 
					mode="aspectFill"
					class="gallery-image"
					@click="previewImage(index)"
				></image>
			</view>
				
				<!-- 商品信息区 -->
				<view class='content'>
					<view class="info-card">
					<text class='description'>{{detailData.detail}}</text>
					
					<!-- 价格信息 -->
					<view class='price-info'>
						<view class='price-item'>
							<text class='label'>价格</text>
							<text class='value'>¥{{detailData.price}}</text>
						</view>
						<view class='price-item'>
							<text class='label'>运费</text>
							<text class='value'>¥{{detailData.way_price}}</text>
		</view>
		</view>
		
					<!-- 商品类型 -->
					<view class='type-info'>
						<text class='label'>类型</text>
							<text class='value type-tag'>{{detailData.type}}</text>
					</view>
					
					<!-- 发布时间 -->
					<view class='time-info'>
						<text class='label'>发布时间</text>
						<text class='value'>{{formatTime(detailData.posttime)}}</text>
						</view>
					</view>
				</view>
				
				<!-- 操作按钮 -->
				<view class='button'>
					<u-button 
						type='primary' 
						@click="contactSeller"
						:customStyle="buttonStyle"
					>
						<text class="button-text">联系卖家</text>
					</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'AuctionDetail',
		
		data() {
			return {
				detailData: {
					_id: '',
					posttime: '',
					picurls: [],
					hType: '',
					situation: '',
				head: '',
				detail: '',
					price: 0,
					way_price: '0',
					type: ''
				},
				isCreator: false,
				buttonStyle: {
					width: '100%',
					height: '88rpx',
					borderRadius: '44rpx',
					fontSize: '32rpx',
					fontWeight: 'bold',
					background: 'linear-gradient(120deg, #6a11cb 0%, #2575fc 100%)',
					boxShadow: '0 4rpx 15rpx rgba(106, 17, 203, 0.2)'
				}
			};
		},
		
		// 生命周期钩子
		onLoad() {
			this.initData();
		},
		
		methods: {
			// 初始化数据
			initData() {
				const eventChannel = this.getOpenerEventChannel();
				eventChannel.on('sendData', (data) => {
					this.detailData = {
						...this.detailData,
						...data
					};
					this.isCreator = data.ID_token === uni.getStorageSync('token');
					console.log('闲置接收到的数据：', this.detailData);
				});
			},
			
			// 图片预览
			previewImage(index) {
				uni.previewImage({
					urls: this.detailData.picurls,
					current: index
				});
			},
			
			// 格式化时间
			formatTime(timestamp) {
				const date = new Date(timestamp);
				return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
			},
			
			// 联系卖家
			contactSeller() {
				uni.showToast({
					title: '联系卖家功能开发中',
					icon: 'none'
				});
			},
			
			// 显示操作菜单
			showActionSheet() {
				uni.showActionSheet({
					itemList: ['删除', '编辑'],
					success: (res) => {
						if (res.tapIndex === 0) {
							this.deleteItem();
						} else if (res.tapIndex === 1) {
							this.editItem();
						}
					}
				});
			},
			
			// 删除商品
			deleteItem() {
				uni.showModal({
					title: '提示',
					content: '确定要删除这个商品吗？',
					success: (res) => {
						if (res.confirm) {
							this.handleDelete();
						}
					}
				});
			},
			
			// 处理删除请求
			handleDelete() {
				uniCloud.callFunction({
					name: 'deleteAuction',
					data: {
						id: this.detailData._id,
						token: uni.getStorageSync('token')
					}
				}).then(res => {
					if (res.result.code === 200) {
						uni.showToast({
							title: '删除成功',
							icon: 'success'
						});
						setTimeout(() => {
							uni.navigateBack();
						}, 1500);
					} else {
						uni.showToast({
							title: res.result.msg || '删除失败',
							icon: 'error'
						});
					}
				});
			},
			
			// 编辑商品
			editItem() {
				const params = {
					id: this.detailData._id,
					title: encodeURIComponent(this.detailData.head),
					content: encodeURIComponent(this.detailData.detail),
					price: this.detailData.price,
					way_price: this.detailData.way_price,
					type: encodeURIComponent(this.detailData.type),
					isEdit: true
				};
				
				const queryString = Object.entries(params)
					.map(([key, value]) => `${key}=${value}`)
					.join('&');
					
				uni.navigateTo({
					url: `/pages/auction-post/auction-post?${queryString}`
				});
			}
		}
	}
</script>

<style lang="scss">
.auction-detail {
	background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
	min-height: 100vh;
	
	.main {
		padding: 30rpx;
		
		// 标题区域样式
		.title-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx 0;
			margin-bottom: 30rpx;
			
			.title {
				font-size: 40rpx;
				font-weight: bold;
				background: linear-gradient(120deg, #2c3e50 0%, #3498db 100%);
				-webkit-background-clip: text;
				color: transparent;
				flex: 1;
				margin-right: 20rpx;
			}
			
			.more-button {
				.more-icon {
				font-size: 40rpx;
			color: #666;
					letter-spacing: 4rpx;
				}
		}
	}
	
		// 详情区域样式
		.detail {
			// 图片展示区样式
		.image-gallery {
			display: flex;
			flex-wrap: wrap;
			gap: 20rpx;
				margin-bottom: 30rpx;
			
			.gallery-image {
					width: 220rpx;
					height: 220rpx;
					border-radius: 16rpx;
					box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
					transition: all 0.3s ease;
					
					&:active {
						transform: scale(0.98);
					}
		}
	}
	
			// 内容区域样式
			.content {
				.info-card {
					background: linear-gradient(to bottom, #ffffff, #f8f9fa);
					border-radius: 24rpx;
					padding: 30rpx;
					box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
				
				.description {
					font-size: 28rpx;
						color: #333;
					line-height: 1.6;
					margin-bottom: 30rpx;
				}
				
				// 价格信息样式
				.price-info {
					display: flex;
					justify-content: space-between;
						margin-bottom: 30rpx;
						padding-bottom: 20rpx;
						border-bottom: 2rpx solid rgba(0, 0, 0, 0.05);
					
					.price-item {
						.label {
							font-size: 24rpx;
								color: #666;
							margin-right: 10rpx;
						}
						
						.value {
								font-size: 36rpx;
								background: linear-gradient(120deg, #ff4d4f 0%, #ff7875 100%);
								-webkit-background-clip: text;
								color: transparent;
							font-weight: bold;
						}
					}
				}
				
				// 类型和时间信息样式
				.type-info, .time-info {
					margin-bottom: 20rpx;
						display: flex;
						align-items: center;
					
					.label {
							font-size: 26rpx;
							color: #666;
							margin-right: 20rpx;
							min-width: 120rpx;
					}
					
					.value {
						font-size: 28rpx;
							color: #333;
							
							&.type-tag {
								background: linear-gradient(120deg, #00c6fb 0%, #005bea 100%);
								color: #fff;
								padding: 6rpx 20rpx;
								border-radius: 20rpx;
								font-size: 24rpx;
							}
						}
					}
				}
			}
			
			// 按钮样式
			.button {
				margin-top: 40rpx;
				padding: 0 20rpx;
				
				.button-text {
					font-size: 32rpx;
					font-weight: bold;
					color: #fff;
				}
			}
		}
	}
}
</style>
