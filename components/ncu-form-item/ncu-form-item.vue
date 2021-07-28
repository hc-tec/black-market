<template>
	<div 
		class="ncu-form-item animate-move-in"
		:style="{
			marginBottom: `${marginBottom}px`,
			animationDelay: `${animaDelay}s`
		}">
		<slot></slot>
	</div>
</template>

<script>
    export default {
		props: {
			marginBottom: {
				type: Number,
				default: () => 10,
			},
			animaDelay: {
				type: Number,
				default: () => 0
			}
		},
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-form-item {
		
	}
</style>


