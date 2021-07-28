<template>
	<input
		class="glass-input glass"
		:class="[isFocus ? 'glass-input-focus' : '']"
		:type="type"
		:placeholder="placeholder"
		@input="$emit('input', $event.target.value)"
		@focus="isFocus=true"
		@blur="isFocus=false" />
</template>

<script>
    export default {
		props: {
			type: {
				type: String,
				default: () => 'text'
			},
			placeholder: {
				type: String,
			},
			value: {
				type: String || Number,
			},
		},
		model: {
			prop: 'value',
			event: 'input'
		},
        data() {
            return {
				isFocus: false,
				
            }
        }
    }
</script>

<style lang="scss" scoped>
	.glass-input {
		width: 200px;
		padding: 10px 15px;
		height: 60px;
		border-radius: 14px;
		display: inline-block;
		margin-right: 20px;
		
		&-focus {
			padding: 10px 12px;
			border: 3px solid var(--blue);
			font-weight: bold;
		}
		
	}
</style>


