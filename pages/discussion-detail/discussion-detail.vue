<template>
	<view class='tieba'>
		<view class='main'>
			<view class='title-container'>
				<view class='title'>{{detailData.head}}</view>
				<view class='more-button' v-if="isCreator" @click="showActionSheet">
					<text class="more-icon">•••</text>
				</view>
			</view>
			<view class='detail'>
				<view class="content-card">
					<text class="content-text">{{detailData.detail}}</text>
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
				</view>
			</view>
		</view>
		<view class='answer-section'>
			<view class='answer-header'>
				<view class='answer-title'>
					<text class="answer-count">回答 {{detailData.answer.length}}</text>
				</view>
				<view class='write-answer-btn'>
					<u-button 
						size='small' 
						type='primary' 
						@click="gotoWriteAnswer"
						v-if="isAdmitted"
						:customStyle="buttonStyle"
					>
						<text class="button-text">写回答</text>
					</u-button>
				</view>
			</view>
			<view class='answer-box'>
				<QAbox 
					v-for="item in detailData.answer" 
					:key="item._id" 
					:content="item.content"
					:userInfo="item.userInfo"
				></QAbox>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
	
		data() {
			return {
				isAdmitted: true,
				detailData: {
					head: '',
					detail: '',
					picurls: [],
					answer: []
				},
				discussionId: '', // 存储讨论的 _id
				isCreator: false,
				loading: false, // 添加加载状态
				buttonStyle: {
					width: '180rpx',
					height: '72rpx',
					borderRadius: '36rpx',
					fontSize: '28rpx',
					fontWeight: 'bold',
					background: 'linear-gradient(120deg, #00c6fb 0%, #005bea 100%)',
					boxShadow: '0 4rpx 15rpx rgba(0, 198, 251, 0.2)'
				}
			};
		},
		// 添加下拉刷新配置
		onPullDownRefresh() {
			this.refreshData();
		},
		onShow() {
			// 监听回答更新事件，刷新数据
			uni.$on('answerUpdated', (res) => {
				this.refreshData();
			});
		},
	
		onLoad() {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('sendData', (data) => {
				this.detailData = {
					...this.detailData,
					...data
				};
				this.discussionId = data.id;
				this.isCreator = data.ID_token === uni.getStorageSync('token');
				
				console.log('接收到的数据：', data);
				console.log('isCreatortoken:', data.ID_token);
				console.log('接受到的url:', data.picurls);
				console.log('isCreator:', uni.getStorageSync('token'));
			});
		},
		// onShow() {
		// 	// 每次页面显示时刷新数据
		// 	if (this.discussionId) {
		// 		this.refreshData();
		// 	}
		// },
	
		methods: {
			// 添加刷新数据的方法
			refreshData() {
				if (this.loading) return; // 防止重复请求
				
				this.loading = true;
				uni.showLoading({
					title: '加载中...'
				});
				
				uniCloud.callFunction({
					name: 'getDiscussionDetail',
					data: {
						tableName: "content-table",
						id: this.discussionId
					},
					success: (res) => {
						console.log('获取数据成功',res)
						// if (res.result.code === 0) {
						// 	const detailData = res.result.data["0"];
						// 	// 保留原有的回答数据，只更新其他字段
						// 	const currentAnswers = this.detailData.answer || [];
						// 	this.detailData = {
						// 		...this.detailData,
						// 		...detailData,
						// 		answer: detailData.answer || currentAnswers // 使用新的回答数据，如果没有则保留原有的
						// 	};
						// 	// 更新创建者状态
						// 	this.isCreator = detailData.ID_token === uni.getStorageSync('token');
						this.detailData.answer= res.result.data["0"].answers;
						// } else {
						// 	uni.showToast({
						// 		title: '获取数据失败',
								icon: 'none'
						// 	});
						// }
					},
					fail: (err) => {
						console.error('刷新数据失败：', err);
						uni.showToast({
							title: '刷新失败',
							icon: 'none'
						});
					},
					complete: () => {
						this.loading = false;
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				});
			},
			previewImage(index) {
				uni.previewImage({
					urls: this.detailData.picurls,
					current: index
				});
			},
			gotoWriteAnswer() {
				uni.navigateTo({
					url: `/pages/write-answer/write-answer?discussionId=${this.discussionId}`
				});
			},
			showActionSheet() {
				uni.showActionSheet({
					itemList: ['删除问题', '编辑问题','关闭问题'],
					success: (res) => {
						if (res.tapIndex === 0) {
							this.deleteDiscussion();
						} else if (res.tapIndex === 1) {
							this.editDiscussion();
						} else if (res.tapIndex === 2) {
							this.closeDiscussion();
						}
					}
				});
			},
			deleteDiscussion() {
				uni.showModal({
					title: '提示',
					content: '确定要删除这个问题吗？',
					success: (res) => {
						if (res.confirm) {
							uniCloud.callFunction({
								name: 'deleteDiscussion',
								data: {
									id: this.discussionId,
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
							}).catch(error => {
								console.error('删除失败：', error);
								uni.showToast({
									title: '删除失败',
									icon: 'error'
								});
							});
						}
					}
				});
			},
			editDiscussion() {
				uni.navigateTo({
					url: `/pages/discussion-post/discussion-post?id=${this.discussionId}&title=${encodeURIComponent(this.detailData.head)}&content=${encodeURIComponent(this.detailData.detail)}&isEdit=true`
				});
			},
			closeDiscussion() {
				uni.showModal({
					title: '提示',
					content: '确定要关闭这个问题吗？',
					success: (res) => {
						if (res.confirm) {
							this.isAdmitted = false;
							uni.showToast({
								title: '问题已关闭',
								icon: 'success'
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
.tieba {
	background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
	min-height: 100vh;
	
	.main {
		padding: 30rpx;
		
		.title-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
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
		
		.detail {
			.content-card {
				background: linear-gradient(to bottom, #ffffff, #f8f9fa);
				border-radius: 24rpx;
				padding: 30rpx;
				box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
				
				.content-text {
					font-size: 28rpx;
					color: #333;
					line-height: 1.6;
					margin-bottom: 30rpx;
				}
				
				.image-gallery {
					display: flex;
					flex-wrap: wrap;
					gap: 20rpx;
					margin-bottom: 30rpx;
					
					.gallery-image {
						width: 320rpx;
						height: 320rpx;
						border-radius: 16rpx;
						box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
						transition: all 0.3s ease;
						
						&:active {
							transform: scale(0.98);
						}
					}
				}
			}
		}
	}
	
	.answer-section {
		margin-top: 30rpx;
		
		.answer-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: linear-gradient(120deg, #00c6fb 0%, #005bea 100%);
			padding: 30rpx;
			border-radius: 24rpx 24rpx 0 0;
			box-shadow: 0 4rpx 20rpx rgba(0, 198, 251, 0.1);
			
			.answer-title {
				.answer-count {
					color: #fff;
					font-size: 32rpx;
					font-weight: bold;
					text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
				}
			}
			
			.write-answer-btn {
				.button-text {
					font-size: 28rpx;
					font-weight: bold;
					color: #fff;
				}
			}
		}
		
		.answer-box {
			background: #fff;
			border-radius: 0 0 24rpx 24rpx;
			padding: 30rpx;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
			
			.box {
				margin-top: 40rpx;
				padding: 20rpx;
				background: linear-gradient(to bottom, #ffffff, #f8f9fa);
				border-radius: 16rpx;
				box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
				transition: all 0.3s ease;
				
				&:hover {
					transform: translateY(-2rpx);
					box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.1);
				}
			}
		}
	}
}
</style>