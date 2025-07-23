<template>
	<view>
		<newsbox v-for="item in newsItems" :key="item.id"
			:class="item.class"
			:seqNum="item.seqNum" 
			:title="item.title"
			:content="item.content"
			:typeLabel="item.typeLabel"
		/>
	</view>
</template>

<script>
	import newsbox from '@/components/Newsbox/Newsbox.vue';
	export default {
		components:{
			newsbox
		},
		data() {
			return {
				
			}
		},
		computed: {
			newsItems() {
				const items = [];
				const effects = ['flame-border', 'neon-border', 'pulse-border', 'rainbow-border', 'glow-effect', 'float-3d'];
				const labels = ['tz', 'xw', 'jz'];

				for (let i = 0; i < 20; i++) {
					const n = i + 1;
					items.push({
						id: n,
						class: effects[i % effects.length],
						seqNum: n,
						title: `创意标题 ${n}`,
						content: `这里是第 ${n} 条创意内容的描述。`,
						typeLabel: labels[i % labels.length]
					});
				}
				return items;
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	@import '@/static/styles/newsbox-effects.css';
	
	page {
		background-color: #f8f8f8;
		padding: 20rpx;
	}
</style>
