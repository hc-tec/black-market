<template>
	<div 
		class="ncu-back-arrow"
		hover-class="hover-opacity"
		hover-stay-time="0">
		<div class="line">
			<div class="other-line"></div>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-back-arrow {
		margin-top: 2px;
		.line {
			width: 20px;
			height: 2px;
			margin-left: 20px;
			border-radius: 10px;
			background-color: #043165;
			position: relative;
		}
		.other-line {
			position: absolute;
			width: 10px;
			height: 2px;
			top: -3px;
			left: -1px;
			border-radius: 5px;
			background-color: #043165;
			transform: rotate(-30deg);
		}
	}
</style>


