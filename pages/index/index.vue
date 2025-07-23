<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<!-- <u-back-top :scroll-top="scrollTop"></u-back-top> -->
		<u-back-top :scroll-top="scrollTop" :icon="top_text" :custom-style="{right: '40rpx', bottom: '120rpx'}" />
		<!-- 顶部搜索栏和学校选择 -->
		<view class="top-bar">
			<view class="search-container">
				<u-search
					placeholder="搜索内容"
					v-model="searchKeyword"
					:show-action="false"
					:clearabled="true"
					@search="handleSearch"
					@custom="handleSearch"
					:customStyle="{background: '#F7F8FA', flex: 1}"
				></u-search>
			</view>
		</view>
		
		<!-- 地理位置权限请求弹窗 -->
		<u-popup :show="showLocationPopup" mode="center" round="10">
			<view class="location-popup">
				<view class="popup-header">
					<text class="title">位置信息请求</text>
				</view>
				<view class="popup-content">
					<text class="message">为了给您推荐附近的学校，需要获取您的位置信息</text>
					<view class="button-group">
						<u-button 
							text="拒绝" 
							@click="handleLocationReject"
							:customStyle="{width: '200rpx', marginRight: '20rpx'}"
						></u-button>
						<u-button 
							text="允许" 
							color="#00AB5B"
							@click="handleLocationAccept"
							:customStyle="{width: '200rpx'}"
						></u-button>
					</view>
				</view>
			</view>
		</u-popup>
		
		<!-- 学校选择弹窗 -->
		<u-popup :show="showSchoolPopup" mode="center" round="10" @close="showSchoolPopup = false">
			<view class="school-popup">
				<view class="popup-header">
					<text class="title">选择学校</text>
					<u-icon name="close" @click="showSchoolPopup = false"></u-icon>
				</view>
				
				<view class="school-content">
					<scroll-view scroll-y class="province-list">
						<view 
							v-for="(province, index) in provinces" 
							:key="index"
							class="province-item"
							:class="{ active: selectedProvince === province }"
							@click="selectProvince(province)"
						>
							{{ province }}
						</view>
					</scroll-view>
					
					<scroll-view scroll-y class="university-list">
						<view 
							v-for="(university, index) in currentUniversities" 
							:key="index"
							class="university-item"
							@click="selectUniversity(university)"
						>
							{{ university }}
						</view>
					</scroll-view>
				</view>
			</view>
		</u-popup>
		
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
		
		<van-tabs v-model:active="activeName" type='line' line-height='3px' line-width='30px' color='blue' animated> 
		  <van-tab title="校内" name="a">
			  <view>
				  <scroll-view scroll-x class='navscroll'>
					<view class="item"
					      v-for="(item, index) in tabName"
					      :key="index"
					      :class="{ active: selectedIndex1 === index }"
					      @click="selectItem_inner(index)">
					  <text class="item-text">{{ item }}</text>
					</view>
				  </scroll-view>
				  
				  <view class='content'>
					  <view class='row' v-for="(item, index) in listArr_inner" :key="item._id">
						  <Newsbox @click="gotoDetail(item)" :typeLabel="item.hType" :title="item.head" :content='item.detail' :seqNum="index+1" :pic='item.picurls' situation="inner"></Newsbox>
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
								  <view class='row' v-for="(item, index) in listArr_outer" :key="item._id">
						  <Newsbox @click="gotoDetail(item)" :typeLabel="item.hType" :title="item.head" :content='item.detail' :seqNum="index+1" :pic='item.picurls' situation="outer"></Newsbox>
								  </view>
			</view>
			  
			  
		</van-tab>
		  
		</van-tabs>


	</view>

</template>

<script>
import{onReachBottom} from '@dcloudio/uni-app'
	export default {
		data() {
			return {
				top_text:'TOP',
				scrollTop: 0,
				page: 1,
				pageSize: 10,
				searchKeyword: '',
				showLocationPopup: false,
				showSchoolPopup: false,
				selectedProvince: '',
				selectedSchool: '',
				currentSchool: '',
				userLocation: null,
				provinces: ['北京', '上海', '广东', '江苏', '浙江', '四川', '湖北', '陕西', '山东', '福建'],
				currentUniversities: [],
				schoolOptions: [],
				// 模拟数据，实际使用时应该从后端获取
				universitiesByProvince: {
					'北京': ['北京大学', '清华大学', '中国人民大学', '北京师范大学'],
					'上海': ['复旦大学', '上海交通大学', '同济大学', '华东师范大学'],
					'广东': ['中山大学', '华南理工大学', '暨南大学', '华南师范大学'],
					// ... 其他省份的大学
				},
				showPop: false,
				selectedIndex: -1, // 初始没有选中项
				selectedIndex1:-1,
				userInfo: {
					nickname: "用户"+Math.floor(Math.random() * 10000),
					avatar: 'https://mp-f64dc8e9-0824-4c0c-bbb7-13f1287eb6e2.cdn.bspapp.com/cloudstorage/one.png',
					openid: '',
					token: ''
				},
				tabName: ['全部', '找搭子', '闲置', '讨论', '兼职', '科研', '社团'],
				tabName1: ['全部', '项目支持', '推广成果', '科研合作', '广告', '讨论', '兼职'],
				activeName:'',
				listArr:['1','2','3'],
				listArr_inner:[],
				listArr_outer:[],
				title: 'Hello',
				type:['samepeople','unused','topic'],
				head:['寻找一起冲浪的小伙伴','用了四年的充电宝','有没有推荐的强化学习视频'],
			}
		},
		onReachBottom(){
			console.log('到底了')
			this.page++
			this.updateList()
			
		
		},
		onPageScroll(e) {
     this.scrollTop = e.scrollTop;
   },
		onLoad() {
			
			   this.getData()
            	console.log('dataget',this.listArr)  //获得所有帖子条幅数据

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
			updateList(){
				uniCloud.callFunction({
					name:'updateData',
					data:{
						page:this.page,
						pageSize:this.pageSize
					}
				}).then(res=>{
					console.log('更新数据',res)
					
					let listArr = res.result.data
					let listArr_inner = listArr.filter(item => {
					    return item.situation !== undefined && 
					           item.situation !== null && 
					           item.situation === 'inner';
					});
					let listArr_outer = listArr.filter(item => {
					    return item.situation !== undefined && 
					           item.situation !== null && 
					           item.situation === 'outer';
					});
					this.listArr_inner = [...this.listArr_inner,...listArr_inner]
					this.listArr_outer = [...this.listArr_outer,...listArr_outer]
				})
			},
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
							console.log('登录凭证：', loginRes);	
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
													console.log('用户信息', userRes.result.data)
													const userData = userRes.result.data["0"]; // 获取数组中的第一个对象
													this.userInfo = userData;
													console.log('用户信息存储', this.userInfo)
													// 存储用户信息到本地
													wx.setStorageSync('userInfo', {
														avatarUrl: userData.avatarUrl,
														nickName: userData.nickName
													});
													
													// 更新全局变量
													this.$globalData.userInfo = {
														nickname: userData.nickName,
														avatar: userData.avatarUrl,
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
				this.selectedIndex = index;
				const that = this;
				this.listArr_outer = this.listArr.filter(item => {
					return item.situation !== undefined && 
						   item.situation !== null && 
						   item.situation === 'outer';
				});
				this.selectedIndex = index;
				console.log(index);
				console.log(that.tabName1[index]);
				
				if (index === 0) {
					// 如果是"全部"选项，显示所有内容
					this.listArr_outer = this.listArr.filter(item => 
						item.situation === 'outer'
					);
				} else {
					this.listArr_outer = this.listArr_outer.filter(item => 
						item.type === index
					);
				}
				console.log('校外数据', this.listArr_outer);
			},
			selectItem_inner(index) {
				const that = this;
				this.listArr_inner = this.listArr.filter(item => {
					return item.situation !== undefined && 
						   item.situation !== null && 
						   item.situation === 'inner';
				});
				this.selectedIndex1 = index;
				console.log(index);
				console.log(that.tabName[index]);
				
				if (index === 0) {
					// 如果是"全部"选项，显示所有内容
					this.listArr_inner = this.listArr.filter(item => 
						item.situation === 'inner'
					);
				} else {
					this.listArr_inner = this.listArr_inner.filter(item => 
						item.type === that.tabName[index]
					);
				}
				console.log(this.listArr_inner);
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
					name:"art_get_all",
					data:{
						page:this.page,	
						pageSize:this.pageSize
					}
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
					console.log('校内数据',this.listArr_inner); // 输出所有满足条件的对象
				})
			},
			
			
			// gotoDetail(item) {
			// 	let targetPage = '';
			// 	let tableName = '';

			// 	// 根据 type 和 situation 确定目标页面和表名
			// 	if (item.hType === 'tz') { // 讨论类型
			// 		if (item.situation === 'inner') {
			// 			tableName = 'discussion-inner';
			// 			targetPage = '/pages/discussion-detail/discussion-detail';
			// 		} else if (item.situation === 'outer') {
			// 			tableName = 'discussion-outer';
			// 			targetPage = '/pages/discussion-detail/discussion-detail';
			// 		}
			// 	} else if (item.hType === 'dz') { // 搭子类型
			// 		targetPage = '/pages/companion-detail/companion-detail';
			// 	} else if (item.hType === 'xz') { // 闲置类型
			// 		targetPage = '/pages/auction-detail/auction-detail';
			// 		uni.navigateTo({
			// 			url: targetPage,
			// 			success: function (res) {
			// 				res.eventChannel.emit('sendData', {
			// 					_id: item._id,
			// 					posttime: item.posttime,
			// 					picurls: item.picurls,
			// 					hType: item.hType,
			// 					situation: item.situation,
			// 					head: item.head,
			// 					detail: item.detail,
			// 					price: item.price,
			// 					way_price: item.way_price,
			// 					type: item.type,
			// 					ID_token: item.ID_token
			// 				});
			// 			}
			// 		});
			// 	} else {
			// 		targetPage = '/pages/detail/detail';
			// 	}

			// 	// 查询对应表的数据
			// 	if (tableName) {
			// 		uniCloud.callFunction({
			// 			name: 'getDiscussionDetail',
			// 			data: {
			// 				tableName: "content-table",
			// 				id: item._id
			// 			},
			// 			success: (res) => {
			// 				if (res.result.code === 0) {
			// 					const detailData = res.result.data["0"];
			// 					console.log('detailData',detailData)
			// 					// 跳转到目标页面并传递数据
			// 					uni.navigateTo({
			// 						url: targetPage,
			// 						success: function (res) {
			// 							res.eventChannel.emit('sendData', {
			// 								ID_token: detailData.ID_token,
			// 								id:detailData._id,
			// 								head: detailData.head,
			// 								picurls:detailData.picurls,
			// 								detail: detailData.detail,
			// 								answer: detailData.answers || []
			// 							});
			// 						}
			// 					});
			// 				} else {
			// 					console.error('获取讨论详情失败：', res.result.message);
			// 				}
			// 			},
			// 			fail: (err) => {
			// 				console.error('请求失败：', err);
			// 			}
			// 		});
			// 	} else {
			// 		// 非讨论类型，直接跳转
			// 		// uni.navigateTo({
			// 		// 	url: targetPage,
			// 		// 	success: function (res) {
			// 		// 		res.eventChannel.emit('sendData', { head: item.head, detail: item.detail });
			// 		// 	}
			// 		// });
			// 	}
			// },
			// 在 index.vue 中修改 gotoDetail 方法
		gotoDetail(item) {
			console.log('点击了这样',item)
			// 1. 数据验证
			if (!item || !item.hType) {
				uni.showToast({
					title: '数据不完整',
					icon: 'none'
				});
				return;
			}

			// 2. 页面路由配置
			const pageConfig = {
				'tz': {
					inner: {
						page: '/pages/discussion-detail/discussion-detail',
						table: 'discussion-inner'
					},
					outer: {
						page: '/pages/discussion-detail/discussion-detail',
						table: 'discussion-outer'
					}
				},
				'dz': {
					page: '/pages/dz-detail/dz-detail'
				},
				'xz': {
					page: '/pages/auction-detail/auction-detail'
				},
				'jz':{
					page: '/pages/companion-detail/companion-detail'
				}
			};

			// 3. 获取目标页面配置
			const config = pageConfig[item.hType];
			if (!config) {
				uni.showToast({
					title: '未知的内容类型',
					icon: 'none'
				});
				return;
			}

			// 4. 处理页面跳转
			const handleNavigation = (targetPage, data) => {
				uni.navigateTo({
					url: targetPage,
					success: (res) => {
						res.eventChannel.emit('sendData', data);
					},
					fail: (err) => {
						console.error('页面跳转失败：', err);
						uni.showToast({
							title: '页面跳转失败',
							icon: 'none'
						});
					}
				});
			};

			// 5. 根据不同类型处理数据
			if (item.hType === 'tz') {
				// 讨论类型
				const tableConfig = config[item.situation];
				if (!tableConfig) {
					uni.showToast({
						title: '未知的场景类型',
						icon: 'none'
					});
					return;
				}

				// 获取讨论详情
				uniCloud.callFunction({
					name: 'getDiscussionDetail',
					data: {
						tableName: "content-table",
						id: item._id
					},
					success: (res) => {
						if (res.result.code === 0) {
							const detailData = res.result.data["0"];
							handleNavigation(tableConfig.page, {
								ID_token: detailData.ID_token,
								id: detailData._id,
								head: detailData.head,
								picurls: detailData.picurls,
								detail: detailData.detail,
								answer: detailData.answers || []
							});
						} else {
							uni.showToast({
								title: res.result.message || '获取详情失败',
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						console.error('获取讨论详情失败：', err);
						uni.showToast({
							title: '获取详情失败',
							icon: 'none'
						});
					}
				});
			} else if (item.hType === 'xz') {
				// 闲置类型
				const auctionData = {
					_id: item._id,
					posttime: item.posttime || new Date().toISOString(),
					picurls: item.picurls || [],
					hType: item.hType,
					situation: item.situation || 'inner',
					head: item.head || '无标题',
					detail: item.detail || '暂无描述',
					price: item.price || 0,
					way_price: item.way_price || '0',
					type: item.type || '',
					ID_token: item.ID_token || ''
				};
				handleNavigation(config.page, auctionData);
			} else if (item.hType === 'dz') {
				// 搭子类型
				handleNavigation(config.page, {
					_id: item._id,
					posttime: item.posttime,
					picurls: item.picurls || [],
					hType: item.hType,
					hb: item.hb || '',
					head: item.head || '无标题',
					detail: item.detail || '暂无描述',
					type: item.type || '',
					situation: item.situation || 'inner',
					ID_token: item.ID_token || '',
					currentCount: item.currentCount || 0,
					maxCount: item.maxCount || 1
				});
			} else if (item.hType === 'jz') {
				// 对于兼职类型，直接使用 item 数据进行跳转
				// companion-detail 页面应该已经准备好接收并处理这个对象
				handleNavigation(config.page, item);
			}
		},
			// 添加搜索处理方法
			handleSearch() {
				if (!this.searchKeyword.trim()) {
					// 如果搜索关键词为空，恢复原始数据
					this.getData();
					return;
				}
				
				// 过滤数据
				const keyword = this.searchKeyword.toLowerCase();
				this.listArr_inner = this.listArr.filter(item => {
					return item.situation === 'inner' && 
						(item.head.toLowerCase().includes(keyword) || 
						 item.detail.toLowerCase().includes(keyword));
				});
				
				this.listArr_outer = this.listArr.filter(item => {
					return item.situation === 'outer' && 
						(item.head.toLowerCase().includes(keyword) || 
						 item.detail.toLowerCase().includes(keyword));
				});
			},
			selectProvince(province) {
				this.selectedProvince = province;
				this.currentUniversities = this.universitiesByProvince[province] || [];
			},
			selectUniversity(university) {
				this.selectedSchool = university;
				this.currentSchool = university;
				this.showSchoolPopup = false;
			},
			handleSchoolSelect() {
				// 先显示位置权限请求弹窗
				this.showLocationPopup = true;
			},
			
			handleLocationReject() {
				this.showLocationPopup = false;
				// 用户拒绝后直接显示学校选择弹窗
				this.showSchoolPopup = true;
			},
			
			handleLocationAccept() {
				this.showLocationPopup = false;
				// 获取用户位置信息
				wx.getLocation({
					type: 'gcj02',
					success: (res) => {
						console.log('获取位置成功：', res);
						this.userLocation = res;
						// 打印详细的位置信息
						console.log('纬度：', res.latitude);
						console.log('经度：', res.longitude);
						console.log('速度：', res.speed);
						console.log('精度：', res.accuracy);
						console.log('高度：', res.altitude);
						console.log('垂直精度：', res.verticalAccuracy);
						console.log('水平精度：', res.horizontalAccuracy);
						
						// 根据位置信息推荐学校
						this.recommendSchoolByLocation(res);
					},
					fail: (err) => {
						console.error('获取位置失败：', err);
						uni.showToast({
							title: '获取位置失败',
							icon: 'none'
						});
					},
					complete: () => {
						// 无论是否获取到位置，都显示学校选择弹窗
						this.showSchoolPopup = true;
					}
				});
			},
			
			recommendSchoolByLocation(location) {
				// 这里可以根据经纬度调用后端API获取附近的学校
				// 暂时使用模拟数据
				console.log('根据位置推荐学校：', location);
			},
		}
	}
</script>

<style lang='scss' scoped>
.top-bar {
	display: flex;
	align-items: center;
	padding: 20rpx 30rpx;
	background-color: #FFFFFF;
	position: sticky;
	top: 0;
	z-index: 100;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	
	.search-container {
		flex: 1;
		margin-right: 20rpx;
	}
}

.school-popup {
	width: 700rpx;
	height: 800rpx;
	background-color: #FFFFFF;
	border-radius: 20rpx;
	overflow: hidden;
	
	.popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1rpx solid #eee;
		
		.title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
		}
	}
	
	.school-content {
		display: flex;
		height: calc(100% - 100rpx);
		
		.province-list {
			width: 200rpx;
			border-right: 1rpx solid #eee;
			
			.province-item {
				padding: 30rpx;
				font-size: 28rpx;
				color: #333;
				text-align: center;
				
				&.active {
					background-color: #f5f5f5;
					color: #00AB5B;
				}
			}
		}
		
		.university-list {
			flex: 1;
			
			.university-item {
				padding: 30rpx;
				font-size: 28rpx;
				color: #333;
				border-bottom: 1rpx solid #eee;
				
				&:active {
					background-color: #f5f5f5;
				}
			}
		}
	}
}

.search-bar {
	padding: 20rpx 30rpx;
	background-color: #FFFFFF;
	position: sticky;
	top: 0;
	z-index: 100;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.navscroll {
	height: 88rpx;
	background: linear-gradient(to right, #f8f9fa, #ffffff);
	white-space: nowrap;
	padding: 0 20rpx;
	position: relative;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	
	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(to right, transparent, #e0e0e0, transparent);
	}
	
	.item {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 88rpx;
		padding: 0 32rpx;
		margin: 0 8rpx;
		position: relative;
		transition: all 0.3s ease;
		
		.item-text {
			font-size: 28rpx;
			color: #666;
			font-weight: 500;
			transition: all 0.3s ease;
		}
		
		&.active {
			.item-text {
				color: #6a11cb;
				font-weight: 600;
			}
			
			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 40rpx;
				height: 4rpx;
				background: linear-gradient(to right, #6a11cb, #2575fc);
				border-radius: 2rpx;
			}
		}
		
		&:active {
			opacity: 0.7;
		}
		
		&:first-child {
			margin-left: 0;
			.item-text {
				font-weight: 600;
			}
		}
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

.location-popup {
	width: 600rpx;
	background-color: #FFFFFF;
	border-radius: 20rpx;
	overflow: hidden;
	
	.popup-header {
		padding: 30rpx;
		border-bottom: 1rpx solid #eee;
		
		.title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			text-align: center;
		}
	}
	
	.popup-content {
		padding: 40rpx 30rpx;
		
		.message {
			font-size: 28rpx;
			color: #666;
			line-height: 1.5;
			margin-bottom: 40rpx;
			display: block;
			text-align: center;
		}
		
		.button-group {
			display: flex;
			justify-content: center;
		}
	}
}

</style>
