<template>
	<view class='employDetail'>
		<view class='header'>
			<text class='job'>{{jobData.jobTitle || '兼职教师'}}</text>
			<text class='pay'>{{jobData.salaryRange || '150-300元/天'}}</text>
		</view>
		<view class='equlity'>
			<view class='item'>
				<u-icon name='map-fill' :label='jobData.location || "思明"'></u-icon>
			</view>
			
			<view class='item'>
				<u-icon name='man-add-fill' :label='jobData.experience || "3-5年"'></u-icon>
			</view>
			
			<view class='item'>
				<u-icon name='share-fill' :label='jobData.education || "本科"'></u-icon>
			</view>
		</view>
		<u-divider></u-divider>
		
		<!-- 招聘方信息 -->
		<view class='employerDetail'>
			<view class='employer'>
				<view class='image'>
					<u-image :src="jobData.picurls && jobData.picurls.length > 0 ? jobData.picurls[0] : 'https://cdn.uviewui.com/uview/album/1.jpg'" 
					shape="circle" width='100rpx' height="100rpx"></u-image>
				</view>
				
				<view class='text'>
					<text style="font-weight: 600;font-size: 40rpx;">{{jobData.contact || '邹先生'}}</text>
					<text style="font-weight: 200;font-size: 30rpx;">
						<!-- 根据招聘方类型显示不同的信息 -->
						<template v-if="jobData.employerType === 'personal'">
							{{jobData.position || '自由职业者'}}
						</template>
						<template v-else-if="jobData.employerType === 'studio'">
							{{jobData.studioName || '创意工作室'}}·{{jobData.position || '创始人'}}
						</template>
						<template v-else>
							{{jobData.companyName || '铭信科技'}}·{{jobData.position || 'CEO'}}
						</template>
					</text>
				</view>
			</view>
			<view class='icon'>
				<u-icon name='arrow-right'></u-icon>
			</view>
		</view>
		<u-divider></u-divider>
		
		<!-- 岗位职责 -->
		<view class='jobDetail'>
			<view class='jobDetail'>
				<view class='header'>
					岗位职责
				</view>
				
				<view class='detail'>
					<template v-if="jobData.responsibilities">
						<p v-for="(item, index) in formatResponsibilities" :key="index">{{item}}</p>
					</template>
					<template v-else>
						<p>1、控制系统设计与优化
						负责无人机飞行控制系统的设计与优化，包括但不限于飞行稳定性、导航精度以及姿态控制。通过分析系统需求，设计合适的控制算法，确保无人机在各种环境条件下能够稳定、高效地运行。参与系统建模、仿真和验证工作，以提升飞行性能和安全性。</p>
						
						<p>
							2、数据分析与故障诊断收集和分析
							无人机飞行过程中产生的数据，识别系统性能瓶颈和潜在故障。利用控制理论和数据分析工具，进行故障诊断和修复，确保无人机在实际应用中的可靠性和稳定性。编写详细的报告和建议，帮助团队优化控制策略和系统设计。</p>
					
						<p>3、跨部门协作与技术支持与硬件工程师、软件开发人员以及其他相关团队紧密合作，确保控制系统与无人机其他系统的无缝集成。提供技术支持和培训，解答团队成员关于控制系统的技术问题。参与项目评审和技术讨论，提出改进建议，推动技术进步和产品创新。
					</p>
					</template>
				</view>
			</view>
		</view>
		<u-divider></u-divider>
		
		<!-- 公司信息，只有在招聘方为公司时显示 -->
		<view class='companyDetail' v-if="jobData.employerType === 'company'">
			<view class='company'>
				<view class='image'>
					<u-image :src="jobData.picurls && jobData.picurls.length > 0 ? jobData.picurls[0] : 'https://cdn.uviewui.com/uview/album/1.jpg'" 
					shape="square" width='100rpx' height="100rpx"></u-image>
				</view>
				
				<view class='text'>
					<text style="font-weight: 600;font-size: 40rpx;">{{jobData.companyName || '厦门铭信科技有限公司'}}</text>
					<text style="font-weight: 200;font-size: 30rpx;">
						{{getCompanyStatus(jobData.companyStatus)}}·{{jobData.companySize || '50-100人'}}·{{jobData.industry || '互联网'}}
					</text>
				</view>
			</view>
			<view class='icon'>
				<u-icon name='arrow-right'></u-icon>
			</view>
		</view>
		
		<!-- 工作室信息，只有在招聘方为工作室时显示 -->
		<view class='companyDetail' v-if="jobData.employerType === 'studio'">
			<view class='company'>
				<view class='image'>
					<u-image :src="jobData.picurls && jobData.picurls.length > 0 ? jobData.picurls[0] : 'https://cdn.uviewui.com/uview/album/1.jpg'" 
					shape="square" width='100rpx' height="100rpx"></u-image>
				</view>
				
				<view class='text'>
					<text style="font-weight: 600;font-size: 40rpx;">{{jobData.studioName || '创意工作室'}}</text>
					<text style="font-weight: 200;font-size: 30rpx;">{{jobData.industry || '创意设计'}}</text>
				</view>
			</view>
			<view class='icon'>
				<u-icon name='arrow-right'></u-icon>
			</view>
		</view>
		
		<u-divider v-if="jobData.employerType === 'company' || jobData.employerType === 'studio'"></u-divider>
		
		<u-divider></u-divider>
        
        <view class='company'>
                    <view class="page-section page-section-gap">
                            <map style="width: 100vw; height: 50vh;" latitude="23.099994" longitude="113.324520" >
                            </map>
                        </view>
        </view>
        
        <!-- 添加问答区域 -->
        <view class='answer-section'>
			<view class='answer-header'>
				<view class='answer-title'>
					<text class="answer-count">问答 {{answers.length}}</text>
				</view>
				<view class='write-answer-btn'>
					<u-button 
						size='small' 
						type='primary' 
						@click="gotoWriteAnswer"
						:customStyle="buttonStyle"
					>
						<text class="button-text">我要提问</text>
					</u-button>
				</view>
			</view>
			<view class='answer-box'>
				<QAbox 
					v-for="item in answers" 
					:key="item._id" 
					:content="item.content"
					:userInfo="item.userInfo"
				></QAbox>
                
                <!-- 无回答时显示提示 -->
                <view class="no-answer" v-if="answers.length === 0">
                    <text>暂无问答，快来提问吧！</text>
                </view>
			</view>
		</view>
		
		<!-- 底部发送简历按钮 -->
		<view class="resume-button-container">
			<u-button 
				type="primary" 
				@click="sendResume"
				:customStyle="resumeButtonStyle"
			>
				<view class="resume-btn-content">
					<u-icon name="file-text" color="#ffffff" size="24"></u-icon>
					<text class="resume-btn-text">发送简历</text>
				</view>
			</u-button>
		</view>
		
		<!-- 简历选择弹窗 -->
		<u-popup v-model="showResumePopup" mode="bottom" border-radius="16">
			<view class="resume-popup">
				<view class="popup-header">
					<text class="popup-title">选择简历</text>
					<u-icon name="close" @click="showResumePopup = false"></u-icon>
				</view>
				
				<view class="resume-list">
					<view 
						class="resume-item"
						v-for="(item, index) in resumeList" 
						:key="index"
						@click="selectResume(item)"
					>
						<view class="resume-info">
							<text class="resume-name">{{item.name}}</text>
							<text class="resume-date">更新于: {{formatDate(item.updateTime)}}</text>
						</view>
						<u-icon name="arrow-right" color="#999"></u-icon>
					</view>
					
					<view class="no-resume" v-if="resumeList.length === 0">
						<text>您还没有创建简历</text>
						<u-button 
							type="primary" 
							size="mini" 
							@click="createNewResume"
							:customStyle="{marginTop: '20rpx'}"
						>创建简历</u-button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jobData: {},
				id: '',
                answers: [], // 问答列表
                buttonStyle: {
					width: '180rpx',
					height: '72rpx',
					borderRadius: '36rpx',
					fontSize: '28rpx',
					fontWeight: 'bold',
					background: 'linear-gradient(120deg, #00c6fb 0%, #005bea 100%)',
					boxShadow: '0 4rpx 15rpx rgba(0, 198, 251, 0.2)'
				},
				resumeButtonStyle: {
					width: '90%',
					height: '90rpx',
					borderRadius: '45rpx',
					fontSize: '32rpx',
					fontWeight: 'bold',
					background: 'linear-gradient(120deg, #4CAF50 0%, #2E7D32 100%)',
					boxShadow: '0 4rpx 15rpx rgba(76, 175, 80, 0.3)',
					position: 'relative',
					zIndex: 10
				},
				showResumePopup: false,
				resumeList: [
					{
						id: '1',
						name: '个人简历（默认）',
						updateTime: Date.now() - 7*24*60*60*1000 // 一周前
					},
					{
						id: '2',
						name: '校园招聘简历',
						updateTime: Date.now() - 2*24*60*60*1000 // 两天前
					}
				],
				selectedResume: null
			};
		},
		computed: {
			formatResponsibilities() {
				if (!this.jobData.responsibilities) return [];
				
				// 将职责文本按换行符分割成数组
				const lines = this.jobData.responsibilities.split('\n').filter(line => line.trim());
				
				// 为每行添加序号
				return lines.map((line, index) => `${index + 1}、${line}`);
			}
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id;
				this.getJobDetail();
                this.getJobAnswers(); // 获取问答列表
			}
		},
        // 添加下拉刷新功能
        onPullDownRefresh() {
            this.refreshData();
        },
        onShow() {
            // 监听回答更新事件，刷新数据
            uni.$on('answerUpdated', (res) => {
                this.getJobAnswers();
            });
        },
		methods: {
			getJobDetail() {
				// 从数据库获取职位详情
				uniCloud.callFunction({
					name: 'getJobDetail',
					data: {
						id: this.id
					}
				}).then(res => {
					console.log('职位详情:', res);
					if (res.result && res.result.data) {
						this.jobData = res.result.data;
					}
				}).catch(err => {
					console.error('获取职位详情失败:', err);
					uni.showToast({
						title: '获取职位详情失败',
						icon: 'none'
					});
				});
			},
            // 获取职位相关问答
            getJobAnswers() {
                uniCloud.callFunction({
                    name: 'getJobAnswers',
                    data: {
                        jobId: this.id
                    }
                }).then(res => {
                    console.log('问答列表:', res);
                    if (res.result && res.result.data) {
                        this.answers = res.result.data;
                    }
                }).catch(err => {
                    console.error('获取问答列表失败:', err);
                });
            },
            // 刷新数据
            refreshData() {
                Promise.all([
                    this.getJobDetail(),
                    this.getJobAnswers()
                ]).finally(() => {
                    uni.stopPullDownRefresh();
                });
            },
            // 跳转到写回答页面
            gotoWriteAnswer() {
                uni.navigateTo({
                    url: `/pages/write-answer/write-answer?jobId=${this.id}&jobTitle=${encodeURIComponent(this.jobData.jobTitle || '职位咨询')}`
                });
            },
			getCompanyStatus(status) {
				const statusMap = {
					'unfinanced': '未融资',
					'financed': '已融资',
					'listed': '上市公司'
				};
				return statusMap[status] || '未融资';
			},
			// 发送简历相关方法
			sendResume() {
				// 检查用户是否登录
				const token = uni.getStorageSync('token');
				if (!token) {
					uni.showModal({
						title: '提示',
						content: '请先登录后再发送简历',
						confirmText: '去登录',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/login/login'
								});
							}
						}
					});
					return;
				}
				
				// 显示简历选择弹窗
				this.showResumePopup = true;
			},
			// 选择简历
			selectResume(resume) {
				this.selectedResume = resume;
				this.showResumePopup = false;
				
				// 显示确认对话框
				uni.showModal({
					title: '确认发送',
					content: `是否将"${resume.name}"发送给招聘方？`,
					confirmText: '发送',
					cancelText: '取消',
					success: (res) => {
						if (res.confirm) {
							this.confirmSendResume();
						}
					}
				});
			},
			// 确认发送简历
			confirmSendResume() {
				if (!this.selectedResume) return;
				
				uni.showLoading({
					title: '发送中...'
				});
				
				// 调用云函数发送简历
				uniCloud.callFunction({
					name: 'sendJobResume',
					data: {
						jobId: this.id,
						resumeId: this.selectedResume.id,
						employerInfo: {
							name: this.jobData.contact,
							companyName: this.jobData.companyName || this.jobData.studioName,
							employerType: this.jobData.employerType
						}
					}
				}).then(res => {
					uni.hideLoading();
					
					if (res.result && res.result.code === 0) {
						uni.showToast({
							title: '简历发送成功',
							icon: 'success'
						});
					} else {
						uni.showToast({
							title: res.result?.msg || '发送失败',
							icon: 'none'
						});
					}
				}).catch(err => {
					uni.hideLoading();
					console.error('发送简历失败:', err);
					uni.showToast({
						title: '发送失败，请重试',
						icon: 'none'
					});
				});
			},
			// 创建新简历
			createNewResume() {
				uni.navigateTo({
					url: '/pages/resume-edit/resume-edit'
				});
			},
			// 格式化日期
			formatDate(timestamp) {
				const date = new Date(timestamp);
				return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
			}
		}
	}
</script>

<style lang="scss">
.employDetail{
	
	.header{
		padding: 0 20rpx 0rpx 20rpx;
		display: flex;
		flex: row;
		justify-content: space-between;
		align-items: flex-end;//字体底部对齐

		.job{
			font-weight: 800;
			font-size:50rpx
		}
		.pay{
			color:darkgreen;
			font-weight: 600;
		}
	}
	
	.equlity{
		display: flex;
		flex-direction: row;
		.item{
			padding: 10rpx 30rpx;
		}
		
	}
	.employerDetail{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.employer{
		display: flex;
		flex-direction: row;
		.image{
			padding: 0 20rpx 0 20rpx;
		}
		.text{
			display: flex;
			flex-direction: column;
		}
	}
	.icon{
		padding:40rpx 40rpx 0  40rpx;
	}
	
	}
	
	.companyDetail{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.company{
		display: flex;
		flex-direction: row;
		.image{
			padding: 0 20rpx 0 20rpx;
		}
		.text{
			display: flex;
			flex-direction: column;
		}
	}
	.icon{
		padding:40rpx 40rpx 0  40rpx;
	}
	
	}
	
	.jobDetail {
		padding: 0 20rpx;
		
		.header {
			font-weight: 600;
			font-size: 40rpx;
			margin-bottom: 20rpx;
		}
		
		.detail {
			p {
				margin-bottom: 20rpx;
				line-height: 1.6;
			}
		}
	}
    
    // 问答区域样式
    .answer-section {
		margin-top: 30rpx;
		
		.answer-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: linear-gradient(120deg, #00c6fb 0%, #005bea 100%);
			padding: 30rpx;
			border-radius: 24rpx 24rpx 0 0;
			box-shadow: 0 4rpx 20rpx rgba(0, 198, 251, 0.1);
			
			.answer-title {
				.answer-count {
					color: #fff;
					font-size: 32rpx;
					font-weight: bold;
					text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
				}
			}
			
			.write-answer-btn {
				.button-text {
					font-size: 28rpx;
					font-weight: bold;
					color: #fff;
				}
			}
		}
		
		.answer-box {
			background: #fff;
			border-radius: 0 0 24rpx 24rpx;
			padding: 30rpx;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
			min-height: 200rpx;
            
            .no-answer {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 200rpx;
                color: #999;
                font-size: 28rpx;
            }
		}
	}
	
	// 发送简历按钮样式
	.resume-button-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 20rpx 0;
		background-color: #fff;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: center;
		z-index: 9;
		
		.resume-btn-content {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			
			.resume-btn-text {
				margin-left: 10rpx;
				font-size: 32rpx;
				color: #fff;
				font-weight: bold;
			}
		}
	}
	
	// 简历选择弹窗样式
	.resume-popup {
		padding: 30rpx;
		
		.popup-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;
			
			.popup-title {
				font-size: 36rpx;
				font-weight: bold;
				color: #333;
			}
		}
		
		.resume-list {
			max-height: 600rpx;
			overflow-y: auto;
			
			.resume-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 20rpx;
				border-bottom: 2rpx solid #f2f2f2;
				
				&:active {
					background-color: #f8f8f8;
				}
				
				.resume-info {
					display: flex;
					flex-direction: column;
					
					.resume-name {
						font-size: 32rpx;
						color: #333;
						margin-bottom: 10rpx;
					}
					
					.resume-date {
						font-size: 24rpx;
						color: #999;
					}
				}
			}
			
			.no-resume {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 60rpx 0;
				color: #999;
				font-size: 28rpx;
			}
		}
	}
}
</style>
