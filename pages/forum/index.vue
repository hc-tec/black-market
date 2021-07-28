<template>
	<div class="ncu-forums">
		
		<ncu-custom-header
			:title="GlobalData.tabTitle.forumTitle"
			style="width: 100%;">
			<div
				class="nav-bar-left" 
				slot="left"
				@click="schoolZoneItem.open=true">
				<span class="cuIcon-locationfill"></span>
				{{ schoolZones[threadsSchoolZone-1].label }}
			</div>
		</ncu-custom-header>
		
		<ncu-scroll-wrapper
			:refresherEnabled="refresherEnabled"
			@change="val => refresherEnabled=val"
			@scrolltolower="getThreads(threadConfig.curPage)">
			
			<tag-group
				:items="tags"
				@tag-select="i => tagSelect(tags[i].topic_content)"
				@loading-finish="tagLoadingFinish">
			</tag-group>
			<ncu-popup-option
				v-if="threadTag"
				:_style="{
					background: 'var(--main-bg-color)',
					width: '100px',
					textAlign: 'center',
				}"
				@click="tagSelect('')">
				<span 
					class="cuIcon-order"
					style="margin-right: 5px;">
				</span>全部
			</ncu-popup-option>
			<ncu-threads>
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
				type="bounce-ball" 
				:active="threadConfig.isLoading">
			</ncu-loading-part>
			<ncu-no-data v-if="threadConfig.noData">
			</ncu-no-data>
		</ncu-scroll-wrapper>
		
		
		
		<ncu-float-btn
			@click="toForumUploader">
			<span class="cuIcon-add">
			</span>
		</ncu-float-btn>
		
		<ncu-popup-select
			v-model="schoolZoneItem.school_zone"
			title="选择校区"
			direction="top"
			:open="schoolZoneItem.open"
			:items="schoolZones"
			@confirm="schoolZoneModifyConfirm"
			@cancel="schoolZoneItem.open=false"
			@layer-click="schoolZoneItem.open=false">
		</ncu-popup-select>
		
	</div>
</template>

<script>
	import GlobalData from '../../common/global.js'
	import tagGroup from './tags.vue'
	import { httpGet, httpPut } from '../../common/http.js'
	import { thread_api, topicView_api, appreciateThread_api } from '../../common/api.js'
	import { schoolZones } from '../../common/config.js'
    export default {
		components: {
			tagGroup
		},
        data() {
            return {
				GlobalData: GlobalData,
				refresherEnabled: true,
				threads: [
					// {
					// 	author_info: {
					// 		id: 1,
					// 		user_name: '慕尘嚣',
					// 		school_zone: '青山湖校区',
					// 		avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
					// 	},
					// 	thread_topic: '需求',
					// 	thread_info: '这是一段说说。。。这是一段说说。。。这是一段说说。。。这是一段说说。。。这是一段说说。。。这是一段说说。。。这是一段说说。。。这是一段说说。。。这是一段说说。。。这是一段说说。。。这是一段说说。。。这是一段说说。。。',
					// 	thread_images: ['https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',],
					// 	thread_time: '2020-12-10 14:54:14',
					// 	thread_appreciate: 7,
					// 	thread_isAppreciate: true,
					// 	thread_appreciate_peoples: ['Titto', '南大学子', '超级代码人', '996工作者', '懂王继位人', '快乐风男', '编织者'],
					// },
				],
				tags: [],
				
				tagConfig: {
					isLoading: false,
					curPage: 1,
					noData: false,
				},
				threadConfig: {
					isLoading: false,
					curPage: 1,
					noData: false,
				},
				threadAppreciateConfig: {
					isLoading: false,
				},
				threadTag: '',
				schoolZoneItem: {
					school_zone: 0,
					open: false
				},
				schoolZones: schoolZones,
				threadsSchoolZone: 1,
			}
        },
		methods: {
			init() {
				this.threadConfig.isLoading = false
				this.threadConfig.curPage = 1
				this.threadConfig.noData = false
				this.threads = []
			},
			formatSchoolZones(originSchoolZone) {
				let target
				this.schoolZones.some(school_zone => {
					if(school_zone.label === originSchoolZone) {
						target = school_zone.value
						return true
					}
				})
				return target || 1
			},
			startFormatSchoolZones() {
				this.threadsSchoolZone = this.formatSchoolZones(GlobalData.userInfo.school_zone)
			},
			schoolZoneModifyConfirm() {
				const isChange = this.schoolZoneItem.school_zone !== this.threadsSchoolZone
				this.schoolZoneItem.open = false
				if(!this.schoolZoneItem.school_zone || !isChange) return
				this.threadsSchoolZone = this.schoolZoneItem.school_zone
				this.init()
				this.getThreads()
			},
			handleAvatarClick(id) {
				uni.navigateTo({
					url: `/pages/person/index?id=${id}`
				})
			},
			tagSelect(tag) {
				this.threadTag = tag
				GlobalData.tabTitle.forumTitle = tag ? `论坛 - ${this.threadTag}` : '论坛'
				this.threadConfig = {
					isLoading: false,
					curPage: 1,
					noData: false,
				},
				this.threads = []
				this.getThreads()
			},
			tagLoadingFinish() {
				this.getTags(this.tagConfig.curPage)
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
				this.GlobalData.threadDetails = this.threads[index]
				uni.navigateTo({
					url: '/pages/forum/forum-details'
				})
			},
			toForumUploader() {
				uni.navigateTo({
					url: '/pages/forum/upload'
				})
			},
			async getTags(page) {
				if(this.tagConfig.isLoading) return
				this.tagConfig.isLoading = true
				const [res, _] = await httpGet(topicView_api, {
					select: '2',
					page: page || 1,
				})
				this.tagConfig.isLoading = false
				this.tagConfig.noData = res.data.detail
				if(this.tagConfig.noData) {
					return
				}
				this.tagConfig.curPage ++
				this.tags = [...this.tags, ...res.data.results]
			},
			async _getThreads(page, otherParams) {
				otherParams = otherParams || {}
				if(this.threadConfig.isLoading) return
				this.threadConfig.isLoading = true
				const [res, _] = await httpGet(thread_api, {
					page: page || 1,
					...otherParams,
					school_zone: this.threadsSchoolZone
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
			async getThreads(page) {
				if(this.threadTag) {
					this._getThreads(page, {
						topic: this.threadTag,
					})
				} else {
					this._getThreads(page)
				}
			},
			startRequest() {
				this.startFormatSchoolZones()
				this.getTags()
				this.getThreads()
			}
		},
		created() {
			const isLogin = GlobalData.checkLogin()
			if(!isLogin) {
				GlobalData.login.addWatcher(this.startRequest)
			} else {
				this.startRequest()
			}
		},
		beforeDestroy() {
			GlobalData.login.removeWatcher(this.startRequest)
		},
    }
</script>

<style lang="scss" scoped>
	.ncu-forums {
		width: 100%;
		height: 100vh;
	}
</style>


