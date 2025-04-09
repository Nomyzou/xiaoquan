<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		
		
	<!-- 	<view class="box2" hover-class="boxHover">
			<view class="inner" hover-class="innerHover" hover-stop-propagation></view>
		</view> -->
		
		
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
				selectedIndex: -1, // 初始没有选中项
				selectedIndex1:-1,

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
			// this.getUserInfo()
			this.getData()
			console.log('dataget',this.listArr)
			
		},
		methods: {
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
			// getUserInfo() {
			//       // 获取用户信息
			//       uni.getUserProfile({
			//         desc: '获取用户信息用于完善个人资料',  // 授权说明
			//         success: (res) => {
			//           console.log('用户信息：', res.userInfo);
			//           // 将用户信息存储在本地缓存中
			//           uni.setStorageSync('userInfo', res.userInfo);
			//         },
			//         fail: (err) => {
			//           console.error('获取用户信息失败：', err);
			//         }
			//       });},
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
			
			  if (item.hType === 'dz') {
			    targetPage = '/pages/companion-detail/companion-detail';
			  } else if (item.hType === 'xz') {
			    targetPage = '/pages/auction-detail/auction-detail';
			  } else if (item.hType === 'tz') {
			    targetPage = '/pages/discussion-detail/discussion-detail';
			  } else {
			    targetPage = '/pages/detail/detail';
			  }
			
			  // 使用 eventChannel 传递 head 和 detail 数据
			  uni.navigateTo({
			    url: targetPage,
			    success: function (res) {
			      res.eventChannel.emit('sendData', { head: item.head, detail: item.detail });
			    }
			  });
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

</style>
