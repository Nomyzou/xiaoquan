<template>
	<view class='coper'>
		<view class='header'>
			<view class='icon'><u-icon name='close'></u-icon></view>
			
			<view class='text'>发布合作</view>
			<view><u-button text='发布' color='#00AB5B' @click="handlePublish"></u-button>
				</view>
		</view>
		<view>
			<text>需要合作的项目是：</text>
			<u-input
		    placeholder="请输入内容"
		    border="surround"
		    v-model="formData.head"
		    @change="change"
		  ></u-input>
		</view>
		
		<view class='content'>
			
			<view 
		      v-for="(item, index) in views" 
		      :key="index" 
		      :class="['box', { 'active': activeIndex === index }]" 
		      @click="setActive(index)">
		      {{ item }}
		    </view>
		</view>
		<view>
			<text>请详细描述你的合作内容：</text>
			<u-input
			  placeholder="请输入内容"
			  border="surround"
			  v-model="formData.detail"
			  @change="change"
			></u-input>
		</view>
		<view class='cell'>
			<text>往期风采</text>
				 <u-upload
				    :fileList="fileList1"
				    @afterRead="afterRead"
				    @delete="deletePic"
				    name="1"
				    multiple
				    :maxCount="10"
				  ></u-upload>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				picurls:[],
				fileList1: [],
				views:['项目投融资','成果落地推广','科研合作','广告需求'],
				activeIndex:null,
				formData: {
				        head: '',
				        detail: '',
				        situation: 'outer',
						type:-1,
						type_name:'',
						
						
				      }
			};
		},
		methods:{
			deletePic(event) {
				        this[`fileList${event.name}`].splice(event.index, 1);
				      },
				      // 新增图片
				async afterRead(event) {
				        // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
											let lists = [].concat(event.file);
											let fileListLen = this[`fileList${event.name}`].length;
											lists.map((item) => {
											this[`fileList${event.name}`].push({
												...item,
												status: "uploading",
												message: "上传中",
											});
											});
										for (let i=0;i<lists.length;i++){
											const file =lists[i]
										try {
												// 调用 UniCloud 上传方法
												const result = await this.uploadToUniCloud(file.url);
										
												// 更新文件状态为成功
												const index = this.fileList1.length - 1;
												this.fileList1.splice(index, 1, {
													...file,
													status: 'success',
													message: '',
													url: result.fileID, // 使用 UniCloud 返回的文件 ID
												});
												} catch (error) {
												// 更新文件状态为失败
												const index = this.fileList1.length - 1;
												this.fileList1.splice(index, 1, {
													...file,
													status: 'failed',
													message: '上传失败',
												});
												console.error('上传失败:', error);
												}
											}
											}
											,
			
				
			uploadToUniCloud(filePath) {
				const that=this
										return new Promise((resolve, reject) => {
											uniCloud.uploadFile({
											filePath: filePath, // 本地文件路径
											cloudPath: `images/${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`, // 云存储路径
											success: (res) => {
												resolve(res); // 返回上传结果
												console.log('res_pic',res)
												that.picurls.push(res.fileID)
											},
											fail: (err) => {
												reject(err); // 处理失败
											},
											});
										});
										},
				    
				
				
				
				uploadSuccess(e){
				console.log(e)	
				this.picurls = e.tempFilePaths
				},
			change(e){
				console.log(e)
			}
			,
			setActive(index) {
			      this.activeIndex = index; // 设置当前激活的view的索引
				  this.formData.type_name = this.views[index];
				  this.formData.type=index
				  console.log(this.formData.type)
			    },
			validateForm() {
			      if (!this.formData.head.trim()) {
			        uni.showToast({ title: '请填写项目名称', icon: 'none' });
			        return false;
			      }
			      // if (!this.formData.type) {
			      //   uni.showToast({ title: '请选择合作类型', icon: 'none' });
			      //   return false;
			      // }
			      if (!this.formData.detail.trim()) {
			        uni.showToast({ title: '请填写详细描述', icon: 'none' });
			        return false;
			      }
			      return true;
			    },

			 handleError(msg) {
			      uni.showToast({ 
			        title: `发布失败: ${msg || '未知错误'}`, 
			        icon: 'none',
			        duration: 3000
			      });
			    },
			  handleClose() {
			      uni.navigateBack();
			    },
			
			async handlePublish() {
				const that=this
			      // 表单验证
			      if (!this.validateForm()) return;
			      
			      try {
			        const res = await uniCloud.callFunction({
			          name: 'art_add_row',
			          data: {
			            detail:that.formData,
						picurls:that.picurls,
						hType:'coper',
						
			            
			          },
					  
					  
			        });
					console.log(res)
			        if (res) {
			          uni.showToast({ title: '发布成功', icon: 'success' });
			          setTimeout(() => uni.navigateBack(), 1500);
			        } else {
			          this.handleError(res.result.message);
			        }
			      } catch (error) {
			        this.handleError(error.message);
			      }
			    },
				

		}
	}
</script>

<style lang="scss">
.coper{
	.header{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		
	}
	.type{
		    .demo-layout {
		        height: 25px;
		        border-radius: 4px;
		    }
		    .bg-purple {
		        background: #CED7E1;
		    }
			.bg-purple-light{
				background: #e5e9f2;

			}
			
			
			
	}
	.content{
		display: flex;
		flex-direction: row;
		justify-content: space-around;	
		flex-wrap: wrap; /* 允许换行 */
		padding: 20rpx;
		.box{
			width: 40%;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			background-color: #F8F8F8;
			height: 60rpx;
			border-radius: 8rpx;
			display: flex;
			justify-content: center;
			align-items: center; /* 垂直居中 */
			
		}
			
	.active{
		background-color: #ecfdef;
		border: 1rpx solid seagreen;
		font-weight: 600;
		color: lightseagreen;
	}
	}
}


</style>
