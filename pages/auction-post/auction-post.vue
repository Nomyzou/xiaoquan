<template>
	<view class='spare'>
		<view class='header'>
			<view class='text'>发闲置</view>
			<view>
				<u-button type='primary' @click="onSubmit" round>发布</u-button>

			</view></view>
		<view class='detail_box'>
		<!-- <u-text text="我用十年青春,赴你最后之约"></u-text> -->
		<view class='input'> 
		<u-input v-model="dataValue.head"  border="bottom" clearable placeholder="宝贝名称"></u-input>
		
		</view>
		
		<view class='textarea'>
		<u-textarea  auto-height v-model='dataValue.detail' placeholder="请输入内容" border="none"  ></u-textarea>
		</view>
		
		<view class='upload'>
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
			<view class='form'>
<!-- 		



				</view>
				
			<view class='pic'>
				<!-- <van-uploader v-model="fileList"> -->
<!-- 				  <template #preview-cover="{ file }">
				    <div class="preview-cover van-ellipsis">{{ file.name }}</div>
				  </template> -->
				  
			<!-- 	</van-uploader> -->
<!-- 			<van-uploader :after-read="afterRead"/ -->


				</view>
		</view>
		
		<view class='price_box' >
		<!-- 	<van-cell @touchstart.stop="show = true" title='价格' >¥ {{price}}</van-cell>
			<van-cell title='发货方式' >¥ {{price}}</van-cell> -->
			
		<!-- 	<van-cell-group inset>
			  <van-cell title="价格" clickable=true @click='show = true'>¥ {{price}}</van-cell>
			  <van-cell title="发货方式" value="自选" clickable=true @click='pop_show = true' />
			</van-cell-group> -->
			
			
				
					<u-popup :show="pop_show" @close="close_pop" @open="open_pop">
			            <view class='pop_detail'>
			                <text>发货方式：运费</text>
							<view class='cell1'>
								<view class='cell_header'>邮寄（运费）</view>
								<view class='two_radio'>
									<u-radio-group 
										iconPlacement="right"
									    placement="row"
										
										>
										
											<u-radio name='input' @change="radioChange1" :customStyle="{marginRight: '20rpx'}" activeColor="#ee3" label="自填"></u-radio>
											<u-radio name='noput' @change='radioChange2' :customStyle="{marginLeft: '250rpx'}" activeColor="#ee3" label="包邮"></u-radio>
									</u-radio-group>
								
								</view>
								<view class='input'>
									<u-input v-modal='dataValue.way_price' v-if='radioInput' placeholder="¥0.0"></u-input>
									
								</view>
							</view>
							<view class='cell2'>
								<u-radio-group
								
								icon-placement="right"
								>
								<u-radio activeColor="#ee3" label="自提"></u-radio>
								
								</u-radio-group>
								
							</view>
			            </view>
					</u-popup>

				

			
    <!-- <u-button type="primary">主要按钮</u-button> -->
	<view>
		<u-keyboard ref="uKeyboard" @cancel="cancel" @change="valueChange" @confirm="confirm" mode="number" :show=show></u-keyboard>
		
		
		

	</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataValue:{
					situation:'inner',
					head:'',
					detail:'',
					price:'0',
					way_price:'0',
					type:'闲置',
					
					situation:'inner'
				},
				radioInput:false,
				picurls:[],
				fileList1:[],
				newFileList:[],
				description:'',
				pop_show : false,
				show : false,
				price : '',
			    tempValue: '', // 用于临时存储键盘输入的值
			    isDecimal: false, // 标记是否已输入小数点
			    decimalFactor: 0.1, // 小数点后的乘数因子,
				description: null
				
				
			}
		},
		methods: {
			radioChange2(e){
				this.radioInput=false
				
			},
			
			radioChange1(e){
			console.log(e)	
			this.radioInput =true
			},
			
			
			async onSubmit(e){
				console.log(e)	
				const that = this
				let updateList =[...this.fileList1]
				 updateList.forEach(item => {
				    item.status = 'uploading';
				    item.message = '正在上传';
				  });
				  
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
							  that.picurls.push(result.fileID)
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
				this.fileList1 =updateList  //里面都是云存储的id
				
				let detail = that.dataValue
				console.log('picurls',that.picurls)
				uniCloud.callFunction({
					name:'art_add_row',
					data:{
						detail,
						picurls:that.picurls,
						hType:'xz'
						
					}
				})
				
				setTimeout(()=>{
					uni.reLaunch({
						url:'/pages/add/add'
					})
				},1000)
						
			},
			
			
			
			
			uploadSuccess(e){
				console.log(e)
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
						message:''
					})
				})	 
				console.log(fileList)
			},
			deletePic(e){
				this.fileList1.splice(e.index,1)
			},
			
			
			open_pop(){
				this.pop_show = true
			},
			close_pop(){
				this.pop_show = false
			},
			
		 cancel() {
		      this.show = false; // 隐藏键盘
		      this.tempValue = ''; // 清空临时值
		      this.isDecimal = false; // 重置小数点标记
		      this.decimalFactor = 0.1; // 重置小数点因子
		    },
		    valueChange(value) {
		      if (value === '.') {
				  console.log('检测到dot')
		        if (this.isDecimal) {
		          return; // 如果已经有一个小数点，则忽略额外的小数点输入
		        } else {
		          this.isDecimal = true; // 设置小数点标记
		          this.tempValue += value; // 添加小数点到临时值
		          return;
		        }
		      }
			  else{
				  this.tempValue += value
			  }
		      
	
		    },
		    confirm() {
		      this.price = this.tempValue; // 更新 price
			  this.price = Number(this.price)
		      this.show = false; // 隐藏键盘
		      this.tempValue = ''; // 清空临时值
		      this.isDecimal = false; // 重置小数点标记
		      this.decimalFactor = 0.1; // 重置小数点因子
			  this.dataValue.price =this.price
		    }
		}
	}
</script>

<style lang='scss' scoped>
	.spare{
		padding: 20rpx;
		background-color: #F8F8F8;
		
		.header{

			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.text{
				font-size: 40rpx;
				font-weight: 600;
				line-height: 90rpx ;
			}
		}
		
		.detail_box{
			position: relative;
			margin-top: 20rpx;
			height: 700rpx;
			background-color: #FFFF;
			border-radius: 5%;
		
			
			.input{
				height:40rpx;
				margin:5rpx 20rpx 10rpx 20rpx;
			}
			.textarea{
				height: 60rpx;
				width: 95%;
				position: absolute;
				top:100rpx;
				left:10rpx
			}
			.upload{
				position: absolute;
				bottom:10rpx;
				left:10rpx
			}
			
			
			.pic{
				padding: 0 0 0 20rpx;
				height:100rpx;
			
				 .preview-cover {
				    position: absolute;
				    bottom: 0;
				    box-sizing: border-box;
				    width: 100%;
				    padding: 4px;
				    color: #fff;
				    font-size: 12px;
				    text-align: center;
				    background: rgba(0, 0, 0, 0.3);}
			
		}
		}	
		.price_box{
			margin-top: 20rpx;
			height:200rpx;
			background-color: #FFFF;
			border-radius: 5%;
			
			
				.pop_detail{
					border-radius: 50rpx;
					height: 500rpx;
					padding: 20rpx;
					background-color: #F8F8F8;
					font-weight: 900;
					display: flex;
					flex-direction: column;
					align-items: center;	
					.cell1{
						margin-top: 40rpx;
						border-radius: 20rpx;
						padding: 20rpx;
						background-color: #FFFF;
						width: 80%;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						
						margin-bottom: 20rpx;
						.two_radio{
							padding-top: 10rpx;
							width: 100%;
							display: flex;
							flex-direction: row;
							justify-content: space-between;
						}
						.input{
							margin:20rpx 0;
						}
					}
					.cell2{
						padding: 10rpx;
						background-color: #FFFF;
						border-radius: 10rpx;
						width: 80%;
						height:20%
					}
					
				
			}
		}
	}

</style>
