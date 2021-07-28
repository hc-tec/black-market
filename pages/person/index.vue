<template>
	<div :style="{
		height: exitModalOpen ? '100vh' : 'auto',
		overflow: exitModalOpen ? 'hidden' : ''
	}">
		<ncu-custom-header
			:isBack="isBack"
			:title="`${isOtherUser ? 'TA' : '我'}的`"
			bgColor="transparent" 
			style="width: 100%;"
			@navBarClick="navBarClick">
		</ncu-custom-header>
		<ncu-scroll-wrapper
			height="96vh"
			_style="position: absolute;top: 0;width: 100%;"
			:soften="false"
			:refresherEnabled="refresherEnabled"
			@change="val => refresherEnabled=val">
			<ncu-profile-card 
				ref="profileCard"
				:isHost="isBack ? !isOtherUser : true"   
				:isBack="isBack"
				:profile="curUserInfo"
				@exitBtnClick="exitModalOpen=true"
				@handleAvatarClick="handleAvatarClick"
				@handleSettingClick="handleSettingClick"
				@handleLinkShopClick="toShop"
				@pemission-deny="messageOpen('暂不支持访问', 'info')">
			</ncu-profile-card>
		</ncu-scroll-wrapper>
		<ncu-confirm-modal
			title="信息框"
			message="确定退出登录？"
			:open="exitModalOpen"
			@layer-click="modalClose"
			@lock-open="val => exitModalOpen=val"
			@cancelBtnClick="modalClose"
			@confirmBtnClick="exit">
		</ncu-confirm-modal>
		
		<ncu-message
			:open="messageConfig.open"
			:type="messageConfig.type"
			:message="messageConfig.message"
			@close="messageClose">
		</ncu-message>
		
	</div>
</template>

<script>
	import ncuProfileCard from '../../components/ncu-profile-card/ncu-profile-card.vue'
	import GlobalData from '../../common/global.js'
	import { sleep } from '../../common/func.js'
	import { httpGet } from '../../common/http.js'
	import { getUserinfo_api } from '../../common/api.js'
    export default {
		name: 'ncu-profile-card',
		components: {
			ncuProfileCard
		},
        data() {
            return {
				exitModalOpen: false,
				refresherEnabled: false,
				isBack: false,
				isOtherUser: false,
				GlobalData: GlobalData,
				curUserInfo: {},
				messageConfig: {
					open: false,
					type: 'success',
					message: ''
				},
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
			navBarClick() {
				this.$refs.profileCard.previewImg()
			},
			modalClose() {
				this.exitModalOpen = false
			},
			exit() {
				this.modalClose()
			},
			close(overlay) {
				const isDoubleClick = !overlay.clickNum
				if(isDoubleClick) {
					overlay.notExtend()
					overlay.readyClose()
				} else {
					overlay.extend()
				}
			},
			messageInit() {
				this.messageOpen = true
			},
			handleSettingClick() {
				if(this.isBack) return
				uni.navigateTo({
					url: '/pages/person/settings'
				})
			},
			handleAvatarClick() {
				if(this.isBack) return
				uni.navigateTo({
					url: '/pages/person/person-info'
				})
			},
			toShop() {
				if(!this.isOtherUser) return
				// GlobalData.activeItem = 'shop'
				uni.navigateTo({
					url: `/pages/shop/index?id=${this.curUserInfo.id}`
				})
			},
			async getOtherUserInfo(id) {
				const [res, _] = await httpGet(getUserinfo_api, {
					user_id: id,
				})
				this.curUserInfo = res.data[0]
			},
			initGetUserInfo() {
				const id = +this.$mp?.page?.options?.id
				this.isBack = !!id
				const isOtherUser = id !== GlobalData.userInfo.id
				this.isOtherUser = id && isOtherUser
				if(!id || !isOtherUser) {
					this.curUserInfo = GlobalData.userInfo
				} else {
					this.getOtherUserInfo(id)
				}
			}
			
		},
		
		mounted() {
			const isLogin = GlobalData.checkLogin()
			if(!isLogin) {
				GlobalData.login.addWatcher(this.initGetUserInfo)
			} else {
				this.initGetUserInfo()
			}
		},
		beforeDestroy() {
			GlobalData.login.removeWatcher(this.initGetUserInfo)
		}
    }
</script>

<style lang="scss" scoped>
</style>


