<template>
	<view class='jobSeekerDetail'>
		<!-- 求职意向 -->
		<view class='header'>
			<view class="intention">
				<text class='position'>前端开发工程师</text>
				<view class="tags">
					<u-tag text="期望薪资: 15-20K" type="warning" size="mini" />
					<u-tag text="双休/弹性" type="success" size="mini" />
					<u-tag text="五险一金" type="error" size="mini" />
				</view>
			</view>
		</view>
<u-divider text="分割线"></u-divider>

		<!-- 基本信息 -->
		<view class='basicInfo'>
			<view class="sectionTitle">
				<u-icon name="account" color="#2979ff" size="20"></u-icon>
				<text>基本信息</text>
			</view>
			<view class="infoGrid">
				<view class="infoItem">
					<text class="label">身份:</text>
					<text class="value">应届毕业生</text>
				</view>
				<view class="infoItem">
					<text class="label">年龄:</text>
					<text class="value">23岁</text>
			<!-- 		  <u-datetime-picker
					                :show="show"
					                v-model="value1"
					                mode="date"
					        ></u-datetime-picker>
					<u-button @click="show = true">打开</u-button> -->

				</view>
				<view class="infoItem">
					<text class="label">学校:</text>
					<text class="value">厦门大学</text>
				</view>
				<view class="infoItem">
					<text class="label">专业:</text>
					<text class="value">计算机科学与技术</text>
				</view>
				<view class="infoItem">
					<text class="label">GPA:</text>
					<text class="value">3.8/4.0</text>
				</view>
			</view>
		</view>
		<u-divider></u-divider>

		<!-- 技能证书 -->
		<view class='skills'>
			<view class="sectionTitle">
				<u-icon name="star-fill" color="#ff9900" size="20"></u-icon>
				<text>技能证书</text>
			</view>
			<view class="skillList">
				<u-tag text="Vue3" type="primary" shape="circle" />
				<u-tag text="UniApp" type="primary" shape="circle" />
				<u-tag text="英语六级" type="success" shape="circle" />
				<u-tag text="软考中级" type="error" shape="circle" />
				<u-tag text="Webpack" type="primary" shape="circle" />
			</view>
			
			<view class="awards">
				<view class="awardItem">
					<u-icon name="trophy" size="18"></u-icon>
					<text>全国大学生计算机设计大赛一等奖</text>
				</view>
				<view class="awardItem">
					<u-icon name="trophy" size="18"></u-icon>
					<text>校级优秀毕业生</text>
				</view>
			</view>
		</view>
		<u-divider></u-divider>

		<!-- 工作经历 -->
		<view class='experience'>
			<view class="sectionTitle">
				<u-icon name="list-dot" color="#19be6b" size="20"></u-icon>
				<text>项目经历</text>
			</view>
			
			<view class="timeline">
			<!-- 	<u-time-line>
					<u-time-line-item> -->
						<!-- <template v-slot:content> -->
							<view class="timelineItem">
								<text class="time">2023.03-2023.08</text>
								<text class="company">字节跳动 - 前端开发实习生</text>
								<view class="desc">
									• 参与抖音电商后台管理系统开发
									• 实现可视化数据报表模块
									• 优化页面加载速度35%
								</view>
							</view>
						<!-- </template> -->
					<!-- </u-time-line-item> -->
					
					<!-- <u-time-line-item> -->
<!-- 						<template v-slot:content -->>
							<view class="timelineItem">
								<text class="time">2022.06-2022.12</text>
								<text class="company">腾讯 - 小程序开发实习生</text>
								<view class="desc">
									• 独立开发企业OA小程序
									• 实现扫码签到核心功能
									• 用户留存率提升20%
								</view>
							</view>
						<!-- </template> -->
					<!-- </u-time-line-item> -->
				<!-- </u-time-line> -->
			</view>
		</view>

		<!-- 联系按钮 -->
		<view class="fixedButton">
			<u-button type="primary" shape="circle" icon="phone" text="立即联系"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 show: false,
				value1: Number(new Date()),
				// 这里可以绑定数据
			};
		}
	}
</script>

<style lang="scss">
.jobSeekerDetail {
	padding: 20rpx 30rpx;
	
	.header {
		.intention {
			.position {
				font-size: 44rpx;
				font-weight: 700;
				color: #333;
			}
			.tags {
				margin-top: 20rpx;
				display: flex;
				gap: 20rpx;
			}
		}
	}
	
	.sectionTitle {
		display: flex;
		align-items: center;
		margin: 30rpx 0;
		font-size: 36rpx;
		font-weight: 600;
		color: #333;
		text {
			margin-left: 15rpx;
		}
	}
	
	.infoGrid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 30rpx;
		.infoItem {
			display: flex;
			.label {
				color: #666;
				margin-right: 15rpx;
			}
			.value {
				color: #333;
				font-weight: 500;
			}
		}
	}
	
	.skillList {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
		margin: 20rpx 0;
	}
	
	.awards {
		margin-top: 30rpx;
		.awardItem {
			display: flex;
			align-items: center;
			margin: 20rpx 0;
			color: #666;
			text {
				margin-left: 15rpx;
			}
		}
	}
	
	.timelineItem {
		.time {
			color: #999;
			font-size: 28rpx;
		}
		.company {
			display: block;
			margin: 10rpx 0;
			font-weight: 600;
			color: #333;
		}
		.desc {
			color: #666;
			line-height: 1.6;
		}
	}
	
	.fixedButton {
		position: fixed;
		bottom: 60rpx;
		left: 5%;
		right: 5%;
		width: 90%;
	}
}
</style>