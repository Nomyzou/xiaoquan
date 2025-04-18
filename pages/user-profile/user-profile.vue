<template>
	<view>
	<view class='user-box'>
		<view class='user-info'>
			<image :src="userInfo.avatarUrl" @click="uploadAvatar"></image>
			<text class='name' @click="changeName">{{ userInfo.nickName }}</text>
		</view>
		
		<view class='tabs' >
			<view class='box'>
				<view class='number'>0</view>
				<view class='text'>创作</view>
			</view>
			<view class='box'>
				<view class='number'>0</view>
				<view class='text'>赞同</view>
			</view>
			<view class='box'>
				<view class='number'>0</view>
				<view class='text'>喜欢</view>
			</view>
			<view class='box'>
				<view class='number'>0</view>
				<view class='text'>收藏</view>
			</view>	
			
		</view>
	</view>
	<view class='recently-viewed'>
		<view class='title'>最近游览</view>
		<view class='newsbox' v-for='i in 10'>
			<Newsbox @click.native="gotoDetail"></Newsbox>
		</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					avatarUrl: 'https://cdn.uviewui.com/uview/album/1.jpg', // 默认头像
					nickName: '小凡古' // 默认名称
				}
			};
		},
		methods:{
			gotoDetail(){
				uni.navigateTo({
					url:"/pages/detail/detail"
				})
			},
			// 上传头像
			uploadAvatar() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						const tempFilePath = res.tempFilePaths[0];
						uniCloud.uploadFile({
							cloudPath: `avatars/${Date.now()}-${Math.random()}.jpg`,
							filePath: tempFilePath,
							success: (uploadRes) => {
								this.userInfo.avatarUrl = uploadRes.fileID;
								uni.setStorageSync('userInfo', this.userInfo); // 更新本地缓存
								this.updateUserInfo(); // 调用云函数更新数据库
								uni.showToast({
									title: '头像上传成功',
									icon: 'success'
								});
							},
							fail: (err) => {
								console.error('头像上传失败：', err);
								uni.showToast({
									title: '头像上传失败',
									icon: 'none'
								});
							}
						});
					}
				});
			},
			// 修改名称
			changeName() {
				uni.showModal({
					title: '修改名称',
					content: '请输入新的名称',
					editable: true,
					success: (res) => {
						if (res.confirm && res.content) {
							this.userInfo.nickName = res.content;
							uni.setStorageSync('userInfo', this.userInfo); // 更新本地缓存
							this.updateUserInfo(); // 调用云函数更新数据库
							uni.showToast({
								title: '名称修改成功',
								icon: 'success'
							});
						}
					}
				});
			},
			// 更新用户信息到数据库
			async updateUserInfo() {
				const token = uni.getStorageSync('token');
				if (!token) {
					console.error('未找到登录态');
					return;
				}

				try {
					const res = await uniCloud.callFunction({
						name: 'updateUserInfo',
						data: {
							token,
							userInfo: this.userInfo
						}
					});
					if (res.result.code === 0) {
						console.log('用户信息更新成功');
					} else {
						console.error('用户信息更新失败：', res.result.message);
					}
				} catch (err) {
					console.error('请求失败：', err);
				}
			}
		},
		onLoad() {
			// 从本地缓存中获取用户信息
			const userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				this.userInfo = userInfo;
			}
		}
	}
</script>

<style lang="scss" scpoed>
	.recently-viewed{
		.title{
			padding:20rpx;
		}
		.newsbox{
			padding:0 10rpx;
		}
	}
	
	
.user-box{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 40vh; /* 使容器充满视口高度 */
  background-color: #FFFFFE; /* 米白色背景 */
  background-image: 
    radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, rgba(0, 0, 0, 0) 1px);
  background-size: 1px 1px; /* 控制颗粒的密度 */
  .tabs{
	  display: flex;
	  flex-direction: row;
	  justify-content: space-evenly;
	  align-items: center;
	  .box{
		  padding: 0 50rpx;
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  .number{
			  font-size: 2em;
		  }
		  .text{
			  font-weight: 100;
		  }
	  }
  }
	
	.user-info{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		
	image{
		  width: 10vh; /* 设置图片的宽度 */
		  height: 10vh; /* 设置图片的高度 */
		  border-radius: 50%; /* 将边框半径设为宽度的一半，形成圆形 */
		  // overflow: hidden; /* 隐藏溢出的部分 */
		  
	}	
	
	.name {
		margin-top: 10rpx;
		font-size: 30rpx;
		font-weight: bold;
		text-decoration: underline;
		cursor: pointer;
	}
	}
}
</style>
