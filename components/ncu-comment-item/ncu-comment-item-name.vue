<template>
	<div class="ncu-comment-item__name">
		<div>
			<span 
				class="ncu-comment-item__comment-name">
				{{ commentName }}
			</span>
			
			<template v-if="isChild">
				<span class="ncu-comment-item__reply text-grey">
					回复
				</span> 
				<span class="ncu-comment-item__reply-name">
					{{ replyName }}
				</span>
			</template>
		</div>
		<span class="ncu-comment-item__school-zone text-grey">
			{{ schoolZone }}
		</span>
	</div>
</template>

<script>
	/**
	 * 评论框的名字部分
	 * @property {Boolean} isChild 是否为子节点
	 * @property {String} commentName 评论人昵称
	 * @property {String} replyName 回复者昵称
	 * @property {String} schoolZone 所属校区
	 */
    export default {
		props: {
			isChild: {
				type: Boolean
			},
			commentName: {
				type: String
			},
			replyName: {
				type: String
			},
			schoolZone: {
				type: String
			},
		},
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-comment-item {
		&__name {
			
		}
		&__comment-name {
			font-size: .8rem;
			font-weight: 600;
		}
		&__reply {
			margin: 0 5px;
		}
		&__reply-name {
			font-size: .8rem;
			font-weight: 600;
		}
		&__school-zone {
			font-size: .7rem;
			margin-top: 5px;
		}
	}
</style>


