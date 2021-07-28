<template>
	<button 
		class="cu-btn ncu-button"
		:class="[bgImage && !disabled ? 'bg-gradual-'+bgImage : '',
				 bgColor&&!hollowOut ? 'bg-'+bgColor : '',
				 hollowOut ? 'line-'+bgColor : '',
				 radius ? 'radius' : 'no-radius',
				 disabled ? 'disabled bg-grey' : '',
				 light ? 'light' : '',
				 shadow ? 'shadow-blur' : '']"
		:style="{
			width: width,
			padding: getPadddingBySize,
		}"
		@click="$emit('click', $event)"
		:open-type="openType"
		@bindgetuserinfo="bindgetuserinfo">
		<slot></slot>
	</button>
</template>

<script>
	/**
	 * button 按钮
	 * @description button 按钮
	 * @property {String} bgImage 背景颜色(渐变)
	 * @property {String} bgColor 背景颜色
	 * @property {Boolean} radius 是否为圆角
	 * @property {String} openType 开放能力
	 * @property {Boolean} hollowOut 是否镂空
	 * @property {String} size 按钮大小，可选值：super | normal | mini 
	 * @event {Function)} click 按钮被点击
	 * @event {Function)} bindgetuserinfo 获取用户信息，openType 为 'getUserInfo' 时有效
	 */
    export default {
		name: 'ncu-button',
		props: {
			bgImage: {
				type: String,
			},
			bgColor: {
				type: String,
			},
			radius: {
				type: Boolean,
				default: () => true
			},
			width: {
				type: String,
			},
			openType: {
				type: String,
			},
			hollowOut: {
				type: Boolean,
				default: () => false,
			},
			size: {
				type: String,
				default: () => 'normal',
			},
			disabled: {
				type: Boolean,
				default: () => false
			},
			light: {
				type: Boolean,
				default: () => false
			},
			shadow: {
				type: String,
			}
		},
        data() {
            return {
            }
        },
		methods: {
			bindgetuserinfo() {
				// console.log(arguments)
			}
		},
		computed: {
			getPadddingBySize() {
				const paddingSizeMap = {
					super: '25px 40px',
					normal: '20px 40px',
					mini: '15px 0',
				}
				const defaultPadding = paddingSizeMap.normal
				return paddingSizeMap[this.size] || defaultPadding
			}
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-button {
		min-width: 50px;
		// margin: 20px auto;
	}
	.disabled {
		pointer-events: none;
	}
	.radius {
		border-radius: 5px;
	}
	.no-radius {
		border-radius: 0 !important;
	}
</style>


