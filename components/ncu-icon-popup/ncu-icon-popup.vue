<template>
	<ncu-popup-confirm-modal
		:open="open" 
		:closeOnClickLayer="closeOnClickLayer"
		:during="during"
		:needConfirmBtn="needConfirmBtn"
		:needCancelBtn="needCancelBtn"
		@layer-click="$emit('layer-click')"
		@lock-open="$emit('lock-open', false)"
		@cancel="$emit('cancel')"
		@confirm="$emit('confirm')">
		
		<div class="ncu-icon-popup">
			<ncu-icon-wrapper
				class="ncu-icon-popup-wrapper"
				v-for="(item,index) in items"
				:key="item.icon"
				:icon="item.icon"
				:label="item.label"
				@click="$emit('click', index)">
			</ncu-icon-wrapper>
		</div>
		
	</ncu-popup-confirm-modal>
</template>

<script>
    export default {
		props: {
			open: {
				type: Boolean,
				default: () => false
			},
			closeOnClickLayer: {
				type: Boolean,
				default: () => true
			},
			during: {
				type: Number,
				default: () => 500
			},
			items: {
				type: Array,
			},
			needConfirmBtn: {
				type: Boolean,
				default: () => true
			},
			needCancelBtn: {
				type: Boolean,
				default: () => true
			},
		},
        data() {
            return {
				
            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-icon-popup {
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;
		max-height: 60vh;
		overflow-y: auto;
		
		&-wrapper {
			min-width: 25%;
		}
		
	}
</style>


