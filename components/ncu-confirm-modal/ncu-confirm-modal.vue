<template>
	<ncu-modal
		class="ncu-confirm-modal"
		:open="open"
		:type="type"
		:closeOnClickModal="closeOnClickModal"
		@layer-click="$emit('layer-click')"
		@lock-open="val => $emit('lock-open', val)">
		<div class="ncu-confirm-modal__title">
			{{ title }}
		</div>
		<div 
			class="ncu-confirm-modal__message"
			v-html="message">
		</div>
		<div class="ncu-confirm-modal__btn-group">
			<ncu-button 
				class="ncu-confirm-modal__btn"
				width="100%"
				shadow
				:bgImage="cancelBtnBgImage"
				:radius="false"
				@click="$emit('cancelBtnClick')">
				取消
			</ncu-button>
			<ncu-button 
				class="ncu-confirm-modal__btn"
				width="100%"
				shadow
				:bgImage="confirmBtnBgImage"
				:radius="false"
				@click="$emit('confirmBtnClick')">
				确定
			</ncu-button>
		</div>
	</ncu-modal>
</template>

<script>
	/**
	 * confirm modal 确认模态框
	 * @description confirm modal 确认模态框
	 * @property {Boolean} open 模态框控制开关
	 * @property {String} type 特效类型，可选值：unfolding | revealing | blowup | meep | sketch | bond
	 * @property {Boolean} closeOnClickModal 当点击遮罩时，是否能够触发事件 
	 * @event {Function} layer-click 点击遮罩的事件 
	 * @example <ncu-confirm-modal
					:open="exitModalOpen"
					title="信息框"
					message="确定退出登录？"
					@layer-click="modalClose"
					@cancelBtnClick="modalClose"
					@confirmBtnClick="exit">
				</ncu-confirm-modal>
	 */
    export default {
		name: 'ncu-confirm-modal',
		props: {
			open: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: () => 'unfolding'
			},
			title: {
				type: String,
			},
			message: {
				type: String,
			},
			closeOnClickModal: {
				type: Boolean,
				default: () => true
			},
			cancelBtnBgImage: {
				type: String,
			},
			confirmBtnBgImage: {
				type: String,
			},
		},
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
	
	
	
	.ncu-confirm-modal {
		position: relative;
		&__title,
		&__message {
			padding: 0 50px;
		}
		&__title {
			font-weight: bold;
			text-align: center;
		}
		&__message {
			margin: 15px 0;
			font-size: .9rem;
			max-height: 50vh;
			overflow-y: auto;
		}
		&__btn-group {
			display: flex;
		}
		&__btn {
			width: 50%;
			padding: 0;
		}
	}
</style>


