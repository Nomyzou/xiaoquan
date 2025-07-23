<template>
	<view class="login-container">
		<view class="logo-container">
			<image class="logo" src="/static/logo.png" mode="aspectFit"></image>
		</view>
		
		<view class="welcome-text">欢迎来到小校园社区</view>
		
		<view class="button-container">
			<u-button 
				class="login-button wechat" 
				text="微信一键登录" 
				@click="handleWechatLogin"
			></u-button>
			
			<u-button 
				class="login-button phone" 
				text="其他手机号登录" 
				@click="handlePhoneLogin"
			></u-button>
		</view>
		
		<view class="agreement-container">
			<view class="agreement-content">
				<view class="checkbox-wrapper">
					<u-checkbox-group>
						<u-checkbox 
							v-model="agreementChecked"
                            @change="checkboxChange"

							shape="circle"
							active-color="#00AB5B"
							label-size="24"
						></u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="agreement-text">
					未注册社区的手机号，登录时将自动注册，且代表您已同意以下协议：
					<text class="link" @click="openAgreement('user')">《用户服务协议》</text>和
					<text class="link" @click="openAgreement('license')">《软件许可使用协议》</text>、
					<text class="link" @click="openAgreement('privacy')">《隐私权政策》</text>
				</view>
			</view>
		</view>

		<!-- 手机号获取弹窗 -->
		<u-popup :show="showPhonePopup" mode="center" round="10" @close="showPhonePopup = false">
			<view class="phone-popup">
				<view class="popup-header">
					<image class="popup-logo" src="/static/logo.png" mode="aspectFit"></image>
					<text class="popup-title">小校园社区</text>
				</view>
				
				<view class="popup-content">
					<text class="popup-text">申请获取并验证你的手机号</text>
					
					<button 
						class="get-phone-btn" 
						open-type="getPhoneNumber" 
						@getphonenumber="handleGetPhoneNumber"
					>
						使用微信手机号
					</button>
					
					<u-button 
						class="other-phone-btn" 
						text="使用其他手机号" 
						@click="handleOtherPhone"
					></u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				agreementChecked: false,
				showPhonePopup: false,
				checkboxList1: [
					{ name: '' },
				]
			}
		},
		methods: {
            checkboxChange(e) {
                console.log('checkboxChange', e);
                console.log(this.agreementChecked);
                this.agreementChecked = e
            },
			handleWechatLogin() {
				if (!this.agreementChecked) {
					uni.showToast({
						title: '请先同意用户协议',
						icon: 'none'
					});
					return;
				}
				// 显示手机号获取弹窗
				this.showPhonePopup = true;
			},
			handleGetPhoneNumber(e) {
				if (e.detail.errMsg === 'getPhoneNumber:ok') {
					// 获取到加密的手机号信息
					console.log('加密的手机号信息：', e.detail);
					// 这里可以调用后端接口解密手机号并完成登录
				} else {
					uni.showToast({
						title: '获取手机号失败',
						icon: 'none'
					});
				}
			},
			handleOtherPhone() {
				this.showPhonePopup = false;
				// 跳转到手机号登录页面
				uni.navigateTo({
					url: '/pages/phone-login/phone-login'
				});
			},
			handlePhoneLogin() {
				if (!this.agreementChecked) {
					uni.showToast({
						title: '请先同意用户协议',
						icon: 'none'
					});
					return;
				}
				// 处理手机号登录逻辑
				console.log('手机号登录');
			},
			openAgreement(type) {
				// 打开对应的协议页面
				console.log('打开协议：', type);
			}
		}
	}
</script>

<style lang="scss" scoped>
.login-container {
	padding: 60rpx 40rpx;
	height: 100vh;
	background-color: #FFFFFF;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.logo-container {
	margin-top: 100rpx;
	margin-bottom: 60rpx;
	
	.logo {
		width: 200rpx;
		height: 200rpx;
	}
}

.welcome-text {
	font-size: 36rpx;
	font-weight: bold;
	color: #333333;
	margin-bottom: 100rpx;
}

.button-container {
	width: 100%;
	margin-bottom: 60rpx;
	
	.login-button {
		width: 100%;
		height: 88rpx;
		border-radius: 44rpx;
		margin-bottom: 30rpx;
		font-size: 32rpx;
		
		&.wechat {
			background-color: #07C160;
			color: #FFFFFF;
		}
		
		&.phone {
			background-color: #FFFFFF;
			color: #333333;
			border: 2rpx solid #DDDDDD;
		}
	}
}

.agreement-container {
	width: 100%;
	padding: 0 20rpx;
	margin-top: 20rpx;
	
	.agreement-content {
		display: flex;
		align-items: flex-start;
		width: 100%;
		
		.checkbox-wrapper {
			width: 10%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		
		.agreement-text {
			width: 90%;
			font-size: 24rpx;
			color: #666666;
			line-height: 1.5;
		}
		
		.link {
			color: #00AB5B;
		}
	}
}

.phone-popup {
	width: 600rpx;
	background-color: #FFFFFF;
	border-radius: 20rpx;
	overflow: hidden;
	
	.popup-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 40rpx 0;
		
		.popup-logo {
			width: 120rpx;
			height: 120rpx;
			margin-bottom: 20rpx;
		}
		
		.popup-title {
			font-size: 36rpx;
			font-weight: bold;
			color: #333333;
		}
	}
	
	.popup-content {
		padding: 0 40rpx 40rpx;
		
		.popup-text {
			font-size: 28rpx;
			color: #666666;
			text-align: center;
			margin-bottom: 40rpx;
			display: block;
		}
		
		.get-phone-btn {
			width: 100%;
			height: 88rpx;
			line-height: 88rpx;
			background-color: #07C160;
			color: #FFFFFF;
			font-size: 32rpx;
			border-radius: 44rpx;
			margin-bottom: 30rpx;
			border: none;
			
			&::after {
				border: none;
			}
		}
		
		.other-phone-btn {
			width: 100%;
			height: 88rpx;
			border-radius: 44rpx;
			font-size: 32rpx;
			background-color: #FFFFFF;
			color: #333333;
			border: 2rpx solid #DDDDDD;
		}
	}
}
</style> 