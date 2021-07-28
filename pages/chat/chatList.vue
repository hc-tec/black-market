<template>
	<!-- <ncu-scroll-wrapper
		:refresherEnabled="refresherEnabled"
		:soften="false"
		@change="val => refresherEnabled=val">
		<div class="cu-list menu-avatar">
			<ncu-chat-list-item
				v-for="item in chatList"
				:item="item">
				
			</ncu-chat-list-item>
		</div>
	</ncu-scroll-wrapper> -->
	
	<ncu-scroll-wrapper-v2
		height="calc(96vh - 120px)"
		@scrolltolower="scrolltolower"
		@scrolltoupper="scrolltoupper">
		<div class="cu-list menu-avatar">
			<ncu-chat-list-item
				v-for="item in chatList"
				:item="item">
				
			</ncu-chat-list-item>
		</div>
	</ncu-scroll-wrapper-v2>
	
</template>

<script>
	
    export default {
        data() {
            return {
				refresherEnabled: true,
				chatList: [
					{
						id: 5,
						user_name: '官方',
						avatar: 'http://neumorphic.cn/static/9b345880-ef81-4b33-91e1-7de7da815db2.jpg',
						uonline: true,
						message: {
							newest_message: '这里是小程序官方，欢迎您使用我们的小程序，有新需求或者新问题可以在这里谈谈喔。',
							newest_time: '2021-7-25 11:57:00',
							unread_num: 1
						}
					},
					{
						id: 2,
						user_name: '小红',
						avatar: 'http://neumorphic.cn/static/521ec57e-e137-44c4-8456-b15470c22b30.jpg',
						uonline: true,
						message: {
							newest_message: '在吗？你家的小孩子多大了？',
							newest_time: '2020-11-15 13:14:00',
							unread_num: 3
						}
					},
					{
						id: 4,
						user_name: '北港不夏',
						avatar: 'http://neumorphic.cn/static/17672e65-a97b-444f-a904-2dece795ed39.jpg',
						uonline: true,
						message: {
							newest_message: '力',
							newest_time: '2020-11-14 20:34:00',
							unread_num: 0
						}
					},
					{
						id: 3,
						user_name: '张小姐',
						avatar: 'http://neumorphic.cn/static/27d37745-8435-4e90-88d6-6bf62ecc85b0.jpg',
						uonline: false,
						message: {
							newest_message: 'xxx 牌子的，小孩子很喜欢喝呢！',
							newest_time: '2020-11-16 18:36:00',
							unread_num: 0
						}
					},

				]
            }
        },
		methods: {
			scrolltolower() {
				console.log('上拉')
			},
			scrolltoupper() {
				console.log('下拉')
			},
		}
    }
</script>

<style lang="scss" scoped>
	.cu-list {
		vertical-align: top;
	}
</style>


