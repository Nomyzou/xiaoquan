<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		
		
	<!-- 	<view class="box2" hover-class="boxHover">
			<view class="inner" hover-class="innerHover" hover-stop-propagation></view>
		</view> -->
			<u-popup :show="showPop" :round="10" mode="bottom"  @close="closePop" @open="openPop">
				<view class="popup-content">
					<view class="header">
						<image class="logo" src="/static/logo.png"></image>
						<text class="title">小圈 申请</text>
					</view>
					<view class="subtitle">获取你的登录信息</view>
					<view class="user-info">
						<image class="user-avatar" src="https://mp-f64dc8e9-0824-4c0c-bbb7-13f1287eb6e2.cdn.bspapp.com/cloudstorage/one.png"></image>
						<text class="username">{{userInfo.nickname}}</text>
					</view>
					<view class="button-container">
						<u-button class="button" round>拒绝</u-button>
						<view class="spacer"></view>
						<u-button class="button" color="#4BC164" round @click="handleLogin">手机号一键登录</u-button>
					</view>
				</view>
			</u-popup>
		
		<van-tabs v-model:active="activeName" type='line' line-height='3px' line-width='30px'color='blue' animated> 
		  <van-tab title="校内" name="a">
			  <view>
				  <scroll-view scroll-x class='navscroll'>
					<view class="item"
					      v-for="(item, index) in tabName"
					      :key="index"
					      :class="{ active: selectedIndex1 === index }"
					      @click="selectItem_inner(index)">
					  {{ item }}
					</view>
					  
					 
				  </scroll-view>
				  
				  
				  <view class='content'>
					  <view class='row' v-for="(item, index) in listArr_inner" :key="item._id">
						  <Newsbox @click.native="gotoDetail(item)" :typeLabel="item.hType"  :title="item.head" :content='item.detail' :seqNum="index+1" :pic='item.picurls'></Newsbox>
					  </view>
				  </view>
			  </view>
		  </van-tab>
		  
		  
		  
		  
		  
		  
		  
		  
		  <van-tab title="校外" name="b">
			<scroll-view scroll-x class='navscroll'>
							  <view class="item" 
							        v-for="(item, index) in tabName1"
							        :key="index"
							        :class="{ active: selectedIndex === index }"
							        @click="selectItem(index)">
							    {{ item }}
							  </view>
								  
								 
			</scroll-view>
			<view class='content'>
								  <view class='row' v-for="(item,index) in listArr_outer">
						  <Newsbox @click.native="gotoDetail(item)" :typeLabel="item.hType"  :title="item.head" :content='item.detail' :seqNum="index+1" :pic='item.picurls'></Newsbox>
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
				showPop: false,
				selectedIndex: -1, // 初始没有选中项
				selectedIndex1:-1,
				userInfo: {
					nickname: "用户"+Math.floor(Math.random() * 10000),
					avatar: 'https://mp-f64dc8e9-0824-4c0c-bbb7-13f1287eb6e2.cdn.bspapp.com/cloudstorage/one.png',
					openid: '',
					token: ''
				},
				tabName:['找搭子','闲置','讨论','兼职','科研','社团'],
				tabName1:['项目支持','推广成果','科研合作','广告','讨论','兼职'],
				activeName:'',
				listArr:['1','2','3'],
				listArr_inner:[],
				listArr_outer:[],
				title: 'Hello',
				type:['samepeople','unused','topic'],
				head:['寻找一起冲浪的小伙伴','用了四年的充电宝','有没有推荐的强化学习视频'],
			}
		},
		onLoad() {
			
			   this.getData()
            	console.log('dataget',this.listArr)

			// 检测 session_key 是否有效
			wx.checkSession({
				success: () => {
					console.log('session_key 未过期');
					// 直接使用本地缓存的 token 发起请求
					const token = wx.getStorageSync('token');
					if (token) {
						this.getUserInfo(token);
					} else {
						console.log('未找到本地 token，需要重新登录');
						this.showPop = true;
					}
				},
				fail: () => {
					console.log('session_key 已过期，需要重新登录');
					this.showPop = true;
				}
			});
		},
		methods: {
			openPop(){
				console.log('打开')
			},
			closePop(){
				this.showPop=false
			},
			handleLogin() {
				// 调用 wx.login 获取临时登录凭证
				wx.login({
					success: (loginRes) => {
						if (loginRes.code) {
							console.log('登录凭证：', loginRes.code);
							// 调用云函数进行登录
							uniCloud.callFunction({
								name: 'registerUser',
								data: {
									code: loginRes.code
								},
								success: (res) => {
									if (res.result.code === 0) {
										// 将token存储在本地缓存中
										wx.setStorageSync('token', res.result.token);
										
										// 获取用户信息
										uniCloud.callFunction({
											name: 'getUserInfo',
											data: {
												token: res.result.token
											},
											success: (userRes) => {
												if (userRes.result.code === 0) {
													// 更新用户信息显示
													this.userInfo = userRes.result.data;
													
													// 更新全局变量
													this.$globalData.userInfo = {
														nickname: userRes.result.data.nickname,
														avatar: userRes.result.data.avatar,
														token: res.result.token
													};
													
													uni.showToast({
														title: '登录成功',
														icon: 'success'
													});
													// 登录成功后关闭弹出窗
													this.closePop();
												} else {
													console.error('获取用户信息失败：', userRes.result.message);
												}
											},
											fail: (err) => {
												console.error('获取用户信息失败：', err);
											}
										});
									} else {
										console.error('登录失败：', res.result.message);
										uni.showToast({
											title: '登录失败',
											icon: 'none'
										});
									}
								},
								fail: (err) => {
									console.error('请求失败：', err);
									uni.showToast({
										title: '请求失败',
										icon: 'none'
									});
								}
							});
						} else {
							console.error('登录失败：', loginRes.errMsg);
							uni.showToast({
								title: '登录失败',
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						console.error('登录失败：', err);
						uni.showToast({
							title: '登录失败',
							icon: 'none'
						});
					}
				});
			},
			selectItem(index) {
			      this.selectedIndex = index
				  const that=this
				  this.listArr_outer = this.listArr.filter(item => {
				      return item.situation !== undefined && 
				             item.situation !== null && 
				             item.situation === 'outer';
				  });
				  this.selectedIndex = index
				  console.log(index)
				  console.log(that.tabName[index])
				  
				  this.listArr_outer=this.listArr_outer.filter(item=>item.type===index)
				  console.log(this.listArr_inner)
			    },
				selectItem_inner(index) {
					const that=this
					this.listArr_inner = this.listArr.filter(item => {
					    return item.situation !== undefined && 
					           item.situation !== null && 
					           item.situation === 'inner';
					});
				    this.selectedIndex1 = index
					console.log(index)
					console.log(that.tabName[index])
					
					this.listArr_inner=this.listArr_inner.filter(item=>item.type===that.tabName[index])
					console.log(this.listArr_inner)
					
				  },
			getUserInfo(token) {
				// 调用云函数获取用户信息
				uniCloud.callFunction({
					name: 'getUserInfo',
					data: {
						token: token
					},
					success: (res) => {
						if (res.result.code === 0) {
							console.log('业务数据：', res.result.data);
						} else {
							console.error('获取业务数据失败：', res.result.message);
						}
					},
					fail: (err) => {
						console.error('请求失败：', err);
					}
				});
			},
			//获取数据库的列表
			getData(){
				uniCloud.callFunction({
					name:"art_get_all"
				}).then(res =>{
					console.log('获取数据库数据',res)
					this.listArr = res.result.data
					this.listArr_inner = this.listArr.filter(item => {
					    return item.situation !== undefined && 
					           item.situation !== null && 
					           item.situation === 'inner';
					});
					this.listArr_outer = this.listArr.filter(item => {
					    return item.situation !== undefined && 
					           item.situation !== null && 
					           item.situation === 'outer';
					});
					console.log(this.listArr_outer); // 输出所有满足条件的对象
				})
			},
			
			
			gotoDetail(item) {
				let targetPage = '';
				let tableName = '';

				// 根据 type 和 situation 确定目标页面和表名
				if (item.hType === 'tz') { // 讨论类型
					if (item.situation === 'inner') {
						tableName = 'discussion-inner';
						targetPage = '/pages/discussion-detail/discussion-detail';
					} else if (item.situation === 'outer') {
						tableName = 'discussion-outer';
						targetPage = '/pages/discussion-detail/discussion-detail';
					}
				} else if (item.hType === 'dz') { // 搭子类型
					targetPage = '/pages/companion-detail/companion-detail';
				} else if (item.hType === 'xz') { // 闲置类型
					targetPage = '/pages/auction-detail/auction-detail';
				} else {
					targetPage = '/pages/detail/detail';
				}

				// 查询对应表的数据
				if (tableName) {
					uniCloud.callFunction({
						name: 'getDiscussionDetail',
						data: {
							tableName: tableName,
							id: item._id
						},
						success: (res) => {
							if (res.result.code === 0) {
								const detailData = res.result.data["0"];
								console.log('detailData',detailData)
								// 跳转到目标页面并传递数据
								uni.navigateTo({
									url: targetPage,
									success: function (res) {
										res.eventChannel.emit('sendData', {
											ID_token: detailData.ID_token,
											id:detailData._id,
											head: detailData.head,
											detail: detailData.detail,
											answer: detailData.answers || []
										});
									}
								});
							} else {
								console.error('获取讨论详情失败：', res.result.message);
							}
						},
						fail: (err) => {
							console.error('请求失败：', err);
						}
					});
				} else {
					// 非讨论类型，直接跳转
					uni.navigateTo({
						url: targetPage,
						success: function (res) {
							res.eventChannel.emit('sendData', { head: item.head, detail: item.detail });
						}
					});
				}
			},

		}
	}
</script>

<style lang='scss' scoped>

	
.navscroll{
	height: 100rpx;
	background:#F7F8FA;
	white-space: nowrap;
	padding-top: 10rpx;
	.item{
		font-size: 40rpx;
		display: inline-block;
		line-height:70rpx;
		padding:0 30rpx;
		
		
		
	}
	.item.active {
	
	  background-color: #BBBCBD;
	  color: white;
	  border-color: #007AFF;
	  box-shadow: 0 2rpx 8rpx rgba(0,122,255,0.4);
	}
}

.content{
	padding:30rpx;
	.row{
		border-bottom: 1px dotted #efefef;
		padding:15rpx 0;
		
	}
}

.popup-content {
	height: 400rpx;  // 增加高度以适应新内容
	padding: 20rpx;
	padding-top: 40rpx;
	padding-left: 30rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.header {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
}

.logo {
	width: 40rpx;
	height: 40rpx;
	margin-right: 10rpx;
}

.title {
	font-family: '黑体';
	font-size: 32rpx;
	font-weight: bold;
	text-align: left;
}

.subtitle {
	font-family: '黑体';
	font-size: 28rpx;
	font-weight: bold;
	text-transform: uppercase;
	text-align: left;
	margin-bottom: 20rpx;
}

.user-info {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	margin: 15rpx 0;
	padding: 15rpx 30rpx;
	border-top: 1px dashed #ddd;
	border-bottom: 1px dashed #ddd;
}

.user-avatar {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	margin-right: 20rpx;
}

.username {
	font-size: 28rpx;
	color: #333;
	line-height: 80rpx;
}

.button-container {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 90%;
	padding: 0 20rpx;
	margin-top: 20rpx;
}

.button {
	width: 150rpx;
	border-radius: 25rpx;
	flex: none;
}

.spacer {
	width: 50rpx;
}

</style>
