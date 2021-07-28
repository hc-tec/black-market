<template>
	<div class="ncu-search">
		<ncu-custom-header
			title="搜索"
			style="width: 100%;"
			:isBack="true">
		</ncu-custom-header>
		
		<div class="ncu-search-content">
			<light-input
				class="ncu-search__input"
				placeholder="搜索商品"
				v-model="searchInput"
				confirm-type="search"
				@confirm="search">
				<div
					slot="suffix"
					class="valid-send-btn cuIcon-search bg-gradual-blue"
					@click="search">
				</div>
			</light-input>
		</div>
		
		<!-- <div class="ncu-search__history">
			<search-tab 
				icon="cuIcon-hot"
				title="热搜商品">
				<ncu-popup-option 
					_style="display: inline-flex;margin-right: 5px;"
					v-for="(tag,index) in hotGoodsTags"
					:key="tag.id"
					:index="index"
					@click="tagSelect">
					{{ tag.name }}
				</ncu-popup-option>
			</search-tab>
			
			<search-tab
				icon="cuIcon-time"
				title="搜索历史">
				<ncu-popup-option 
					_style="display: inline-flex;margin-right: 5px;"
					v-for="(tag,index) in searchHistoryTags"
					:key="tag.id"
					:index="index"
					@click="tagSelect">
					{{ tag.name }}
				</ncu-popup-option>
			</search-tab>
			
		</div>
		 -->
	</div>
</template>

<script>
	import searchTab from './search/search-tab.vue'
    export default {
		components: {
			searchTab
		},
        data() {
            return {
				searchInput: '',
				hotGoodsTags: [
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
				],
            
				searchHistoryTags: [
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
					{
						id: 1,
						name: '鼠标',
					},
				],
            
			}
        },
		methods: {
			search() {
				const isValid = this.searchInput
				if(!isValid) return
				this.toMall(this.searchInput)
			},
			tagSelect(index) {
				const tag = this.hotGoodsTags[index]
				this.toMall(tag.name)
			},
			toMall(tag) {
				uni.navigateTo({
					url: `/pages/mall/index?tag=${tag}`
				})
			}
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-search {
		&-content {
			background-color: var(--main-bg-color);
			padding: 20px;
			
		}
		&__input {
			
		}
		&__history {
			padding: 0 10%;
			padding-bottom: 20%;
			background-color: var(--main-bg-color);
		}
	}
	.valid-send-btn {
		width: 40px;
		position: absolute;
		top: 0;
		height: 100%;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 10px;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		z-index: 10;
	}
</style>


