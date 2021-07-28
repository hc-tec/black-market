<template>
	<div class="container">
		<swiper 
			class="swiper"
			:autoplay="false" 
			:current="getActiveIndex"
			@change="pageChange"
			>
			<swiper-item>
				<mall />
			</swiper-item>
			<swiper-item>
				<shop />
			</swiper-item>
			<swiper-item>
				<forum  />
			</swiper-item>
			<swiper-item>
				<person />
			</swiper-item>
		</swiper>
		<ncu-circle-nav
			ref="navMenu"
			:navList="navMenu"
			:initActiveIndex="initActiveIndex()"
			@navItemClick="navItemClick">
		</ncu-circle-nav>
	</div>
</template>

<script>
	import mall from '../mall/index'
	import shop from '../shop/index.vue'
	import forum from '../forum/index'
	import person from '../person/index'
	import GlobalData from '../../common/global.js'
	import { autoLogin_api } from '../../common/api.js'
	import { httpGet } from '../../common/http.js'
    export default {
		components: {
			mall,
			shop,
			forum,
			person,
		},
        data() {
            return {
				navMenu: [
					{
						href: 'mall',
						icon: 'home'
					},
					{
						href: 'shop',
						icon: 'shop'
					},
					{
						href: 'forum',
						icon: 'community'
					},
					{
						href: 'person',
						icon: 'people'
					},
				],
				GlobalData: GlobalData,
				isLoading: false,
			}
        },
		computed: {
			getActiveIndex() {
				let activeIndex = 0
				try {
					this.navMenu.forEach((item, i) => {
						if(item.href === GlobalData.activeItem) {
							activeIndex = i
							throw new Error("")
						}
					})
				} catch {}
				return activeIndex
			}
		},
		methods: {
			navItemClick(url) {
				GlobalData.activeItem = url
			},
			initActiveIndex() {
				// 根据当前的 activeItem 确定需要高亮的导航菜单
				const activeItem = GlobalData.activeItem
				for(let i=0;i<4;++i) {
					const item = this.navMenu[i]
					if(item.href === activeItem) {
						return i
					}
				}
				return 0
			},
			async autoLogin() {
				if(!GlobalData.userInfo.isLogin) {
					this.isLoading = true
					let res, err
					try {
						[res, err] = await httpGet(autoLogin_api)
					
						setTimeout(() => {
							this.isLoading = false
						}, 2000)
						
						if(res.data?.detail) {
							setTimeout(() => {
								uni.showToast({
									title: '登录状态过期',
									duration: 3000,
									icon: 'none'
								})
							}, 1000)
							
							uni.redirectTo({
								url: '/pages/login/index'
							})
							return
						}
						
						GlobalData.userInfo = res.data[0]
						GlobalData.userInfo['isLogin'] = true
						GlobalData.focusUserInfo = {}
						
						GlobalData.login.noticeWatcher()
					} catch(e) {
						uni.showToast({
							title: '网络错误',
							duration: 5000,
							icon: 'error'
						})
						this.isLoading = false
						return
					}
				}
				
			},
			pageChange(e) {
				const activeIndex = e.detail.current
				this.$refs.navMenu.activate(activeIndex)
			}
		},
		created() {
			this.autoLogin()
		}
    }
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
	}
	.swiper {
		height: 100%;
	}
</style>


