<template>
	<ncu-ripple-wrapper>
		<div class="ncu-chat-list-item cu-list menu-avatar">
			<div 
				class="cu-item"
				:class="item.uonline ? '' : 'grayscale'"
				@click="$emit('click', item)">
				<div 
					class="cu-avatar round lg" 
					:style="'background-image:url('+
						item.avatar+');'">
				</div>
				<div class="content">
					<div>
						<p class="text-cut chat-user_name">
							{{ item.user_name }}
						</p>
						<div 
							class="cu-tag round bg-orange sm"
							v-if="!item.uonline">
							断开连接...
						</div>
					</div>
					<div class=" text-sm flex"> 
						<p class="text-cut"> 
							{{ item.message.newest_message }} 
						</p>
					</div>
				</div>
				<div class="action">
					<div class="text-grey text-xs">
						{{ timeFormat(item.message.newest_time) }}
					</div>
					<div 
						class="cu-tag round bg-red sm"
						v-if="item.message.unread_num">
						{{ item.message.unread_num }}
					</div>
				</div>
			</div>
		</div>
		
	</ncu-ripple-wrapper>
</template>

<script>
	import { timeFormat } from '../../common/func.js'
    export default {
		props: {
			item: {
				type: Object,
				default: () => ({
						id: 5,
						user_name: '官方',
						avatar: 'http://neumorphic.cn/static/9b345880-ef81-4b33-91e1-7de7da815db2.jpg',
						uonline: true,
						message: {
							newest_message: '这里是小程序官方，欢迎您使用我们的小程序，有新需求或者新问题可以在这里谈谈喔。',
							newest_time: '2021-7-28 11:57:00',
							unread_num: 1
						}
					})
			}
		},
        data() {
            return {
				timeFormat: timeFormat,
            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-chat-list-item {
		position: relative;
		opacity: .9;
		color: var(--main-light-color);
		
		&::before {
			content: "";
			width: 100%;
			height: 100%;
			background-image: var(--texture);
				// background-position: -69% 46%;
				// background-repeat: no-repeat;
			position: absolute;
			opacity: 1;
			background-size: cover;
			top: 0;
			left: 0;   
			z-index: 1;
		}
	}
	.cu-list.menu-avatar>.cu-item:after,
	.cu-list.menu>.cu-item:after {
		border: none;
	}
	.cu-avatar,
	.cu-list.menu-avatar>.cu-item {
		background-color: var(--main-bg-color);
	}
	.chat-user_name {
		color: var(--main-color);
	}
</style>


