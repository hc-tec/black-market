<template>
	<div @click="navBarClick">
		
		<div 
			class="cu-custom" 
			:style="[{height:CustomBar + 'px'}]">
			<div 
				class="cu-bar fixed" 
				:style="style" 
				>
				<div 
					v-if="isBack"
					class="action back" 
					@click.stop="BackPage">
					<ncu-back-arrow></ncu-back-arrow>
					<slot name="backText"></slot>
				</div>
				<div 
					class="content" 
					:style="[{top:StatusBar + 'px'}]">
					<block>{{ title }}</block>
					<div 
						class="bar-left">
						<slot name="left"></slot>
					</div>
				</div>
				<slot name="right"></slot>
			</div>
		</div>
	</div>
</template>

<script>
	/**
	 * custom header 自定义页首
	 * @description custom header 自定义页首
	 * @property {String} title 标题
	 * @property {String} bgColor 背景颜色
	 * @property {String} bgImage 背景颜色(渐变)
	 * @property {isBack} Boolean|String 是否有返回箭头
	 * @example <ncu-custom-header
					:isBack="true"
					title="我的"
					bgColor="white"
					style="width: 100%;">
				</ncu-custom-header>
	 */
	export default {
		name: 'ncu-custom-header',
		props: {
			title: {
				type: String,
				default: () => ''
			},
			bgColor: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar+5
			};
		},
		computed: {
			style() {
				let StatusBar= this.StatusBar;
				let CustomBar= this.CustomBar;
				let bgImage = this.bgImage;
				let style = `height:${CustomBar}px;color:${this.color};padding-top:${StatusBar}px;background-color:${this.bgColor ? this.bgColor : 'var(--main-bg-color)'};`;
				if (this.bgImage) {
					style = `${style}background-image:${bgImage};`;
				}
				return style
			}
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			navBarClick() {
				this.$emit('navBarClick')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cu-bar {
		z-index: var(--header-z-index);
		background-color: var(--main-bg-color);
		    background-position: bottom;
	}
	.content {
		font-weight: 700;
		margin: 10px 0;
		width: 100% !important;
		pointer-events: auto;
	}
	.bar-left {
		position: absolute;
		left: 15px;
		top: 0;
	}
	.back {
		z-index: 1;
	}
</style>
