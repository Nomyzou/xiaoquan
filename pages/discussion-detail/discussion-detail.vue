<template>
	<view class='tieba'>
		<view class='main'>
			<view class='title'>{{detailData.head}}</view>
			<view class='detail'>
				<text>{{detailData.detail}}</text>
				<view class='button'>
					<u-button size='small' type='primary' plain @click="gotoWriteAnswer">写回答</u-button>
				</view>
			</view>
		</view>
		<view class='answer_title'>
			<text>回答 {{detailData.answer.length}}</text></view>
		<view class='anwserBox'>
			<QAbox v-for="item in detailData.answer" :key="item._id" :content="item.content"></QAbox>
		</view>
	</view>
</template>

<script>

	export default {
	
		data() {
			return {
				detailData: {
					head: '',
					detail: '',
					answer: []
				},
				discussionId: '' // 存储讨论的 _id
			};
		},
		onLoad() {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('sendData', (data) => {
				this.detailData = data;
				this.discussionId = data.id; // 接收传递的 _id
				console.log('接收到的数据：', data);
			});
		},
		methods: {
			gotoWriteAnswer() {
				uni.navigateTo({
					url: `/pages/write-answer/write-answer?discussionId=${this.discussionId}`
				});
			}
		}
	}
</script>

<style lang="scss">
.tieba{
	background-color: #F8F8F8;
	
	.main{
		background-color: white;
		padding-left: 2%;
		padding-bottom: 50rpx;
		.title{
			font-weight: 600;
			font-size: 40rpx;
		}
		.detail{
			.button{
				margin-left: 70%;
				width:20%
			}
		}
	}
	.answer_title{
		padding-left: 2%;
		font-weight: 500;
		background-color: #F8F8F8;
		height: 100rpx;
		display: flex;
		align-items: center;
		
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2); /* 灰色阴影 */


	}
	.anwserBox{
		.box{
		
		margin-top: 40rpx;
		}
	}
}
</style>
