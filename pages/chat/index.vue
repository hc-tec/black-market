<template>
	<div 
		class="chat"
		:class="[`move-${activeIndex}`]">
		<ncu-tabbar 
			:active="activeIndex"
			@click="menuClick">
			<div class="ncu-search-content">
				<light-input
					class="ncu-search__input"
					placeholder="搜索"
					confirm-type="search"
					@confirm="search">
					<div
						slot="suffix"
						class="cuIcon-search"
						@click="search">
					</div>
				</light-input>
			</div>
		</ncu-tabbar>
		
		<swiper
			class="swiper"
			:autoplay="false" 
			:current="getActiveIndex"
			@change="pageChange"
			>
			<swiper-item>
				<chatList />
			</swiper-item>
			<swiper-item>
				<friends />
			</swiper-item>
			
			<!-- <swiper-item>
				<person />
			</swiper-item> -->
		</swiper>
		
	</div>
</template>

<script>
	import chatList from './chatList'
	import friends from './friends'
    export default {
		components: {
			chatList,
			friends
		},
        data() {
            return {
				activeIndex: 0,
            }
        },
		computed: {
			getActiveIndex() {
				return this.activeIndex
			}
		},
		methods: {
			pageChange(e) {
				this.activeIndex = e.detail.current
			},
			menuClick(index) {
				this.activeIndex = index
			},
			search() {
				
			}
		}
    }
</script>

<style lang="scss">
	.chat {
		
		position: relative;
		
		&::before {
			content: "";
			width: 100%;
			height: 100%;
			background-image: url(http://neumorphic.cn/static/a82c9435-038a-49fe-817b-71adb9556585.png);
			position: absolute;
			background-size: 162%;
			background-repeat: no-repeat;
			top: -1%;
			opacity: .5;
			transition: background-position .3s;
		}
		
		.swiper {
			width: 100%;
			height: calc(100vh - 120px);
		}
		.ncu-search {
			&-content {
				padding: 0 0 10px 0;
				margin: 0 10px;
			}
			&__input {
				[class~=light-input] {
					padding: 8px 40px !important;
					background-color: var(--main-bg-color) !important;
				}
			}
		}
		.cuIcon-search {
			position: absolute;
			left: 17px;
			top: 50%;
			font-size: 1.2em;
			transform: translateY(-50%);
			color: var(--main-light-color);
		}
		
		&.move-0 {
			&::before {
				background-position: -79%;
			}
		}
		&.move-1 {
			&::before {
				background-position: 156%;
			}
		}
	}
</style>


