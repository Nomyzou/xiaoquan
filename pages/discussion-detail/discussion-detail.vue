<template>
	<view class='tieba'>
		<view class='main'>
			<view class='title-container'>
				<view class='title'>{{detailData.head}}</view>
				<view class='more-button' v-if="isCreator" @click="showActionSheet">
					<text>...</text>
				</view>
			</view>
			<view class='detail'>
				<text>{{detailData.detail}}</text>
				<view class='button'>
					<u-button size='small' type='primary' plain @click="gotoWriteAnswer">写回答</u-button>
				</view>
			</view>
		</view>
		<view class='answer_title'>
			<text>回答 {{detailData.answer.length}}</text></view>
		<view class='anwserBox'>
			<QAbox v-for="item in detailData.answer" :key="item._id" :content="item.content"></QAbox>
		</view>
	</view>
</template>

<script>

	export default {
	
		data() {
			return {
				detailData: {
					head: '',
					detail: '',
					answer: []
				},
				discussionId: '', // 存储讨论的 _id
				isCreator: false
			};
		},
		onLoad() {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('sendData', (data) => {
				this.detailData = data;
				this.discussionId = data.id; // 接收传递的 _id
				// 通过比较ID_token判断是否为发帖人
				this.isCreator = data.ID_token === uni.getStorageSync('token');
				console.log('接收到的数据：', data);
				console.log('isCreatortoken:', data.ID_token );
				console.log('isCreator:', uni.getStorageSync('token'));
			});
		},
		methods: {
			gotoWriteAnswer() {
				uni.navigateTo({
					url: `/pages/write-answer/write-answer?discussionId=${this.discussionId}`
				});
			},
			showActionSheet() {
				uni.showActionSheet({
					itemList: ['删除问题', '编辑问题'],
					success: (res) => {
						if (res.tapIndex === 0) {
							this.deleteDiscussion();
						} else if (res.tapIndex === 1) {
							this.editDiscussion();
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
		.title-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 2%;
			.title {
				width: 90%;
				font-weight: 600;
				font-size: 40rpx;
			}
			.more-button {
				width: 10%;
				text-align: right;
				font-size: 40rpx;
				color: #2979ff;
				cursor: pointer;
			}
		}
		.detail{
			position: relative;
			.button{
				margin-left: 70%;
				width: 20%;
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