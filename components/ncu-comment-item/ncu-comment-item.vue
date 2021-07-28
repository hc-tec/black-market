<template>
	<ncu-ripple-wrapper
		customStyle="padding: 10px 0;border-radius: 5px;"
		@click="handleContentClick">
		<div 
			class="ncu-comment-item"
			:class="comment.comment_parent_id ? 'is-child' : 'is-parent'">
			<ncu-avatar 
				class="ncu-comment-item__avatar"
				size="superMini"
				:src="comment.user_info.avatar"
				:isAuthor="isAuthor">
			</ncu-avatar>
			
			<ncu-appreciate
				class="ncu-appreciate"
				:num="comment.comment_appreciate"
				:active="comment.comment_isAppreciate"
				@click="appreciate">
				
			</ncu-appreciate>
			
			<ncu-comment-item-name
				:isChild="comment.comment_parent_id"
				:commentName="comment.user_info.user_name"
				:replyName="comment.comment_reply_name"
				:schoolZone="comment.user_info.school_zone">
			</ncu-comment-item-name>
			
			<div class="ncu-comment-item__content">
				{{ comment.comment_content }}
			</div>
			
			<div class="ncu-comment-item__time text-grey">
				{{ comment.comment_time }}
			</div>
			
		</div>
		
	</ncu-ripple-wrapper>
</template>

<script>
	import { debounce } from '../../common/func.js'
	import GlobalData from '../../common/global.js'
	import ncuCommentItemName from './ncu-comment-item-name.vue'
    export default {
		name: 'ncu-comment-item',
		components: {
			ncuCommentItemName,
		},
		props: {
			comment: {
				type: Object,
				default: () => ({
					user_info: {
						id: 4,
						user_name: '慕尘嚣',
						school_zone: '青山湖校区',
						avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
					},
					comment_id: 1,
					comment_parent_id: null,
					comment_reply_name: '',
					comment_content: '谁说这是条评论？',
					comment_time: '2020-12-11 23:15:26',
					comment_appreciate: 5,
					comment_isAppreciate: true,
					comment_children: []
				})
			},
			parentIndex: {
				type: Number,
				default: () => -1
			},
			index: {
				type: Number
			}
		},
        data() {
            return {
				appreciate: debounce(this._appreciate, 500),
            }
        },
		computed: {
			isAuthor() {
				return GlobalData.threadDetails.author_info.id === this.comment.user_info.id
			}
		},
		methods: {
			_appreciate(active) {
				this.$emit('appreciate', {
					active,
					parentIndex: this.parentIndex,
					index: this.index,
				})
			},
			handleContentClick() {
				this.$emit('contentClick', {
					parentIndex: this.parentIndex,
					index: this.index,
				})
			}
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-comment-item {
		position: relative;
		
		&__avatar {
			top: 0;
			left: -45px;
			position: absolute;
		}
		
		&__content {
			margin: 7px 0 10px 0;
			font-size: .8rem;
		}
		
		&__time {
			
		}
	}
	.ncu-appreciate {
		position: absolute;
		top: -40%;
		right: 0;
	}
	.is-parent {
		margin-left: 50px;
		padding: 7px 0;
	}
	.is-child {
		margin-left: 60px;
		transform: scale(.93);
		padding: 5px 0;
	}
</style>


