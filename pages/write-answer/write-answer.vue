<template>
	<view class="write-answer-container">
		<view class="question-title">
			<text>{{title}}</text>
		</view>
		
		<view class="answer-form">
			<u-form :model="form" ref="uForm">
				<u-form-item prop="content">
					<u-textarea
						v-model="form.content"
						placeholder="请输入您的问题或回答内容..."
						:height="300"
						count
						:maxlength="1000"
						autoHeight
					></u-textarea>
				</u-form-item>
			</u-form>
		</view>
		
		<view class="submit-area">
			<u-button type="primary" @click="submitAnswer">提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				discussionId: '', // 讨论ID
				jobId: '', // 职位ID
				title: '', // 标题
				form: {
					content: '' // 回答内容
				},
				type: '', // 类型：discussion或job
				rules: {
					content: [
						{ required: true, message: '请输入内容', trigger: 'blur' }
					]
				}
			}
		},
		onLoad(options) {
			// 判断是讨论问答还是职位问答
			if (options.discussionId) {
				this.discussionId = options.discussionId;
				this.title = decodeURIComponent(options.title || '');
				this.type = 'discussion';
			} else if (options.jobId) {
				this.jobId = options.jobId;
				this.title = decodeURIComponent(options.jobTitle || '职位咨询');
				this.type = 'job';
			}
		},
		methods: {
			submitAnswer() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if (this.type === 'discussion') {
							this.submitDiscussionAnswer();
						} else if (this.type === 'job') {
							this.submitJobAnswer();
						}
					}
				});
			},
			// 提交讨论回答
			submitDiscussionAnswer() {
				const userInfo = uni.getStorageSync('userInfo') || {};
				
				uniCloud.callFunction({
					name: 'post_discussion_inner_anwser',
					data: {
						ID: this.discussionId,
						content: this.form.content,
						userInfo: userInfo
					}
				}).then(res => {
					console.log('提交回答成功：', res);
					
					uni.showToast({
						title: '回答已提交',
						icon: 'success'
					});
					
					// 通知上一页面更新数据
					uni.$emit('answerUpdated', {
						discussionId: this.discussionId
					});
					
					setTimeout(() => {
						uni.navigateBack();
					}, 1500);
				}).catch(err => {
					console.error('提交回答失败：', err);
					uni.showToast({
						title: '提交失败，请重试',
						icon: 'none'
					});
				});
			},
			// 提交职位问答
			submitJobAnswer() {
				const userInfo = uni.getStorageSync('userInfo') || {};
				
				uniCloud.callFunction({
					name: 'addJobAnswer',
					data: {
						jobId: this.jobId,
						content: this.form.content,
						userInfo: userInfo,
						createTime: new Date().getTime()
					}
				}).then(res => {
					console.log('提交问答成功：', res);
					
					uni.showToast({
						title: '问题已提交',
						icon: 'success'
					});
					
					// 通知上一页面更新数据
					uni.$emit('answerUpdated', {
						jobId: this.jobId
					});
					
					setTimeout(() => {
						uni.navigateBack();
					}, 1500);
				}).catch(err => {
					console.error('提交问题失败：', err);
					uni.showToast({
						title: '提交失败，请重试',
						icon: 'none'
					});
				});
			}
		}
	}
</script>

<style lang="scss">
.write-answer-container {
	padding: 30rpx;
	
	.question-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 30rpx;
		padding: 20rpx;
		background-color: #f8f9fa;
		border-radius: 12rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}
	
	.answer-form {
		margin-bottom: 40rpx;
	}
	
	.submit-area {
		padding: 20rpx 0;
	}
}
</style> 