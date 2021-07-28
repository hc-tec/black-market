<template>
	<scroll-view 
		scroll-left="0"
		class="ncu-forum-tags"
		scroll-x="true"
		:scroll-with-animation="true"
		@scrolltolower="scrollToLower">
		<ncu-ripple-wrapper
			v-for="(item,index) in items"
			:key="item.topic_content"
			style="margin-right: 5px;display: inline-flex;width: 44px;white-space: normal;"
			:style="item.topic_content.length > 6 ? 'width: 80px;' : 'width: 44px;'">
			<ncu-popup-option 
				:index="index"
				:style="{
					width: item.topic_content.length > 6 ? '80px' : '44px'
				}"
				style="width: 44px;display: inline-flex;overflow: hidden;"
				:_style="{
					borderTopLeftRadius: 0,
					borderTopRightRadius: 0,
					marginRight: 0,
					marginBottom: 0,
					background: 'var(--main-bg-color)',
				}"
				@click="handleTagClick">
				#{{ item.topic_content }}
			</ncu-popup-option>
		</ncu-ripple-wrapper>
		<ncu-popup-option
			v-if="isWaiting"
			style="width: 44px;display: inline-flex;overflow: hidden;"
			:_style="{
				height: '70px',
				display: 'inline-flex',
				borderTopLeftRadius: 0,
				borderTopRightRadius: 0,
				marginRight: 0,
				marginBottom: 0,
				background: 'var(--main-bg-color)',
			}">
			<i class="cuIcon-loading">
			</i>
		</ncu-popup-option>
	</scroll-view>
</template>

<script>
    export default {
		props: {
			items: {
				type: Array,
			},
		},
        data() {
            return {
				isWaiting: false,
            }
        },
		methods: {
			scrollToLower(e) {
				if(this.isWaiting) {
					return
				}
				this.isWaiting = true
				setTimeout(() => {
					this.$emit('loading-finish')
					this.isWaiting = false
				}, 1000)
			},
			handleTagClick(index) {
				this.$emit('tag-select', index)
			},
			
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-forum-tags {
		display: flex;
		flex-wrap: nowrap;
		white-space: nowrap;
		overflow: hidden;
		
		[class^=cuIcon] {
			display: inline-table;
			animation: rotate 1s infinite;
		}
		
	}
	@keyframes rotate {
		from {
			transform: rotate(0);
		} to {
			transform: rotate(360deg);
		}
	}
</style>


