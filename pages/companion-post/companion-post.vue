<template>
	<view class='employ'>
		
		<u-form
				labelPosition="top"
				:model="dataValue"
				:rules="rules"
				ref="form1"
		>	
		
		<view class='header'>
			<view class='exit'><u-icon name='close'></u-icon></view>
			<view class='text'>发布需求</view>
			<view class='button'><u-button @click="onSubmit" type='warning' text='发布' round ref="files"></u-button></view>
		</view>
		
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
		
		<view class='detail'>
			<view class='cell'>
				<u-form-item
									label="伙伴"
									prop="hb"
									
									ref="item1"
							>
				<u-textarea v-model='dataValue.hb' placeholder="请输入问题" border="bottom" height=40 maxlength="40" count autoHeight></u-textarea>
			
				</u-form-item>
			</view>
			
			<view class='cell'>
				<text>你的名义</text>
				<u-textarea v-model='dataValue.head' placeholder="请输入问题" border="none" height=40 maxlength="40" count autoHeight></u-textarea>
				
			</view>
			<view class='cell'>
				<text>详细描述</text>
				<u-textarea v-model='dataValue.detail' placeholder="请输入问题" border="none" height=40 maxlength="40" count autoHeight></u-textarea>
				
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
		
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList1: [],

				imgStyle:{
					height:80,
					width:80
				},
				imageValue:[],
				picurls:[],
				rules:{},
				dataValue:{
					hb:'',
					head:'',
					detail:'',
					type:'',
					situation:'inner',
					
				},
				username:'',
				list:['社团','社团','科研','兼职'],
				curNow:0,
				views: ['社团', '科研', '搭伙', '兼职'] ,// 视图内容数组
				activeIndex: null, // 当前激活的view的索引

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
											console.log('res',res)
											that.picurls.push(res.fileID)
										},
										fail: (err) => {
											reject(err); // 处理失败
										},
										});
									});
									},
			    
			
			
			
			uploadSuccess(e){
			
			this.picurls = e.tempFilePaths
			console.log(e,this.picurls)
			},
			async onSubmit(e){
								try{
									// await this.$refs.files.upload()

									const that =this
									let type = this.list[that.curNow]
									
								
									console.log(this.dataValue)
									let detail = this.dataValue
									uniCloud.callFunction({
										name:'art_add_row',
										data:{
											detail,
											picurls:this.picurls,
											hType:'dz'
											
										}
									}).then(res=>{
										console.log('res',res)
										uni.showToast({
												title: '提交成功',
												icon: 'success'
												});
												
										setTimeout(()=> { uni.reLaunch({
											url:'/pages/post-home/post-home'
										})},1000)
										
												
									})
								}catch(error){
									console.error('上传失败',error)
								}}
			,
			sectionChange(e){
				this.curNow =e
			},
			setActive(index) {
			      this.activeIndex = index; // 设置当前激活的view的索引
					if(index ==0){
						this.dataValue.type='社团'
					}
					else if(index==1){
						this.dataValue.type='科研'
					}
					else if(index==2){
						this.dataValue.type='找搭子'
					}
					else if (index==3){
						this.dataValue.type='兼职'
					}
			    }
		}
	}
</script>

<style lang="scss">
.employ{
	.header{
		padding:20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
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
	.detail{
		.cell{
			margin-top: 20rpx;
			padding: 25rpx;
		}
	}
}
</style>
