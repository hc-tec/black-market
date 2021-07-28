<template>
	<div class="ncu-goods-details-tab">
		<span class="ncu-goods-details-tab__title">
			{{ title }}
		</span>
		<slot></slot>
	</div>
</template>

<script>
    export default {
		props: {
			title: {
				type: String,
			}
		},
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss">
	.ncu-goods-details-tab {
		display: flex;
		align-items: center;
		position: relative;
		&__title {
			display: inline-block;
			width: 60px;
			font-size: 12px;
			margin-right: 10px;
			color: var(--main-light-color);
		}
	}
</style>


