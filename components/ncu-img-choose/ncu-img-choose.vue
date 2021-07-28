<template>
	<div
		class="ncu-img-choose" 
		:class="[lineType, ]"
		@click="ChooseAvatar">
		<image
			class="avatar"
			v-if="src"
			:src="src" 
			mode="aspectFill">
		</image>
		<p 
			v-else 
			class='cuIcon-cameraadd'>
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
        },
		methods: {
			ChooseAvatar() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.$emit('change', res.tempFilePaths[0])
					}
				})
			},
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-img-choose {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 90px;
		height: 90px;
		margin: 0 auto;
		font-size: 1.1rem;
		
		.avatar {
			width: 100%;
			height: 100%;
		}
	}
</style>


