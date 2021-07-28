<template>
	<div 
		class="circle-nav"
		:class="{
			'active': open
		}">
		<button 
			class="cn-button circle-nav-btn" 
			:class="{
				'active': open,
			}"
			@tap.stop="click">
			<span 
				:class="'cuIcon-'+(open ? 'unfold' : 'apps')">
			</span>
			<div 
				class="ripple"
				:class="{
					'ripple-active': rippleActive
				}">
			</div>
		</button>
		<div class="cn-wrapper" :class="{
			'opened-nav': open
		}">
			<ul class="cn-menu">
				<li 
					v-for="(item,index) in navList"
					class="cn-menu-list"
					:class="{
						'active': activeIndex === index
					}"
					@tap="activate(index)">
					<div 
						class="cn-menu-list__link"
						:class="{
							'active': activeIndex === index
						}"
						@click="$emit('navItemClick', item.href)">
						<label
							class="cn-menu-list__label">
							<span :class="'cuIcon-'+item.icon">
							</span>
						</label>
					</div>
				</li>
			 </ul>
		</div>
		<div 
			class="cn-overlay" 
			:class="{
				'cn-overlay--on-overlay': open
			}"
			@click="open=false">
		</div>
	</div>
</template>

<script>
    export default {
		name: 'ncu-circle-nav',
		props: {
			initActiveIndex: {
				type: Number,
				default: 0,
			},
			navList: {
				type: Array,
				default: () => [
					{
						href: '',
						icon: 'goodsnew'
					},
					{
						href: '',
						icon: 'home'
					},
					{
						href: '',
						icon: 'cart'
					},
					{
						href: '',
						icon: 'people'
					},
				],
			}
		},
        data() {
            return {
				open: false,
				activeIndex: 0,
				rippleActive: false
			}
        },
		methods: {
			click() {
				this.open = !this.open
				this.rippleActive = false
				this.$nextTick(() => {
					setTimeout(() => {
						this.rippleActive = true
					}, 500)
				})
				
			},
			activate(index) {
				this.activeIndex = index
				this.open = false
			}
		},
		created() {
			this.navNum = this.navList.length
			this.activeIndex = this.initActiveIndex
		}
    }
</script>

<style lang="scss" scoped>
	.circle-nav {
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translate(-50%);
		height: 15em;
		background: rgba(0,0,0,0.05);
		transition: all .3s;
	}
	
	.circle-nav.active {
		bottom: 130rpx;
	}
	
	.cn-button {
		position: absolute;
		top: 100%;
		left: 50%;
		z-index: 11;
		margin-top: -2.25em;
		margin-left: -2.25em;
		padding-top: 0em;
		width: 4.5em;
		height: 4.5em;
		border: none;
		border-radius: 50%;
		background-color: var(--nav-btn-bg-color);
		color: var(--nav-btn-color);
		text-align: center;
		font-weight: 700;
		font-size: 1.5em;
		text-transform: uppercase;
		cursor: pointer;
		transition: padding .3s ease-in-out;
	}
	
	.cn-button.active {
		padding-top: 1em;
	}
	
	.cn-wrapper {
		position: absolute;
		top: 35%;
		left: 50%;
		z-index: 10;
		margin-top: -13em;
		margin-left: -13.5em;
		width: 27em;
		height: 27em;
		border-radius: 50%;
		background: transparent;
		opacity: 0;
		transition: all .3s ease 0.3s;
		transform: scale(0.1);
		pointer-events: none;
	}
	.cn-overlay {
		width:100vh;
		height:150vh; 
		background-color: rgba(0,0,0,0.36); 
		position:fixed; 
		bottom:-50vh; 
		right:-50vh; 
		opacity:0; 
		transition: all .3s ease; 
		z-index:2; 
		pointer-events:none;
	}
	.cn-overlay--on-overlay { 
		pointer-events:auto; 
		opacity:1; 
	}
	.opened-nav {
		border-radius: 50%;
		opacity: 1;
		transition: all .3s ease;
		transform: scale(1);
		pointer-events: auto;
	}
	
	.cn-wrapper .cn-menu-list {
		position: absolute;
		top: 50%;
		left: 50%;
		overflow: hidden;
		margin-top: -1.3em;
		margin-left: -10em;
		width: 10em;
		height: 10em;
		font-size: 1.5em;
		transition: all .3s ease;
		transform: rotate(76deg) skew(60deg);
		transform-origin: 100% 100%;
		pointer-events: none;
		
	}
	
	.cn-wrapper .cn-menu-list .cn-menu-list__link {
		position: absolute;
		right: -7.25em;
		bottom: -7.25em;
		display: block;
		width: 14.5em;
		height: 14.5em;
		border-radius: 50%;
		background: radial-gradient(transparent 35%, var(--nav-item-btn-bg-color) 35%);
		color: var(--nav-item-btn-color);
		text-align: center;
		text-decoration: none;
		font-size: 1.2em;
		line-height: 2;
		transform: skew(-60deg) rotate(-75deg) scale(1);
		backface-visibility: hidden;
		pointer-events: auto;
		padding-top: .5em;
		opacity: .7;
		transition: all .1s;
	}
		
	.cn-menu-list .cn-menu-list__link.active {
		opacity: 1;
		color: var(--nav-item-btn-active-color);
		background: radial-gradient(transparent 35%, var(--nav-item-btn-active-bg-color) 35%);
	}
	
	.cn-menu-list.active {
		z-index: 12;
	}
	
	.cn-wrapper .cn-menu-list .cn-menu-list__link .cn-menu-list__label {
		display: block;
		font-size: 1.3em;
		font-weight: 700;
		text-transform: uppercase;
	}
	
	.cn-wrapper .cn-menu-list .cn-menu-list__link:hover,
	.cn-wrapper .cn-menu-list .cn-menu-list__link:active,
	.cn-wrapper .cn-menu-list .cn-menu-list__link:focus {
		color: var(--nav-item-btn-active-color);
		background: radial-gradient(transparent 35%, var(--nav-item-btn-active-bg-color) 35%);
	}
	
	// .cn-wrapper .cn-menu-list .cn-menu-list__link:focus {
	//     position: fixed;
	// }
	
	.opened-nav .cn-menu-list {
		transition: all .3s ease-in-out;
	}
	
	.opened-nav .cn-menu-list:first-child {
		transform: rotate(22deg) skew(60deg);
	}
	
	.opened-nav .cn-menu-list:nth-child(2) {
		transform: rotate(58deg) skew(60deg);
	}
	
	.opened-nav .cn-menu-list:nth-child(3) {
		transform: rotate(94deg) skew(60deg);
	}
	
	.opened-nav .cn-menu-list:nth-child(4) {
		transform: rotate(130deg) skew(60deg);
	}
	
	// .opened-nav .cn-menu-list:nth-child(5) {
	// 	transform: rotate(108deg) skew(60deg);
	// }
	
	// .opened-nav .cn-menu-list:nth-child(6) {
	// 	transform: rotate(140deg) skew(60deg);
	// }
	
	// .opened-nav .cn-menu-list:nth-child(7) {
	// 	transform: rotate(172deg) skew(60deg);
	// }
	
	@media only screen and (max-width: 480px) {
		.cn-wrapper {
			font-size: .8em;
		}
	
		.cn-button {
			font-size: 1em;
		}
	}
	
</style>


