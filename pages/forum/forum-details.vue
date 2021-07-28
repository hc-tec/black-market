<template>
	<div class="ncu-forum-details">
		
		<ncu-custom-header
			:isBack="true"
			title="说说详情"
			bgColor="white"
			style="width: 100%;">
		</ncu-custom-header>
		
		<ncu-scroll-wrapper
			:refresherEnabled="refresherEnabled"
			@change="val => refresherEnabled=val">
			
			<ncu-thread 
				:_style="{
					marginTop: '30px',
				}"
				needAppreciatePeopleDetail
				:thread="thread"
				@threadClick="appreciate"
				@appreciate="appreciate">
			</ncu-thread>
			
			
			<ncu-comment
				@scrolltolower="getComments(commentConfig.curPage)"
				:height="getCommentHeight">
				<template v-for="(pComment,pIndex) in comments">
					<ncu-comment-item
						:key="pComment.comment_id"
						:comment="pComment"
						:index="pIndex"
						@appreciate="commentAppreciate"
						@contentClick="contentClick">
					</ncu-comment-item>
					
					<template
						v-if="pComment.comment_children && 
							  pComment.comment_children.length">
						<ncu-comment-item
							v-for="(comment,index) in
									pComment.comment_children"
							:key="comment.comment_id"
							:comment="comment"
							:parentIndex="pIndex"
							:index="index"
							@appreciate="commentAppreciate"
							@contentClick="contentClick">
						</ncu-comment-item>  
					</template>
				</template>
				<ncu-loading-part :active="commentConfig.isLoading">
				</ncu-loading-part>
				<ncu-no-data
					v-if="commentConfig.noData">
				</ncu-no-data>
			</ncu-comment>
		
		</ncu-scroll-wrapper>
		
		<ncu-comment-foot
			:thread_appreciate="thread.thread_appreciate"
			:thread_isAppreciate="thread.thread_isAppreciate"
			:focus="commentFocus"
			:placeholder="commentPlaceholder"
			@send="messageSend"
			@appreciate="appreciate"
			@inputFocus="inputFocus"
			@inputBlur="inputBlur">
			
		</ncu-comment-foot>
		
		<ncu-message
			:open="messageConfig.open"
			:type="messageConfig.type"
			:message="messageConfig.message"
			@close="messageClose">
		</ncu-message>
		
	</div>
</template>

<script>
	import GlobalData from '../../common/global.js'
	import { httpGet, httpPost, httpPut } from '../../common/http.js'
	import { appreciateThread_api, appreciateThreadComment_api, threadCommit_api } from '../../common/api.js'
    export default {
        data() {
            return {
				GlobalData: GlobalData,
				refresherEnabled: true,
				commentFocus: false,
				commentPlaceholder: '',
				curCommentCtx: null,
				thread: GlobalData.threadDetails,
				comments: [],
				messageConfig: {
					open: false,
					type: 'success',
					message: ''
				},
				commentConfig: {
					isLoading: false,
					curPage: 1,
					noData: false,
				},
				threadAppreciateConfig: {
					isLoading: false,
				},
				threadCommentAppreciateConfig: {
					isLoading: false,
				},
			}
        },
		computed: {
			getCommentHeight() {
				return `${Math.max(150, 100*this.thread.comment_num)}px`
			}
		},
		methods: {
			messageOpen(message, type) {
				this.messageConfig = {
					type: type || 'success',
					message: message,
					open: true
				}
			},
			messageClose(overlay) {
				const isDoubleClick = !overlay.clickNum
				if(isDoubleClick) {
					this.messageConfig.open = false
					overlay.notExtend()
					overlay.readyClose()
				} else {
					overlay.extend()
				}
			},
			getCommentByIndex(parentIndex, index) {
				let currentComment
				const hasParent = parentIndex !== null && parentIndex+1
				const hasIndex = index !== null && index+1
				if(hasParent && hasIndex) {
					currentComment = this.comments[parentIndex].
									comment_children[index]
				} else {
					currentComment = this.comments[index]
				}
				return currentComment
			},
			async appreciate({ active, index }) {
				if(this.threadAppreciateConfig.isLoading) return
				this.threadAppreciateConfig.isLoading = true
				const thread = GlobalData.threadDetails
				
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
			async commentAppreciate({ active, parentIndex, index }) {
				if(this.threadCommentAppreciateConfig.isLoading) return
				this.threadCommentAppreciateConfig.isLoading = true
				const comment = this.getCommentByIndex(parentIndex, index)
				const [res, err] = await httpPut(
					appreciateThreadComment_api, {
						comment_id: comment.comment_id
					}, 2501
				)
				
				this.threadCommentAppreciateConfig.isLoading = false
				
				comment.comment_isAppreciate = res.data.is_appreciate
				comment.comment_appreciate = res.data.num
				
			},
			contentClick({ parentIndex, index }) {
				const currentComment = this.getCommentByIndex(parentIndex, index)
				this.commentFocus = true
				this.commentPlaceholder = `回复 ${currentComment.user_info.user_name} 的评论`
				this.curCommentCtx = {
					index,
					parentIndex,
					// comment: currentComment,
				}
				
			},
			inputFocus() {
				if(this.commentFocus) return
				this.commentPlaceholder = '输入评论'
			},
			inputBlur() {
				this.commentFocus = false
				this.commentPlaceholder = ''
			},
			flushCommentCtx() {
				this.curCommentCtx = {
					index: null,
					parentIndex: null,
				}
			},
			async getComments(page) {
				if(this.commentConfig.isLoading) return
				this.commentConfig.isLoading = true
				
				const [res, _] = await httpGet(threadCommit_api, {
					thread_id: this.thread.id,
					page: page || 1,
				})
				
				this.commentConfig.isLoading = false
				this.commentConfig.noData = res.data.detail
				if(this.commentConfig.noData) {
					return
				}
				this.commentConfig.curPage ++
				const results = res.data.results
				if(results && !results.length) {
					this.commentConfig.noData = true
					return
				}
				this.comments = [...this.comments, ...results]
			},
			async messageSend({message, clear}) {
				if(!message) {
					return
				}
				const {index, parentIndex} = this.curCommentCtx
				
				let replyUserId = null;
				let realParentId = null;
				const hasParent = parentIndex !== null && parentIndex+1
				const hasIndex = index !== null && index+1
				if(hasParent && hasIndex) {
					replyUserId = this.comments[parentIndex].comment_children[index].user_info.id
					realParentId = this.comments[parentIndex].comment_id
				} else if (hasIndex) {
					replyUserId = this.comments[index].user_info.id
					realParentId = this.comments[index].comment_id
				}
				const [res, err] = await httpPost(threadCommit_api, {
					thread_id: this.thread.id,
					comment_parent_id: realParentId,
					comment_reply_id: replyUserId,
					comment_content: message,
				}, 2500)
				if(err) {
					this.messageOpen(err, 'danger')
					return
				}
				const data = res.data
				if(hasParent && hasIndex) {
					this.comments[parentIndex].comment_children.push(data)
				} else if (hasIndex) {
					this.comments[index].comment_children.push(data)
				} else {
					this.comments.unshift(data)
				}
				this.flushCommentCtx()
				clear()
				
			}
		},
		created() {
			this.getComments()
			this.flushCommentCtx()
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-forum-details {
		width: 100%;
		height: 100vh;
	}
</style>


