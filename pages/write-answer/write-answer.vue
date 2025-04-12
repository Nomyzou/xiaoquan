<template>
	<view class='page'>
		<view class='header'>
			<view class='exit'>
				<u-icon name="close" size=25 @click="exit"></u-icon>
			</view>
			<view class='text'>写回答</view>
			<view class='button'>
				<u-button type="primary" shape="circle" text="发送" @click="onSubmit"></u-button>
			</view>
		</view>
		<view class='content'>
			<view class='detail'>
				<u-textarea v-model='answerContent' placeholder="请输入你的回答" height=400 border="none"></u-textarea>
				<u-upload
					:fileList="fileList"
					@afterRead="afterRead"
					@delete="deletePic"
					multiple
					:maxCount="10"
					@success="uploadSuccess"
					:previewFullImage="true"
				></u-upload>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				answerContent: '',
				fileList: [],
				picUrls: []
			};
		},
		methods: {
			async onSubmit() {
				const that = this;
				let updateList = [...this.fileList];
				updateList.forEach(item => {
					item.status = 'uploading';
					item.message = '正在上传';
				});
				uni.showToast({
					title: '上传中',
					icon: 'none'
				});

				// 触发视图更新
				this.fileList = updateList;
				updateList = await Promise.all(updateList.map(async (item) => {
					try {
						const cloudPath = `uploads/${Date.now()}-${Math.random()}.jpg`;
						const result = await uniCloud.uploadFile({
							cloudPath,
							filePath: item.url
						});
						if (result.success) {
							that.picUrls.push(result.fileID);
							return {
								url: result.fileID,
								status: 'uploaded',
								message: '上传成功',
							};
						}
					} catch (error) {
						console.log('error', error);
					}
				}));
				this.fileList = updateList;

				// 提交回答
				uniCloud.callFunction({
					name: 'addAnswer',
					data: {
						content: this.answerContent,
						picUrls: this.picUrls
					}
				}).then(res => {
					console.log('res', res);
					uni.showToast({
						title: '提交成功',
						icon: 'success'
					});
					setTimeout(() => {
						uni.navigateBack();
					}, 1000);
				});
			},
			afterRead(e) {
				let uplists = [].concat(e.file);
				let fileList = this.fileList;
				uplists.map((item) => {
					fileList.push({
						...item,
						status: 'uploaded',
						message: 'ok'
					});
				});
			},
			deletePic(e) {
				this.fileList.splice(e.index, 1);
			},
			exit() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
.page {
	display: flex;
	flex-direction: column;
	height: 1200rpx;
	background-color: #FFF;

	.header {
		padding: 5rpx 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.text {
			font-size: 40rpx;
			font-weight: 600;
		}
	}

	.content {
		.detail {}
	}
}
</style> 