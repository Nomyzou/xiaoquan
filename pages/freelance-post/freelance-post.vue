<template>
	<view class='apply'>
		<view class='title'>
			选择身份
		</view>

		<view class='window'>
		   <view class='window1'
				@click="toggleActive('window1')"
				:class="{ active: activeView === 'window1'}"
		   >
			   <image src="https://mp-f64dc8e9-0824-4c0c-bbb7-13f1287eb6e2.cdn.bspapp.com/cloudstorage/e7f62223-7464-43ec-9d86-bb103076b6e7.jpg"  ></image>
			   <text>招聘方</text>
		   </view>
		
			<view class='window2'
							@click="toggleActive('window2')"
							:class="{ active: activeView === 'window2'}"
			>
				<image src='https://mp-f64dc8e9-0824-4c0c-bbb7-13f1287eb6e2.cdn.bspapp.com/cloudstorage/0b0ccd90-1464-44fc-ae01-f8dd13d0215e.jpg' ></image>
				<text>求职方</text>
			</view>
			
			
		</view>
		<u-button @click="nato(activeView)" type='primary'>进入界面</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeView:null,
				imageUrl:'',
			}
		},
		onLoad() {
			
			    uniCloud.callFunction({
			        name: 'getImageUrl',
			        data: {
			            fileID: 'cloudstorage/48c82865-ad3b-402a-8d28-e671c97fef30' // 文件的完整路径
			        }
			    }).then(res => {
			        if (res.result && res.result.url) {
			            this.imageUrl = res.result.url; // 保存到 data 中
			        }
			    }).catch(err => {
			        console.error('获取图片 URL 失败:', err);
			    });
			},
			

		
		methods: {
			nato(e){
				// uni.navigateTo({
				// 	url:'/pages/job_search/job_search'
				// })
				if (e=='window1'){	
					uni.navigateTo({
					url:'/pages/employer-input/employer-input'
				})
				}
				else if (e=='window2'){
					uni.navigateTo({
						url:'/pages/job-search-input/job-search-input'
					})
				}
				
				console.log(e)
			}
			,
			toggleActive(windowName){
				if(this.activeView === windowName){
					this.activeView = null
				}
				else{
					this.activeView = windowName
				}
			}}}
			
				
			
			
 	
</script>

<style lang='scss' scoped>
.apply{
	.title{
		width: 100%;
		padding-left: 40%;
		padding-top: 40rpx;
		font-size: x-large;
		
		margin-bottom: 200rpx;
	}
	.window{
	
	width: 750rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-around;

	height: 700rpx;
	.window1{
		height: 300rpx;
		padding:20rpx;
		width: 30%;
		
		background-color: wheat;
		image{
			height:300rpx;
			width:100%;
			margin-bottom: 30rpx;
		};
		text{
			padding:30%;
			font-weight: 600;
			color: peachpuff
			
		};
		&.active{
			border: 5px solid #DFAB2D ;
		}
	}
	.window2{
		padding:20rpx;
		width:30%;
		height: 300rpx;
		background-color: #2EC4D0;
		
		image{
			height:300rpx;
			width:100%;
			margin-bottom: 30rpx;
		}
		text{
			
			padding: 30%;
			font-weight: 600;
			color:lightseagreen;
		}
		&.active{
			border:5px solid #07A285;
			
		}
		
	}
}
}
</style>
