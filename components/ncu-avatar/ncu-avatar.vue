<template>
	<div 
		class="ncu-avatar"
		:style="[getAvatarSize, ]"
		@click.stop="$emit('click', {src, size})">
		<i 
			v-if="isAuthor"
			class="cuIcon-lightfill author-light">
		</i>
		<image 
			class="ncu-avatar__img"
			mode="aspectFill"
			:src="src || avatar">
		</image>
	</div>
</template>

<script>
	import { base64Avatar } from '../../common/config.js'
	/**
	 * avatar 头像
	 * @description avatar 头像
	 * @property {String} src 头像路径
	 * @property {String} size 头像大小, 可选值：super | large | default | mini | superMini
	 * @event {Function} click 头像被点击
	 */
    export default {
		name: 'ncu-avatar',
		props: {
			src: {
				type: String,
				default: ''
			},
			size: {
				type: String,
				default: () => 'default'
			},
			isAuthor: {
				type: Boolean,
				default: false,
			},
		},
		computed: {
			getAvatarSize() {
				const sizeMapping = {
					super: '210rpx',
					large: '150rpx',
					default: '120rpx',
					mini: '90rpx',
					superMini: '35px',
				}
				let size = sizeMapping[this.size] || sizeMapping.default
				return {
					width: size,
					height: size
				}
			}
		},
        data() {
            return {
				avatar: base64Avatar
            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-avatar {
		position: relative;
		display: inline-flex;
		margin: auto;
		border-radius: 50%;
		box-shadow: rgba(173, 195, 225, 0.8) 0.3rem 0.3rem 0.6rem;
		
		&__img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: 50%;
		}
	}
	.author-light {
		width: 15px;
		height: 15px;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1px;
		bottom: 0;
		right: 0;
		color: white;
		background: gold;
		z-index: 10;
		border-radius: 50%;
	}
</style>


