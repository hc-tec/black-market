<template>
	<div
		class="ncu-img" 
		:class="[lineType, ]"
		@click="$emit('click')">
		<image
			class="avatar"
			v-if="src"
			:src="src" 
			mode="aspectFill">
		</image>
		<p 
			v-else 
			class='cuIcon-pic'>
		</p>
	</div>
</template>

<script>
    export default {
		props: {
			lineType: {
				type: String,
				default: () => 'solids'
			},
			src: {
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
	.ncu-img {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 49px;
		height: 49px;
		margin: 0 auto;
		font-size: 1.1rem;
		
		.avatar {
			width: 100%;
			height: 100%;
		}
	}
</style>


