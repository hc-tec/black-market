<template>
	<div 
		class="ncu-icon-wrapper"
		@click="$emit('click')">
		<div 
			class="ncu-icon-wrapper__icon"
			:class="'cuIcon-'+icon">
		</div>
		<div class="ncu-icon-wrapper__label">
			{{ label }}
		</div>
	</div>
</template>

<script>
    export default {
		props: {
			icon: {
				type: String,
			},
			label: {
				type: String,
				default: () => ''
			},
		},
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-icon-wrapper {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		flex-direction: column;
		margin: 0 10px 10px 10px;
		
		&__icon {
			background-color: var(--main-lighter-color);
			padding: 15px;
			margin-bottom: 10px;
			font-weight: bold;
			font-size: 1.2rem;
			border-radius: 10px;
		}
		
		&__label {
			font-size: 10px;
		}
		
	}
</style>


