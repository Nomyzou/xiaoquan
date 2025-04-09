<template>
  <view class="jobForm">
    <u-form :model="form" >
      <!-- 求职意向 -->
      <view class="formSection">
        <view class="sectionTitle">求职意向</view>
        <u-form-item label="期望岗位" prop="position">
          <u-input v-model="form.position" placeholder="请输入期望职位" />
        </u-form-item>
        
        <u-form-item label="薪资范围" prop="salaryRange">
          <u-input v-model="form.salaryRange" placeholder="例:15-20K" type="number">
            <template slot="suffix">
              <text class="unit">K/月</text>
            </template>
          </u-input>
        </u-form-item>

        <u-form-item label="工作性质" prop="workType">
          <u-checkbox-group v-model="form.workType">
            <u-checkbox name="full">全职</u-checkbox>
            <u-checkbox name="part">兼职</u-checkbox>
            <u-checkbox name="intern">实习</u-checkbox>
          </u-checkbox-group>
        </u-form-item>
      </view>

      <!-- 基本信息 -->
      <view class="formSection">
        <view class="sectionTitle">基本信息</view>
        <u-form-item label="姓名" prop="name">
          <u-input v-model="form.name" placeholder="请输入真实姓名" />
        </u-form-item>

        <u-form-item label="年龄" prop="age">
          <u-input v-model="form.age" type="number" />
        </u-form-item>

        <u-form-item label="毕业院校" prop="school">
          <u-input v-model="form.school" placeholder="请输入学校全称" />
        </u-form-item>

        <u-form-item label="专业" prop="major">
          <u-input v-model="form.major" placeholder="请输入所学专业" />
        </u-form-item>

        <u-form-item label="GPA" prop="gpa">
          <u-input v-model="form.gpa" type="digit" placeholder="例:3.8" />
        </u-form-item>
      </view>

      <!-- 技能证书 -->
      <view class="formSection">
        <view class="sectionTitle">技能证书</view>
        <u-form-item label="专业技能">
          <u-tag 
            v-for="(skill, index) in form.skills"
            :key="index"
            :text="skill"
            closable
            @close="removeSkill(index)"
          />
          <u-input 
            v-model="newSkill"
            placeholder="输入后按回车添加"
            @confirm="addSkill"
          />
        </u-form-item>

        <u-form-item label="获奖证书" prop="certificates">
          <u-upload 
            :fileList="form.certificates"
            @afterRead="afterRead"
            @delete="deleteCert"
          ></u-upload>
        </u-form-item>
      </view>

      <!-- 项目经历 -->
      <view class="formSection">
        <view class="sectionTitle">项目经历</view>
        <view v-for="(exp, index) in form.experiences" :key="index">
          <u-form-item :label="`经历${index + 1}`">
            <view class="expItem">
              <u-input 
                v-model="exp.time"
                placeholder="工作时间 例:2023.03-2023.08"
              />
              <u-input 
                v-model="exp.company"
                placeholder="公司名称及职位"
              />
              <u-textarea 
                v-model="exp.desc"
                placeholder="工作内容描述（每条用换行分隔）"
                autoHeight
              />
              <u-icon 
                name="close-circle" 
                color="#fa3534" 
                @click="removeExp(index)"
              />
            </view>
          </u-form-item>
        </view>
        <u-button 
          type="primary" 
          plain 
          icon="plus" 
          @click="addExperience"
        >添加经历</u-button>
      </view>

      <!-- 提交按钮 -->
      <view class="submitBtn">
        <u-button type="primary" @click="onSubmit">提交信息</u-button>
      </view>
    </u-form>
  </view>
</template>

<script>
export default {
  data() {
    return {
		picUrl:[],
      form: {
        position: '',
        salaryRange: '',
        workType: [],
        name: '',
        age: '',
        school: '',
        major: '',
        gpa: '',
        skills: [],
        certificates: [],
        experiences: [],
		type:5,
      },
      newSkill: '',
      rules: {
        position: [{ required: true, message: '请填写期望岗位' }],
        salaryRange: [{ required: true, message: '请填写期望薪资' }],
        name: [{ required: true, message: '请填写姓名' }],
        school: [{ required: true, message: '请填写毕业院校' }]
      }
    }
  },
  methods: {
	  async afterRead(e){
	  	let uplists =[].concat(e.file) //刚刚上传的文件
	  	let fileList = this.form.certificates  //所有要显示的文件
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
    addSkill() {
      if (this.newSkill) {
        this.form.skills.push(this.newSkill)
        this.newSkill = ''
      }
    },
    removeSkill(index) {
      this.form.skills.splice(index, 1)
    },
    addExperience() {
      this.form.experiences.push({
        time: '',
        company: '',
        desc: ''
      })
    },
    removeExp(index) {
      this.form.experiences.splice(index, 1)
    },
    uploadCert(file) {
      // 处理文件上传逻辑
      this.form.certificates.push(file)
    },
    deleteCert(index) {
      this.form.certificates.splice(index, 1)
    },
    submit() {
      this.$refs.uForm.validate(valid => {
        if (valid) {
			
          uni.showToast({ title: '提交成功' })
          // 这里可以添加提交到服务器的逻辑
        }
      })
    },
	async onSubmit(e){
		const that =this
		console.log(e)	
		let updateList =[...this.form.certificates]
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
		  this.form.certificates = updateList;
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
	
  }
}
</script>

<style lang="scss">
.jobForm {
  padding: 20rpx;
  
  .formSection {
    margin-bottom: 40rpx;
    padding: 20rpx;
    background: #fff;
    border-radius: 16rpx;
    box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.05);
    
    .sectionTitle {
      font-size: 36rpx;
      font-weight: 600;
      color: #333;
      padding: 20rpx 0;
      border-bottom: 2rpx solid #f5f5f5;
      margin-bottom: 30rpx;
    }
  }

  .expItem {
    position: relative;
    padding: 20rpx;
    border: 2rpx solid #f5f5f5;
    border-radius: 12rpx;
    
    .u-icon {
      position: absolute;
      right: -10rpx;
      top: -10rpx;
      z-index: 1;
    }
  }

  .submitBtn {
    margin: 60rpx 0;
  }

  .unit {
    color: #999;
    margin-right: 20rpx;
  }
}
</style>