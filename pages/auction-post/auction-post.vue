<template>
	<view class='spare'>
		<view class='header'>
			<text class='title'>发布闲置</text>
			<u-button 
				type='primary' 
				@click="onSubmit" 
				round 
				size="mini"
				:customStyle="{width: '120rpx', position: 'absolute', right: '30rpx', top: '30rpx'}"
			>发布</u-button>
		</view>
		
		<view class='detail_box'>
			<view class='input_box'>
				<u-input 
					v-model="dataValue.head" 
					border="bottom" 
					clearable 
					placeholder="请输入宝贝名称"
					:customStyle="{padding: '20rpx 0'}"
				></u-input>
			</view>
			
			<view class='textarea_box'>
				<u-textarea
					v-model='dataValue.detail'
					placeholder="请输入宝贝描述"
					border="none"
					auto-height
					:customStyle="{padding: '20rpx'}"
				></u-textarea>
			</view>
			
			<view class='upload_box'>
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
		
		<view class='price_box'>
			<view class='price_input' @click="show = true">
				<text class='label'>价格</text>
				<text class='value'>¥ {{dataValue.price || '0.00'}}</text>
			</view>
			
			<view class='delivery_box' @click="pop_show = true">
				<text class='label'>发货方式</text>
				<text class='value'>{{getDeliveryText()}}</text>
			</view>
		</view>
		
		<u-popup :show="pop_show" @close="close_pop" @open="open_pop" round="10" mode="bottom">
			<view class='pop_detail'>
				<view class='pop_header'>
					<text class='pop_title'>选择发货方式</text>
					<u-icon 
						name="close" 
						size="20" 
						@click="close_pop"
						:customStyle="{position: 'absolute', right: '30rpx', top: '30rpx'}"
					></u-icon>
				</view>
				
				<view class='pop_content'>
					<view class='cell1'>
						<text class='cell_title'>邮寄（运费）</text>
						<view class='radio_group'>
							<u-radio-group iconPlacement="right" placement="row">
								<u-radio 
									name='input' 
									@change="radioChange1" 
									:customStyle="{marginRight: '40rpx'}" 
									activeColor="#4BC164" 
									label="自填"
								></u-radio>
								<u-radio 
									name='noput' 
									@change='radioChange2' 
									activeColor="#4BC164" 
									label="包邮"
								></u-radio>
							</u-radio-group>
						</view>
						
						<view class='input_box' v-if='radioInput'>
							<u-input 
								v-model='dataValue.way_price' 
								placeholder="请输入运费金额"
								:customStyle="{padding: '10rpx 0'}"
								type="number"
							></u-input>
						</view>
					</view>
					
					<view class='cell2'>
						<text class='cell_title'>自提</text>
						<u-radio-group icon-placement="right">
							<u-radio 
								activeColor="#4BC164" 
								label="选择自提"
							></u-radio>
						</u-radio-group>
					</view>
				</view>
			</view>
		</u-popup>
		
		<u-keyboard 
			ref="uKeyboard" 
			@cancel="cancel" 
			@change="valueChange" 
			@confirm="confirm" 
			mode="number" 
			:show="show"
		></u-keyboard>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataValue: {
					situation: 'inner',
					head: '',
					detail: '',
					price: '0',
					way_price: '0',
					type: '闲置',
					situation: 'inner'
				},
				radioInput: false,
				picurls: [],
				fileList1: [],
				newFileList: [],
				pop_show: false,
				show: false,
				price: '',
				tempValue: '',
				isDecimal: false,
				decimalFactor: 0.1
			}
		},
		methods: {
			getDeliveryText() {
				if (this.radioInput) {
					return `运费 ¥${this.dataValue.way_price}`;
				} else if (this.dataValue.way_price === '0') {
					return '包邮';
				} else {
					return '自提';
				}
			},
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
				  
				  this.fileList1 = updateList;
				  updateList =await Promise.all(updateList.map( async (item) =>{
					try{
							const cloudPath = `uploads/${Date.now()}-${Math.random()}.jpg`;
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
				this.fileList1 =updateList
				
				let detail = that.dataValue
				console.log('picurls',that.picurls)
				// 调用云函数添加数据
				const res = await uniCloud.callFunction({
					name:'art_add_row',
					data:{
						detail,
						picurls:that.picurls,
						hType:'xz'
					}
				})
				
				if (res.result.code === 0) {
					// 跳转到详情页
					uni.navigateTo({
						url: `/pages/auction-detail/auction-detail?id=${res.result.data._id}`,
						success: function(res) {
							res.eventChannel.emit('sendData', {
								head: detail.head,
								detail: detail.detail,
								price: detail.price,
								picurls: that.picurls
							});
						}
					});
				} else {
					uni.showToast({
						title: '发布失败',
						icon: 'none'
					});
				}
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
.spare {
	padding: 30rpx;
	background-color: #F8F8F8;
	min-height: 100vh;
	
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
		padding: 0 10rpx;
		position: relative;
		height: 80rpx;
		
		.title {
			font-size: 36rpx;
			font-weight: 600;
			color: #333;
		}
	}
	
	.detail_box {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
		
		.input_box {
			margin-bottom: 30rpx;
		}
		
		.textarea_box {
			margin-bottom: 30rpx;
		}
		
		.upload_box {
			margin-top: 20rpx;
		}
	}
	
	.price_box {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 30rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
		
		.price_input, .delivery_box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 0;
			border-bottom: 1rpx solid #F5F5F5;
			
			&:last-child {
				border-bottom: none;
			}
			
			.label {
				font-size: 28rpx;
				color: #333;
			}
			
			.value {
				font-size: 28rpx;
				color: #666;
			}
		}
	}
	
	.pop_detail {
		padding: 30rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx 0 0;
		
		.pop_header {
			position: relative;
			padding: 20rpx 0;
			border-bottom: 1rpx solid #F5F5F5;
			margin-bottom: 30rpx;
			
			.pop_title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
				text-align: center;
			}
		}
		
		.pop_content {
			padding: 0 20rpx;
			
			.cell1, .cell2 {
				border-radius: 16rpx;
				padding: 30rpx;
				margin-bottom: 20rpx;
				
				.cell_title {
					font-size: 34rpx;
					color: #333;
					margin-bottom: 30rpx;
					font-weight: 600;
				}
				
				.radio_group {
					margin-bottom: 20rpx;
					
					.u-radio {
						font-size: 28rpx;
					}
				}
				
				.input_box {
					margin-top: 20rpx;
					background-color: #FFFFFF;
					padding: 0 20rpx;
					border-radius: 8rpx;
				}
			}
			
			.cell1 {
				background: linear-gradient(135deg, #E3F2FD, #BBDEFB);
			}
			
			.cell2 {
				background: linear-gradient(135deg, #F3E5F5, #E1BEE7);
			}
		}
	}
}
</style>
