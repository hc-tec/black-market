<template>
	<div class="forum-details">
		<ncu-custom-header
			:isBack="true"
			title="论坛">
		</ncu-custom-header>
		
		<ncu-nav
			:items="navItems"
			:tabActive="navActive"
			@tabSelect="navChange">
		</ncu-nav>
		
		<ncu-scroll-wrapper
			:refresherEnabled="refresherEnabled"
			@change="val => refresherEnabled=val"
			@scrolltolower="getThreads(threadConfig.curPage)">
			<ncu-threads _style="margin-top: 65px;">
				<ncu-thread 
					v-for="(thread,index) in threads"
					:key="index"
					:index="index"
					:thread="thread"
					@appreciate="appreciate"
					@contentClick="contentClick"
					@avatarClick="handleAvatarClick">
				</ncu-thread>
			</ncu-threads>
			<ncu-loading-part 
				type="rect"
				:active="threadConfig.isLoading">
			</ncu-loading-part>
			<ncu-no-data v-if="threadConfig.noData">
			</ncu-no-data>
		</ncu-scroll-wrapper>
		
		
	</div>
</template>

<script>
	import GlobalData from '../../../common/global.js'
	import { atomicThreadView_api, appreciateThread_api } from '../../../common/api.js'
	import { httpGet, httpPut } from '../../../common/http.js'
    export default {
        data() {
            return {
				navActive: 0,
				navItems: ['帖子数量', '点赞数量'],
				filters: ['launch_num', 'favor_num'],
				refresherEnabled: true,
				threads: [],
				threadConfig: {
					isLoading: false,
					curPage: 1,
					noData: false,
				},
				threadAppreciateConfig: {
					isLoading: false,
				},
			}
        },
		methods: {
			navChange(index) {
				//TODO: 根据导航索引 改变数据
				this.navActive = index
				this.threads = []
				this.curPage = 1
				this.noData = false
				this.getThreads(1)
			},
			async appreciate({ active, index }) {
				if(this.threadAppreciateConfig.isLoading) return
				this.threadAppreciateConfig.isLoading = true
				const thread = this.threads[index]
				
				const [res, err] = await httpPut(
					appreciateThread_api, {
						thread_id: thread.id
					}, 2016
				)
				this.threadAppreciateConfig.isLoading = false
				if(err) return;
				thread.thread_isAppreciate = res.data.is_appreciate
				thread.thread_appreciate = res.data.num
				const thread_appreciate_peoples = thread.thread_appreciate_peoples
				const user_name = GlobalData.userInfo.user_name
				if(res.data.is_appreciate) {
					thread_appreciate_peoples.unshift(user_name)
				} else {
					const userIndex = thread_appreciate_peoples
									.indexOf(user_name)
					if(userIndex !== -1) {
						thread_appreciate_peoples.splice(userIndex, 1)
					}
				}
				thread_appreciate_peoples.length = res.data.num
			},
			contentClick(index) {
				GlobalData.threadDetails = this.threads[index]
				uni.navigateTo({
					url: '/pages/forum/forum-details'
				})
			},
			async _getThreads(page, params) {
				if(this.threadConfig.isLoading) return
				this.threadConfig.isLoading = true
				
				const [res, err] = await httpGet(atomicThreadView_api, {
					page: page || 1,
					...params,
				})
				this.threadConfig.isLoading = false
				this.threadConfig.noData = res.data.detail
				if(this.threadConfig.noData) {
					return
				}
				this.threadConfig.curPage ++
				const results = res.data.results
				if(results && !results.length) {
					this.threadConfig.noData = true
					return
				}
				this.threads = [...this.threads, ...results]
			},
			getThreads(page) {
				this._getThreads(page, {
					filter:  this.filters[this.navActive]
				})
			},
			handleAvatarClick() {
				uni.navigateBack()
			},
		},
		mounted() {
			const query = this.$root.$mp.query
			const active = +query.active
			this.navActive = active ? active : 0
			this.getThreads(1)
		}
    }
</script>

<style lang="scss">
	
</style>


