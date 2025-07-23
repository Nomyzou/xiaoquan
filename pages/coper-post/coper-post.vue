<template>
	<view class='coper'>
		<view class='header'>
			<u-icon 
				name='close' 
				size="24" 
				@click="handleClose"
				:customStyle="{padding: '20rpx'}"
			></u-icon>
			<text class='title'>发布合作</text>
			<u-button 
				text='发布' 
				color='#00AB5B' 
				@click="handlePublish"
				:customStyle="{width: '120rpx', marginRight: '20rpx'}"
			></u-button>
		</view>
		
		<view class='form-container'>
			<view class='input-group'>
				<text class='label'>需要合作的项目是：</text>
				<u-input
					placeholder="请输入项目名称"
					border="bottom"
					v-model="formData.head"
					@change="change"
					:customStyle="{padding: '20rpx 0'}"
				></u-input>
			</view>
			
			<view class='type-selector'>
				<text class='label'>选择合作类型：</text>
				<view class='content'>
					<view 
						v-for="(item, index) in views" 
						:key="index" 
						:class="['box', { 'active': activeIndex === index }]" 
						@click="setActive(index)"
					>
						{{ item }}
					</view>
				</view>
			</view>
			
			<view class='input-group'>
				<text class='label'>请详细描述你的合作内容：</text>
				<u-textarea
					placeholder="请输入详细描述"
					v-model="formData.detail"
					@change="change"
					border="none"
					auto-height
					:customStyle="{padding: '20rpx', background: '#F8F8F8', borderRadius: '12rpx'}"
				></u-textarea>
			</view>
			
			<view class='upload-group'>
				<text class='label'>往期风采</text>
				<u-upload
					:fileList="fileList1"
					@afterRead="afterRead"
					@delete="deletePic"
					name="1"
					multiple
					:maxCount="10"
					:customStyle="{padding: '20rpx 0'}"
				></u-upload>
			</view>
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
			      uni.reLaunch({
			          url: '/pages/post-home/post-home'
			      });
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
.coper {
	padding: 30rpx;
	background-color: #F8F8F8;
	min-height: 100vh;
	
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 40rpx;
		position: relative;
		height: 80rpx;
		
		.title {
			font-size: 36rpx;
			font-weight: 600;
			color: #333;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}
	}
	
	.form-container {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 30rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
		
		.label {
			font-size: 30rpx;
			color: #333;
			font-weight: 500;
			margin-bottom: 20rpx;
			display: block;
		}
		
		.input-group {
			margin-bottom: 40rpx;
		}
		
		.type-selector {
			margin-bottom: 40rpx;
			
			.content {
				display: flex;
				flex-wrap: wrap;
				gap: 20rpx;
				
				.box {
					width: calc(50% - 10rpx);
					height: 80rpx;
					background: linear-gradient(135deg, #F5F7FA, #E4E7EB);
					border-radius: 12rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28rpx;
					color: #666;
					transition: all 0.3s ease;
					
					&.active {
						background: linear-gradient(135deg, #E3F9E5, #C8E6C9);
						color: #00AB5B;
						font-weight: 600;
						box-shadow: 0 4rpx 12rpx rgba(0, 171, 91, 0.2);
					}
				}
			}
		}
		
		.upload-group {
			margin-top: 40rpx;
		}
	}
}
</style>
