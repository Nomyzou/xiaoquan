<template>
	<view class='employDetail'>
		<view class='header'>
			<text class='job'>兼职教师</text>
			<text class='pay'>150-300元/天</text>
		</view>
		<view class='equlity' >
			<view class='item'>
				<u-icon name='map-fill' label='思明'></u-icon>
				
			</view>
			
			<view class='item'>
				<u-icon name='man-add-fill' label='3-5年'></u-icon>

			</view>
			
			<view class='item'>
				<u-icon name='share-fill' label='本科'></u-icon>
			</view>
		

		</view>
		<u-divider></u-divider>
		<view class='employerDetail'>
			
			<view class='employer'>
				<view class='image'>
					<u-image src="https://cdn.uviewui.com/uview/album/1.jpg" 
					shape="circle" width='100rpx' height="100rpx"></u-image></view>
				
				<view class='text'>
					<text style="font-weight: 600;font-size: 40rpx;">邹先生</text>
					<text style="font-weight: 200;font-size: 30rpx;">铭信科技·CEO</text>
				</view>
				
				
			</view>
			<view class='icon' >
				<u-icon name='arrow-right'></u-icon>
			</view>
		
		</view>
		<u-divider></u-divider>
		
		<view class='jobDetail'>
			<view class='jobDetail'>
				<view class='header'>
					岗位职责
				</view>
				
				<view class='detail'>
					<p>	1、控制系统设计与优化
					负责无人机飞行控制系统的设计与优化，包括但不限于飞行稳定性、导航精度以及姿态控制。通过分析系统需求，设计合适的控制算法，确保无人机在各种环境条件下能够稳定、高效地运行。参与系统建模、仿真和验证工作，以提升飞行性能和安全性。</p>
					
					<p>
						2、数据分析与故障诊断收集和分析
						无人机飞行过程中产生的数据，识别系统性能瓶颈和潜在故障。利用控制理论和数据分析工具，进行故障诊断和修复，确保无人机在实际应用中的可靠性和稳定性。编写详细的报告和建议，帮助团队优化控制策略和系统设计。</p>
				
					<p>3、跨部门协作与技术支持与硬件工程师、软件开发人员以及其他相关团队紧密合作，确保控制系统与无人机其他系统的无缝集成。提供技术支持和培训，解答团队成员关于控制系统的技术问题。参与项目评审和技术讨论，提出改进建议，推动技术进步和产品创新。
				</p>
					</view>
			</view>
			
		</view>
		<u-divider></u-divider>
	<view class='companyDetail'>
		
		<view class='company'>
			<view class='image'>
				<u-image src="https://cdn.uviewui.com/uview/album/1.jpg" 
				shape="square" width='100rpx' height="100rpx"></u-image></view>
			
			<view class='text'>
				<text style="font-weight: 600;font-size: 40rpx;">厦门铭信科技计数有限公司</text>
				<text style="font-weight: 200;font-size: 30rpx;">未融资·50-100人·互联网</text>
			</view>
			
			
		</view>
		<view class='icon' >
			<u-icon name='arrow-right'></u-icon>
		</view>
	
	</view>
	<u-divider></u-divider>
		
		<view class='company'>
					<view class="page-section page-section-gap">
							<map style="width: 100vw; height: 50vh;" latitude="23.099994" longitude="113.324520" >
							</map>
						</view>
		</view>
		<view class='button'></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
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
}
</style>
