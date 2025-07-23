<template>
	<view class="phone-login-container">
		<view class="logo-container">
			<image class="logo" src="/static/logo.png" mode="aspectFit"></image>
		</view>
		
		<view class="input-container">
			<view class="phone-input">
				<text class="area-code">+86</text>
				<input 
					type="number" 
					v-model="phoneNumber" 
					placeholder="请输入手机号" 
					maxlength="11"
				/>
			</view>
			
			<u-button 
				class="login-button" 
				:text="isRegistered ? '登录' : '同意协议并注册'" 
				@click="handleLogin"
			></u-button>
		</view>
		
		<view class="agreement-container">
			<u-checkbox-group>
				<u-checkbox 
					v-model="agreementChecked"
					shape="circle"
					active-color="#00AB5B"
				>
					<text class="agreement-text">
						未注册小校园社区的手机号，登录时将自动注册，且代表您已同意以下协议：
						<text class="link" @click="openAgreement('user')">《用户服务协议》</text>和
						<text class="link" @click="openAgreement('license')">《软件许可使用协议》</text>、
						<text class="link" @click="openAgreement('privacy')">《隐私权政策》</text>
					</text>
				</u-checkbox>
			</u-checkbox-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNumber: '',
				agreementChecked: false,
				isRegistered: false // 用于判断手机号是否已注册
			}
		},
		methods: {
			handleLogin() {
				if (!this.agreementChecked) {
					uni.showToast({
						title: '请先同意用户协议',
						icon: 'none'
					});
					return;
				}
				
				if (!this.phoneNumber) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					});
					return;
				}
				
				if (!/^1[3-9]\d{9}$/.test(this.phoneNumber)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					});
					return;
				}
				
				// 这里添加登录/注册逻辑
				console.log('手机号：', this.phoneNumber);
			},
			openAgreement(type) {
				// 打开对应的协议页面
				console.log('打开协议：', type);
			}
		}
	}
</script>

<style lang="scss" scoped>
.phone-login-container {
	padding: 60rpx 40rpx;
	height: 100vh;
	background-color: #FFFFFF;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.logo-container {
	margin-top: 100rpx;
	margin-bottom: 100rpx;
	
	.logo {
		width: 200rpx;
		height: 200rpx;
	}
}

.input-container {
	width: 100%;
	
	.phone-input {
		display: flex;
		align-items: center;
		height: 88rpx;
		border-bottom: 2rpx solid #EEEEEE;
		margin-bottom: 60rpx;
		
		.area-code {
			font-size: 32rpx;
			color: #333333;
			margin-right: 20rpx;
		}
		
		input {
			flex: 1;
			height: 100%;
			font-size: 32rpx;
		}
	}
	
	.login-button {
		width: 100%;
		height: 88rpx;
		border-radius: 44rpx;
		font-size: 32rpx;
		background-color: #00AB5B;
		color: #FFFFFF;
	}
}

.agreement-container {
	width: 100%;
	padding: 40rpx 20rpx 0;
	
	.agreement-text {
		font-size: 24rpx;
		color: #666666;
		line-height: 1.5;
	}
	
	.link {
		color: #00AB5B;
	}
}
</style> 