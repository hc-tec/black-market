<script>
	import Vue from 'vue'
	export default {
		globalData: {
			activeItem: 'mall', // 当前激活的界面，用于主界面的导航切换
			systemInfo: null,
			getSystemInfo() {
				uni.getSystemInfo({
					success: (res) => {
						this.systemInfo = res
					},
				})
			},
			wechatLoginJsCode: '',
			threadDetails: {},
			userInfo: {
				isLogin: false,
				student_id: '8002119301',
				user_name: '慕尘嚣',
				avatar: 'https://i0.hdslb.com/bfs/face/6a2ab77a7ba13ab02bf4fe318025ae46c5ec6b59.jpg@140w_140h_1c.webp',
				school_zone: '青山湖校区',
				profile: '未尝不是狂欢()',
				qq: '2598772546',
				txn_statistics: {
					sold_goods: 20,
					purchase_goods: 20,
					current_goods: 10,
					success_transaction: 5,
					favor_goods: 20,
				},
				commuca_statistics: {
					focus_topics: 10,
					launch_topics: 20,
				}
			},
			checkLogin() {
				return this.userInfo.isLogin
			},
			login: {
				watchers: [],
				addWatcher(watch) {
					this.watchers.push(watch)
				},
				removeWatcher(watch) {
					const index = this.watchers.indexOf(watch)
					if(index === -1) return
					this.watchers.splice(index)
				},
				noticeWatcher() {
					this.watchers.forEach(watcher => {
						watcher()
					})
				}
			},
			tabTitle: {
				forumTitle: '论坛',
			},
			// 目前的焦点用户信息，查询某个用户信息时有效，默认为自己
			focusUserInfo: {
				// id: 1,
			},
		},
		onLaunch: function() {
			// 加载字体
			uni.loadFontFace({
				family: 'Raleway',
				global: true,
				source: 'url("https://fonts.gstatic.com/s/raleway/v18/1Ptug8zYS_SKggPNyC0ITw.woff2")',
				success() {
				  console.log('success')
				}
			})
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})

			Vue.prototype.ColorList = [{
					title: '嫣红',
					name: 'red',
					color: '#e54d42'
				},
				{
					title: '桔橙',
					name: 'orange',
					color: '#f37b1d'
				},
				{
					title: '明黄',
					name: 'yellow',
					color: '#fbbd08'
				},
				{
					title: '橄榄',
					name: 'olive',
					color: '#8dc63f'
				},
				{
					title: '森绿',
					name: 'green',
					color: '#39b54a'
				},
				{
					title: '天青',
					name: 'cyan',
					color: '#1cbbb4'
				},
				{
					title: '海蓝',
					name: 'blue',
					color: '#0081ff'
				},
				{
					title: '姹紫',
					name: 'purple',
					color: '#6739b6'
				},
				{
					title: '木槿',
					name: 'mauve',
					color: '#9c26b0'
				},
				{
					title: '桃粉',
					name: 'pink',
					color: '#e03997'
				},
				{
					title: '棕褐',
					name: 'brown',
					color: '#a5673f'
				},
				{
					title: '玄灰',
					name: 'grey',
					color: '#8799a3'
				},
				{
					title: '草灰',
					name: 'gray',
					color: '#aaaaaa'
				},
				{
					title: '墨黑',
					name: 'black',
					color: '#333333'
				},
				{
					title: '雅白',
					name: 'white',
					color: '#ffffff'
				},
			]

		}
	}
</script>

<style>
	
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "components/ripple.css";
	@import "components/animation.css";
	
	body {
		--main-bg-color: #fff;
		--main-color: #000;
		--main-light-color: rgb(154,154,154);
		--main-lighter-color: rgb(248,248,248);
		--main-shadow: 0 4px 3px 0px rgba(230, 227, 227, 0.17);
		
		/* 颜色 */
		--blue: #0081ff;
		--green: #39b54a;
		
		/* 全屏加载 */
		--loading-mask: 9999;
		--loading-content: 10000;
		
		/* 分割线 */
		--interval-line-color: rgba(173, 168, 168, 0.17);
		
		/* 导航部分 */
		--nav-btn-bg-color: #102770;
		--nav-btn-color: #ffeba7;
		--nav-item-btn-bg-color: #fff;
		--nav-item-btn-color: #102770;
		--nav-item-btn-active-bg-color: #102770;
		--nav-item-btn-active-color: #ffeba7;
		
		/* 个人信息以及设置 item */
		--setting-item-bar-color: rgb(205, 205, 205);
		
		/* 头部导航条 */
		--header-z-index: 2000;
		/* 遮罩 */
		--layer-z-index: 1999;
		--layer-bg-color: rgba(0, 0, 0, 0.4);
		/* 论坛标签 */
		--tag-color: #e3e3e34f;
		
		/* 纹理 */
		--texture: url(http://neumorphic.cn/static/50bf7e26-4f8b-4205-9f7c-60787297c668.svg);
		
		/* 帖子 */
		--thread-bg-image: url(http://neumorphic.cn/static/50bf7e26-4f8b-4205-9f7c-60787297c668.svg);
		
		/* 边缘柔化阴影 */
		--soften-shadow: 0px 0px 20px 19px #fff;
		
		background-color: var(--main-lighter-color);
		color: var(--main-color);
		/* background-image: url(static/bgimage.jpg); */
		/* background-size: 125%; */
		font-family: Raleway, Helvetica Neue, Helvetica, sans-serif !important;
		/* animation: flutter 200s infinite linear; */
	}
	
	@media (prefers-color-scheme: dark) {
	  body{
	    background: #000000;
		--main-bg-color: #000;

		--main-color: #fff;
		--main-light-color: rgb(100,100,100);
		--main-lighter-color: rgb(70,70,70);
		--main-shadow: 0 4px 3px 0px rgba(25, 28, 28, 0.17);
		
		/* 导航部分 */
		--nav-btn-bg-color: #ffeba7;
		--nav-btn-color: #102770;
		--nav-item-btn-bg-color: #fff;
		--nav-item-btn-color: #ffeba7;
		--nav-item-btn-active-bg-color: #ffeba7;
		--nav-item-btn-active-color: #102770;
		
		/* 边缘柔化阴影 */
		--soften-shadow: 0px 0px 20px 19px rgb(1,8,31);
	  }
	}
	
	button {
		outline: none;
		border: none;
	}
	
	@keyframes flutter {
		0% {
			background-position-y: 0;
		}
		100% {
			background-position-y: 2000%;
		}
	}	
	
	.scale-out {
		transform: scale(.95);
	}
	
	.text-ellipsis-1 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.text-ellipsis-2 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.text-ellipsis-3 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.hover-opacity {
		opacity: .5;
	}
</style>
