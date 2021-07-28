<template>
	<div 
		class="ncu-comment-input"
		:class="{
			focus: inputFocus,
		}">
		<ncu-appreciate
			class="ncu-comment-input__appreciate"
			:num="thread_appreciate"
			:active="thread_isAppreciate"
			@click="appreciate">
		</ncu-appreciate>
		<div class="ncu-comment-input__comment">
			<textarea 
				class="input"
				v-model="message"
				:focus="focus" 
				:placeholder="placeholder"
				@focus="handleInputFocus"
				@blur="handleInputBlur"
				maxlength="300" 
				cursor-spacing="10" 
			/>
			
			<div 
				:class="['cuIcon-'+
						(inputFocus ? 'forward' : 'message')]"
				hover-class="scale-out"
				:hover-stay-time="100"
				@click="handleSendBtnClick">
			</div>
		</div>
	</div>
</template>

<script>
	/**
	 * 评论输入框 页面组件
	 * @description 评论输入框 页面组件
	 * @property {Number} thread_appreciate	点赞数量
	 * @property {Boolean} thread_isAppreciate 是否点赞  
	 * @property {String} placeholder 输入框占位符 
	 * @property {Boolean} focus 是否获取焦点 
	 * @event {Function} appreciate 点赞事件
	 * @event {Function} inputFocus 输入框 focus 事件
	 * @event {Function} handleInputBlur 输入框 blur 时间   
	 */
	import { debounce } from '../../common/func.js'
    export default {
		props: {
			thread_appreciate: {
				type: Number
			},
			thread_isAppreciate: {
				type: Boolean,
			},
			placeholder: {
				type: String
			},
			focus: {
				type:  Boolean,
				default: () => false
			}
		},
        data() {
            return {
				inputFocus: false,
				appreciate: debounce(this._appreciate, 500),
				message: ''
            }
        },
		methods: {
			_appreciate(active) {
				this.$emit('appreciate', { active })
			},
			handleInputFocus() {
				this.inputFocus = true
				this.$emit('inputFocus')
			},
			handleInputBlur() {
				this.inputFocus = false
				this.$emit('inputBlur')
			},
			handleSendBtnClick() {
				if(this.message) {
					this.$emit('send', {
						message: this.message,
						clear: this.clearMessage
					})
				}
			},
			clearMessage() {
				this.message = ''
			}
		}
		
    }
</script>

<style lang="scss" scoped>
	.ncu-comment-input {
		position: fixed;
		width: 100%;
		max-height: 44px;
		bottom: 0;
		z-index: 1024;
		box-shadow: 0 -1rpx 6rpx -4rpx rgba(0, 0, 0, 0.1);
		background-color: white;
		display: flex;
		align-items: center;
		padding: 10px 0;
		transition: max-height .3s;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
		
		&.focus {
			max-height: 40vh;
			.input {
				height: 80px;
			}
		}
		
		&__appreciate {
			position: absolute;
			top: 50%;
			left: -10px;
			transform: translate(-15px, -50%);
		}
		
		&__comment {
			margin-left: 65px;
			margin-right: 20px;
			width: 100%;
			display: flex;
			align-items: center;
			font-size: 12px;
			
			.input {
				background-color: #f5f5f5;
				margin-right: 10px;
				padding: 10px;
				height: 34px;
				max-height: 30vh;
				width: calc(100% - 19px);
				border-radius: 5px;
				transition: height .3s;
			}
			[class*="cuIcon-"] {
				font-size: 1.3rem;
			}
		}
		
	}
</style>


