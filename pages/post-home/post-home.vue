<template>
	<view class='post-home'>
		<van-tabs type='line' line-height='3px' line-width='30px' color='blue' animated>
			<van-tab title='发校内'>


				<view class='bg-img'>
					<view class='image-top'>
						<image src='https://mp-f64dc8e9-0824-4c0c-bbb7-13f1287eb6e2.cdn.bspapp.com/cloudstorage/63943a68-1739-45b3-88fa-f654f3dead1e.jpg' mode="aspectFill">
					</view>

					<view class='post-items'>
						<view class='post-item1'>
							<view class='content_item' @click='navitocompanion'>
								<view class='image'>
									<image src='../../static/add_image/zhaoren.png' mode="aspectFit">

									</image>
								</view>
								<view class='text'>
									<view class='header'>志同道合</view>
									<!-- <view class='detail>'>寻找你的志同道合伙伴</view> -->
								</view>
							</view>
							<view class='more'> <u-icon name='arrow-right'></u-icon> </view>
						</view>

						<view class='post-item2'>
							<view class='content_item' @click='navitoauction'>

								<view class='image'>
									<image src='../../static/add_image/zhaoxiangji.png' mode="aspectFit">

									</image>
								</view>
								<view class='text'>
									<view class='header'>校园闲置</view>
									<!-- <view class='detail>'>寻找你的志同道合伙伴</view> -->
								</view>
							</view>
							<view class='more'> <u-icon name='arrow-right'></u-icon> </view>
						</view>

						<view class='post-item3'>
							<view class='content_item' @click='item3_click1'>
								<view class='image'>
									<image src='../../static/add_image/taolun.png' mode="aspectFit">

									</image>
								</view>
								<view class='text'>
									<view class='header'>发帖讨论</view>
									<!-- <view class='detail>'>寻找你的志同道合伙伴</view> -->
								</view>
							</view>
							<view class='more'> <u-icon name='arrow-right'></u-icon> </view>

						</view>

						<view class='button'>
							<van-button round plain type="danger" url="../index/index" @click="handle">X</van-button>
						</view>
					</view>


				</view>

			</van-tab>

			<van-tab title='发校外'>
				<view class='add2'>

					<view class='image-top'>
						<image src='https://mp-f64dc8e9-0824-4c0c-bbb7-13f1287eb6e2.cdn.bspapp.com/cloudstorage/6b7e8efa-c410-4b3b-8f8c-f0c683df6d88.jpg' mode="aspectFill">
					</view>

					<view class='post-items'>



						<view class='post-item2'>
							<view class='content_item' @click='itemcoper_click'>

								<view class='image'>
									<image src='../../static/add_image/zhaoxiangji.png' mode="aspectFit">

									</image>
								</view>
								<view class='text'>
									<view class='header'>寻找合作</view>
									<!-- <view class='detail>'>寻找你的志同道合伙伴</view> -->
								</view>



							</view>
							<view class='icon'>
								<u-icon name='arrow-right' bold></u-icon>
							</view>
						</view>


						<view class='post-item3' @click='item3_click2'>
							<view class='content_item' @click='item3_click2'>
								<view class='image'>
									<image src='../../static/add_image/taolun.png' mode="aspectFit">

									</image>
								</view>
								<view class='text'>
									<view class='header'>发帖讨论</view>
									<!-- <view class='detail>'>寻找你的志同道合伙伴</view> -->
								</view>
							</view>
							<view class='more'> <u-icon bold name='arrow-right'></u-icon> </view>


						</view>

						<view class='post-item4' @click='item4_click'>
							<view class='content_item' @click='item4_click'>
								<view class='image'>
									<image src='../../static/add_image/qiuzhi.png' mode="aspectFit">

									</image>
								</view>
								<view class='text'>
									<view class='header'>工作兼职</view>
									<!-- <view class='detail>'>寻找你的志同道合伙伴</view> -->
								</view>
							</view>
							<view class='more'> <u-icon bold name='arrow-right'></u-icon> </view>


						</view>


					</view>

				</view>
			</van-tab>

		</van-tabs>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrls: []

			};
		},
		onLoad() {
			
			uni.hideTabBar()
			uniCloud.callFunction({
				name: 'user_add',
				data: {
					id: 1,
					picurls: 'www.abced.com',
					name: 'zx'


				}
			}).then(res => {
				console.log('res', res)
			})

		},
		onUnload() {
			uni.showTabBar()
		},
		methods: {
			item4_click() {
				uni.navigateTo({
					url: '/pages/freelance-post/freelance-post',
					animationType: 'slide-in-right',
					animationDuration: 500
				})
			},
			itemcoper_click() {
				uni.navigateTo({
					url: '/pages/coper-post/coper-post'
				})
			},
			navitocompanion() {
				uni.navigateTo({
					url: '/pages/companion-post/companion-post'
				})
			},
			navitoauction() {
				uni.navigateTo({
					url: "/pages/auction-post/auction-post"

				})
			},
			item3_click1() {
				uni.navigateTo({
					url: '/pages/discussion-post/discussion-post'
				})
			},
			item3_click2() {
				uni.navigateTo({
					url: '/pages/dicuss-post-outer/dicuss-post-outer'
				})
			},
			handle() {
				console.log('aaa')
				uni.switchTab({
					url: "/pages/index/index"
				})
				uni.showTabBar()
			}
		}

	}
</script>

<style lang="scss">
	.post-home {

		.add2 {

			//校外
			.image-top {
				image {
					width: 100%
				}
			}

			.post-items {
				width: 80%;
				margin-top: 20rpx;
				padding: 50rpx;
				padding-top: 0rpx;
				height: 500rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;

				.post-item1 {

					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;

					padding: 20rpx;
					width: 90%;
					height: 150rpx;
					background-color: #F47700;

					margin-bottom: 25rpx;
					border-radius: 40rpx;

					.content_item {
						width: 40%;
						height: 200rpx;
						display: flex;
						flex-direction: row;
						justify-content: space-between;

						.image {
							width: 25%;
							height: 20rpx;

							image {
								height: 100rpx;
								width: 100%;

							}
						}

						.text {
							padding: 30rpx 0 0 0;

							.detail {
								font-size: 5rpx;
							}

						}

					}
				}

				.post-item2 {
					display: flex;
					flex-direction: row;
					justify-content: space-between;

					padding: 20rpx;
					width: 90%;
					height: 125rpx;
					background-color: #B3F1B1;

					margin-bottom: 25rpx;
					border-radius: 40rpx;
					align-items: center;

					.content_item {
						width: 40%;
						height: 125rpx;

						display: flex;
						flex-direction: row;
						justify-content: space-between;

						.image {
							width: 25%;
							height: 20rpx;

							image {
								height: 100rpx;
								width: 100%;

							}
						}

						.text {
							padding: 30rpx 0 0 0;

							.detail {
								font-size: 5rpx;
							}

						}

					}
				}

				.post-item3 {


					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;

					padding: 20rpx;
					width: 90%;
					height: 125rpx;
					background-color: #A8FCFB;

					margin-bottom: 25rpx;
					border-radius: 40rpx;

					.content_item {
						padding-top: 80rpx;
						width: 40%;
						height: 200rpx;
						display: flex;
						flex-direction: row;
						justify-content: space-between;

						.image {
							width: 25%;
							height: 20rpx;

							image {
								height: 100rpx;
								width: 100%;

							}
						}

						.text {
							padding: 30rpx 0 0 0;

							.detail {
								font-size: 5rpx;
							}

						}

					}
				}

				.post-item4 {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx;
					width: 90%;
					height: 125rpx;
					background-color: #00ADA8;

					margin-bottom: 25rpx;
					border-radius: 40rpx;

					.content_item {
						padding-top: 40rpx;
						width: 40%;
						height: 150rpx;
						display: flex;
						flex-direction: row;
						justify-content: space-between;

						.image {
							width: 25%;
							height: 20rpx;

							image {
								height: 100rpx;
								width: 100%;

							}
						}

						.text {
							padding: 30rpx 0 0 0;

							.detail {
								font-size: 5rpx;
							}

						}

					}
				}




			}
		}



		.bg-img {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;

			.image-top {
				width: 100%;
				height: 400rpx;

				image {
					width: 100%;
				}

			}

			.post-items {
				width: 80%;
				margin-top: 60rpx;
				padding: 20rpx;
				height: 700rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;

				.post-item1 {

					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;

					padding: 20rpx;
					width: 90%;
					height: 125rpx;
					background-color: #F47700;

					margin-bottom: 25rpx;
					border-radius: 40rpx;

					.content_item {
						width: 40%;
						height: 200rpx;

						display: flex;
						flex-direction: row;
						justify-content: space-between;
						padding-top: 70rpx;

						.image {
							width: 25%;
							height: 20rpx;

							image {
								height: 100rpx;
								width: 100%;

							}
						}

						.text {
							padding: 30rpx 0 0 0;

							.detail {
								font-size: 5rpx;
							}

						}

					}
				}

				.post-item2 {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx;
					width: 90%;
					height: 125rpx;
					background-color: #B3F1B1;

					margin-bottom: 25rpx;
					border-radius: 40rpx;

					.content_item {
						width: 40%;
						height: 200rpx;
						padding-top: 70rpx;
						display: flex;
						flex-direction: row;
						justify-content: space-between;

						.image {
							width: 25%;
							height: 20rpx;

							image {
								height: 100rpx;
								width: 100%;

							}
						}

						.text {
							padding: 30rpx 0 0 0;

							.detail {
								font-size: 5rpx;
							}

						}

					}
				}

				.post-item3 {


					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx;
					width: 90%;
					height: 125rpx;
					background-color: #A8FCFB;

					margin-bottom: 25rpx;
					border-radius: 40rpx;

					.content_item {
						width: 40%;
						height: 200rpx;
						padding-top: 70rpx;
						display: flex;
						flex-direction: row;
						justify-content: space-between;

						.image {
							width: 25%;
							height: 20rpx;

							image {
								height: 100rpx;
								width: 100%;

							}
						}

						.text {
							padding: 30rpx 0 0 0;

							.detail {
								font-size: 5rpx;
							}

						}

					}
				}
			}

			.button {
				width: 10%;
				height: 50rpx;
				margin: 10rpx;
			}

		}

	}
</style>
</style>