<template>
	<view class='page'>
		<view class='header'>
			<view class='exit'>
				<u-icon name="close" size=25 @click="exit"></u-icon>
				</view>
			<view class='text'>发帖提问</view>
			<view class='button'>
				<u-button type="primary" shape="circle" text="发送" @click="onSubmit"></u-button>

			</view>
		</view>
		<view class='content'>
			<view class='ques'>
				<u-textarea v-model='dataValue.head' placeholder="请输入问题" border="none" height=20 maxlength="40" count autoHeight></u-textarea>
				
			</view>

			<view class='detail'>
				<u-textarea v-model='dataValue.detail' placeholder="描述你的问题" height=400 border="none"></u-textarea>
				<u-upload
				:fileList="fileList1"
				@afterRead="afterRead"
				@delete="deletePic"
				multiple
				:maxCount="10"
				@success="uploadSuccess"

				:previewFullImage="true"
						
					></u-upload>
			</view>
		</view>
		
		<view class='tool'></view>
		
	</view>
</template>

<script>
import { uniCloud } from '@dcloudio/uni-cloud';

	export default {
		data() {
			return {
				dataValue:{
					situation:'inner',
					head:'',
					detail:'',
					type:'讨论',
					answer:[]
					
					
				},
				fileList1:[],
				picUrls: [],
				token: '' // 全局变量存储 token
			};
		},
			onLoad(options) {
				// 从本地缓存中获取 token
				this.token = uni.getStorageSync('token');
				this.dataValue.ID_token = this.token;
				if (!this.token) {
					console.error('未找到 token');
				}
				else{
					console.log('token',this.token)
				}
				this.id = options.id;
				this.title = decodeURIComponent(options.title);
				this.content = decodeURIComponent(options.content);

				this.isEdit = options.isEdit === 'true';
				if(this.isEdit){
					this.dataValue.head = this.title;
					this.dataValue.detail = this.content;
				}
				console.log('接收到的编辑参数：', {
					id: this.id,
					title: this.title,
					content: this.content,
					isEdit: this.isEdit
				});
		
	
	
			},
		methods:{
			async onSubmit(e){
				const that = this
				console.log(e)	
				let updateList =[...this.fileList1]
				 updateList.forEach(item => {
				    item.status = 'uploading';
				    item.message = '正在上传';
				  });
				  uni.showToast({
				  	title:'上传中',
					icon:'fail'
				  })
				  
				  // 触发视图更新，这取决于你使用的框架
				  // 对于Vue.js，可以直接赋值回响应式属性
				  this.fileList1 = updateList;
				  updateList =await Promise.all(updateList.map( async (item) =>{
					try{
							const cloudPath = `uploads/${Date.now()}-${Math.random()}.jpg`;//云端名字和本地地址传上去
							const result = await uniCloud.uploadFile({
								cloudPath,
								filePath:item.url
																	})
							if (result.success){
							  console.log('result',result)
							  that.picUrls.push(result.fileID)
							  return {
									
									url: result.fileID,
									status: 'uploaded',
									message: '上传成功',
							  }
					 }
					}catch(error){
						console.log('error',error)
					}
					
					}))
				console.log('updatelist',updateList)
				this.fileList1 =updateList
				
				// 提交帖子
				let detail = that.dataValue
				// 将fileList1转换为纯URL数组
				const picUrls = that.fileList1.map(file => file.url)
				uniCloud.callFunction({
					name:'addDiscussion',
					data:{
						detail,
						picurls: picUrls, // 使用转换后的URL数组
						hType:'tz', //渲染到主页的盒子需要标识，然后进入不同的详细页面
						token: that.token // 使用全局变量中的 token
					}
				   }).then(res=>{
					console.log('res_前端',res)
					  uni.showToast({
					          title: '提交成功',
					          icon: 'success'
					        });
							
					setTimeout(()=> { uni.reLaunch({
						url:'/pages/post-home/post-home'
					})},1000)}) 
						
			},
			async afterRead(e){
				let uplists =[].concat(e.file) //刚刚上传的文件
				let fileList = this.fileList1  //所有要显示的文件
				console.log('uplist,fileList',uplists,fileList)
				console.log('fileList before:', fileList);
				 
				uplists.map((item) => {
					fileList.push({
						...item,
						status:'uploaded',
						message:'ok'
					})
				})	 
				console.log(fileList)
			},
			deletePic(e){
				this.fileList1.splice(e.index,1)
			},
			exit(){
				uni.switchTab({
					url:'/pages/post-home/post-home'
				})
			}
		}
	}
</script>

<style lang="scss">
.page{
	display: flex;
	flex-direction: column;
	height: 1200rpx;
	background-color:#FFF ;
	
	.header{
		padding: 5rpx 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		
		.text{
			font-size:40rpx;
			font-weight: 600;
		}
		
	}
	
	.content{
		.detail{
			
		}
	}
}
</style>
