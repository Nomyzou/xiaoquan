<template>
  <view class="postJobForm">
    <u-form :model="form" >
      <!-- 职位基本信息 -->
      <view class="formSection">
        <u-form-item label="职位名称" prop="jobTitle">
          <u-input v-model="form.jobTitle" placeholder="例如：兼职教师" />
        </u-form-item>
        
        <u-form-item label="薪资范围" prop="salaryRange">
          <u-input v-model="form.salaryRange" placeholder="例如：150-300元/天">
            <!-- <template slot="suffix"> -->
              <text class="unit">元/天</text>
            <!-- </template> -->
          </u-input>
        </u-form-item>
      </view>

      <!-- 职位要求 -->
      <view class="formSection">
        <view class="sectionTitle">职位要求</view>
        <u-form-item label="工作地点" prop="location">
          <u-input v-model="form.location" placeholder="例如：思明区">
            <u-icon slot="prefix" name="map-fill" size="20"></u-icon>
          </u-input>
        </u-form-item>

        <u-form-item label="经验要求" prop="experience">
          <u-input v-model="form.experience" placeholder="例如：3-5年">
            <u-icon slot="prefix" name="man-add-fill" size="20"></u-icon>
          </u-input>
        </u-form-item>

        <u-form-item label="学历要求" prop="education">
          <u-input v-model="form.education" placeholder="例如：本科">
            <u-icon slot="prefix" name="share-fill" size="20"></u-icon>
          </u-input>
        </u-form-item>
      </view>

      <!-- 雇主信息 -->
      <view class="formSection">
        <view class="sectionTitle">雇主信息</view>
        <u-form-item label="公司LOGO" prop="logo">
          <u-upload 
            :fileList="fileList1" 
            :maxCount="1" 
            @afterRead="afterRead"
			
            @delete="deleteLogo"
          ></u-upload>
        </u-form-item>

        <u-form-item label="联系人" prop="contact">
          <u-input v-model="form.contact" placeholder="例如：邹先生" />
        </u-form-item>

        <u-form-item label="职位" prop="position">
          <u-input v-model="form.position" placeholder="例如：CEO" />
        </u-form-item>
      </view>

      <!-- 岗位职责 -->
      <view class="formSection">
        <u-form-item label="岗位职责" prop="responsibilities">
          <u-textarea 
            v-model="form.responsibilities" 
            placeholder="请输入岗位职责，每条用换行分隔"
            autoHeight
            count
          />
        </u-form-item>
      </view>

      <!-- 公司信息 -->
      <view class="formSection">
        <view class="sectionTitle">公司信息</view>
        <u-form-item label="公司名称" prop="companyName">
          <u-input v-model="form.companyName" placeholder="例如：厦门铭信科技有限公司" />
        </u-form-item>

        <u-form-item label="公司状态" prop="companyStatus">
          <u-radio-group v-model="form.companyStatus">
            <u-radio 
              v-for="item in companyStatusOptions"
              :key="item.value"
              :name="item.value"
              >{{item.label}}</u-radio>
          </u-radio-group>
        </u-form-item>

        <u-form-item label="公司规模" prop="companySize">
          <u-input v-model="form.companySize" placeholder="例如：50-100人" />
        </u-form-item>

        <u-form-item label="所属行业" prop="industry">
          <u-input v-model="form.industry" placeholder="例如：互联网" />
        </u-form-item>
      </view>

      <!-- 地图定位 -->
      <view class="formSection">
        <u-form-item label="办公地址" prop="address">
          <u-input 
            v-model="form.address" 
            placeholder="点击选择位置"
            disabled
            @click="chooseLocation"
          >
            <u-icon slot="prefix" name="map" size="20"></u-icon>
          </u-input>
          <map 
            v-if="form.locationData"
            style="width: 100%; height: 300rpx; margin-top: 20rpx;"
            :latitude="form.locationData.latitude"
            :longitude="form.locationData.longitude"
          ></map>
        </u-form-item>
      </view>

      <!-- 提交按钮 -->
      <view class="submitBtn">
        <u-button type="primary" @click="onSubmit">立即发布</u-button>
      </view>
    </u-form>
  </view>
</template>

<script>
export default {
  data() {
    return {
		fileList1:[],
		picUrls:[],
      form: {
        jobTitle: '',
        salaryRange: '',
        location: '',
        experience: '',
        education: '',
        logo: [],
        contact: '',
        position: '',
        responsibilities: '',
        companyName: '',
        companyStatus: 'unfinanced',
        companySize: '',
        industry: '',
        address: '',
        locationData: null,
		type:5
      },
      companyStatusOptions: [
        { label: '未融资', value: 'unfinanced' },
        { label: '已融资', value: 'financed' },
        { label: '上市公司', value: 'listed' }
      ],
      rules: {
        jobTitle: [{ required: true, message: '请填写职位名称' }],
        salaryRange: [{ required: true, message: '请填写薪资范围' }],
        location: [{ required: true, message: '请填写工作地点' }],
        companyName: [{ required: true, message: '请填写公司名称' }]
      }
    }
  },
  methods: {
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
    uploadLogo(file) {
      // 处理LOGO上传逻辑
      this.form.logo = [file]
    },
    deleteLogo() {
      this.form.logo = []
    },
    chooseLocation() {
      uni.chooseLocation({
        success: res => {
          this.form.address = res.address
          this.form.locationData = {
            latitude: res.latitude,
            longitude: res.longitude
          }
        }
      })
    },
	async onSubmit(e){
		const that =this
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
		
		let detail = that.dataValue
		uniCloud.callFunction({
			name:'art_add_row',
			data:{
				detail:that.form,
				picurls:that.picUrls,
				hType:'tz', //渲染到主页的盒子需要标识，然后进入不同的详细页面
				
			}
		   }).then(res=>{
			console.log('res',res)
			  uni.showToast({
			          title: '提交成功',
			          icon: 'success'
			        });
					
			setTimeout(()=> { uni.reLaunch({
				url:'/pages/post-home/post-home'
			})},1000)}) 
				
	},
    submit() {
      this.$refs.uForm.validate(valid => {
        if (valid) {
          uni.showToast({ title: '发布成功' })
          // 提交到后端逻辑
        }
      })
    }
  }
}
</script>

<style lang="scss">
.postJobForm {
  padding: 20rpx;
  
  .formSection {
    margin-bottom: 30rpx;
    padding: 20rpx;
    background: #fff;
    border-radius: 12rpx;
    box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.05);
    
    .sectionTitle {
      font-size: 34rpx;
      font-weight: 600;
      color: #333;
      padding-bottom: 20rpx;
      margin-bottom: 20rpx;
      border-bottom: 2rpx solid #eee;
    }
  }

  .submitBtn {
    margin: 40rpx 0;
  }

  .unit {
    color: #999;
    margin-right: 20rpx;
  }

  .u-upload {
    padding: 20rpx 0;
  }
}
</style>