<template>
	<div class="ncu-entry">
		<register 
			v-model="isLoading"
			:rotate="rotate"
			@onRotate="val => rotate=val"
			@messageOpen="messageOpen">
		</register>
		<login
			v-model="isLoading"
			:rotate="rotate"
			@onRotate="val => rotate=val"
			@messageOpen="messageOpen">
		</login>
		<ncu-loading
			:active="isLoading"
			type="bounce-stick">
		</ncu-loading>
		<ncu-message
			:open="messageConfig.open"
			:type="messageConfig.type"
			:message="messageConfig.message"
			@close="messageClose">
		</ncu-message>
	</div>
</template>

<script>
	import { httpGet } from '../../common/http.js'
	import login from './login.vue'
	import register from './register.vue'
    export default {
		components: {
			login,
			register,
		},
        data() {
            return {
				isLoading: false,
				rotate: false,
				messageConfig: {
					open: false,
					type: 'success',
					message: ''
				},
            }
        },
		methods: {
			messageOpen([message, type]) {
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
		}
    }
</script>

<style lang="scss" scoped>
	
	
</style>


