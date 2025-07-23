<template>
	<view class='apply'>
		<view class='title-container'>
			<text class='title'>选择身份</text>
			<text class='subtitle'>请选择您要发布的内容类型</text>
		</view>

		<view class='window'>
		   <view class='window1'
				@click="toggleActive('window1')"
				:class="{ active: activeView === 'window1'}"
		   >
				<view class="image-container">
					<image src="https://mp-f64dc8e9-0824-4c0c-bbb7-13f1287eb6e2.cdn.bspapp.com/cloudstorage/e7f62223-7464-43ec-9d86-bb103076b6e7.jpg"></image>
					<view class="overlay"></view>
				</view>
				<view class="content">
					<text class="role">招聘方</text>
					<text class="description">发布职位需求</text>
				</view>
		   </view>
		
			<view class='window2'
							@click="toggleActive('window2')"
							:class="{ active: activeView === 'window2'}"
			>
				<view class="image-container">
					<image src='https://mp-f64dc8e9-0824-4c0c-bbb7-13f1287eb6e2.cdn.bspapp.com/cloudstorage/0b0ccd90-1464-44fc-ae01-f8dd13d0215e.jpg'></image>
					<view class="overlay"></view>
				</view>
				<view class="content">
					<text class="role">求职方</text>
					<text class="description">寻找工作机会</text>
				</view>
			</view>
			</view>
			
		<view class="button-container">
			<u-button 
				@click="nato(activeView)" 
				type='primary'
				:disabled="!activeView"
				:customStyle="buttonStyle"
			>
				<text class="button-text">{{activeView ? '进入界面' : '请选择身份'}}</text>
			</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeView: null,
				imageUrl: '',
				buttonStyle: {
					width: '80%',
					height: '88rpx',
					borderRadius: '44rpx',
					fontSize: '32rpx',
					fontWeight: 'bold',
					background: 'linear-gradient(120deg, #6a11cb 0%, #2575fc 100%)',
					boxShadow: '0 4rpx 15rpx rgba(106, 17, 203, 0.2)'
				}
			}
		},
		onLoad() {
			    uniCloud.callFunction({
			        name: 'getImageUrl',
			        data: {
					fileID: 'cloudstorage/48c82865-ad3b-402a-8d28-e671c97fef30'
			        }
			    }).then(res => {
			        if (res.result && res.result.url) {
					this.imageUrl = res.result.url;
			        }
			    }).catch(err => {
			        console.error('获取图片 URL 失败:', err);
			    });
			},
		methods: {
			nato(e) {
				if (e == 'window1') {
					uni.navigateTo({
						url: '/pages/employer-input/employer-input'
				})
				} else if (e == 'window2') {
					uni.navigateTo({
						url: '/pages/job-search-input/job-search-input'
					})
				}
			},
			toggleActive(windowName) {
				if (this.activeView === windowName) {
					this.activeView = null
				} else {
					this.activeView = windowName
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
.apply {
	min-height: 100vh;
	background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
	padding: 40rpx;
	display: flex;
	flex-direction: column;
	align-items: center;

	.title-container {
		text-align: center;
		margin-bottom: 60rpx;
		margin-top: 40rpx;

		.title {
			font-size: 48rpx;
			font-weight: bold;
			background: linear-gradient(120deg, #2c3e50 0%, #3498db 100%);
			-webkit-background-clip: text;
			color: transparent;
			display: block;
			margin-bottom: 20rpx;
		}

		.subtitle {
			font-size: 28rpx;
			color: #666;
		}
	}

	.window {
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin-bottom: 60rpx;

		.window1, .window2 {
			width: 45%;
			height: 600rpx;
			border-radius: 24rpx;
			overflow: hidden;
			position: relative;
			transition: all 0.3s ease;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);

			&:active {
				transform: scale(0.98);
			}

			&.active {
				transform: translateY(-10rpx);
				box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.15);
			}

			.image-container {
				position: relative;
				width: 100%;
				height: 100%;

				image {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}

				.overlay {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6));
		}
	}

			.content {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				padding: 40rpx;
				background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
				color: #fff;
		
				.role {
					font-size: 36rpx;
					font-weight: bold;
					display: block;
					margin-bottom: 10rpx;
		}

				.description {
					font-size: 24rpx;
					opacity: 0.9;
				}
			}
		}

		.window1 {
			&.active {
				border: 4rpx solid #6a11cb;
		}
		}

		.window2 {
			&.active {
				border: 4rpx solid #2575fc;
			}
		}
	}

	.button-container {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 40rpx;

		.button-text {
			font-size: 32rpx;
			font-weight: bold;
			color: #fff;
	}
}
}
</style>
