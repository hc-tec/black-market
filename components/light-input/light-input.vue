<template>
	<div class="light-input-wrapper">
		<textarea
			v-if="type==='textarea'"
			class="light-textarea"
			:type="type"
			:value="value"
			:placeholder="placeholder"
			:cursor="0"
			:selection-start="0"
			:selection-end="0"
			:adjust-position="false"
			@focus="focus"
			@blur="blur"
			@input="$emit('input', $event.target.value)">
		</textarea>
		<input 
			v-else
			class="light-input"
			:type="type"
			:value="value"
			:placeholder="placeholder"
			:cursor="0"
			:selection-start="0"
			:selection-end="0"
			:confirm-type="confirmType"
			:adjust-position="false"
			:style="{
				padding: getPadddingBySize,
			}"
			@confirm="confirm"
			@focus="focus"
			@blur="blur"
			@input="$emit('input', $event.target.value)">
		</input>
		<slot name="suffix"></slot>
	</div>
</template>

<script>
    export default {
			props: {
				type: {
					type: String,
					default: () => 'text'
				},
				value: {
					type: String || Number,
					default: () => ''
				},
				placeholder: {
					type: String,
				},
				size: {
					type: String,
					default: () => 'normal'
				},
				confirmType: {
					type: String,
				}
			},
			model: {
				prop: 'value',
				event: 'input'
			},
			data() {
				return {

				}
			},
			computed: {
				getPadddingBySize() {
					const paddingSizeMap = {
						super: '20px 20px',
						normal: '10px 20px',
						mini: '10px 20px',
					}
					const defaultPadding = paddingSizeMap.normal
					return paddingSizeMap[this.size] || defaultPadding
				}
			},
			methods: {
				confirm(e) {
					this.$emit('confirm', e)
				},
				focus(e) {
					this.$emit('focus', e)
				},
				blur(e) {
					this.$emit('blur', e)
				}
			}
    }
</script>

<style lang="scss" scoped>
	.light-input-wrapper {
		position: relative;
	}
	.light-input,
	.light-textarea {
		width: 100%;
		background-color: var(--main-lighter-color);
		padding: 10px 20px;
		border-radius: 10px;
		height: auto;
		font-size: 14px;
	}
	.light-textarea {
		height: 200px;
	}
</style>


