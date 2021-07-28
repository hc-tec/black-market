<template>
	<swiper 
		class="screen-swiper" 
		:class="dotStyle+'-dot'" 
		:indicator-dots="true" 
		:circular="true"
		:autoplay="autoplay" 
		:interval="interval" 
		:duration="duration"
		:indicator-color="indicatorColor"
		:indicator-active-color="indicatorActiveColor">
		<swiper-item 
			v-for="(img,index) in imgs" 
			:key="img"
			@click="handleImgClick(index)">
			<image 
				:src="img" 
				mode="aspectFill">
			</image>
		</swiper-item>
	</swiper>
</template>

<script>
	/**
	 * 轮播图
	 * @description 轮播图
	 * @property {Array} imgs 轮播图图片
	 * @property {String} dotStyle 轮播图控制点样式，可选值：square | round
	 * @property {Boolean} autoplay 是否自动播放
	 * @property {Number} interval 轮播间隔，单位毫秒
	 * @property {Number} duration 过渡时间
	 * @property {String} indicatorColor 未激活时控制点颜色
	 * @property {String} indicatorActiveColor 激活时控制点颜色
	 * @property {Boolean} allowPreviewImg 是否允许点击预览图片
	 */
    export default {
		props: {
			imgs: {
				type: Array
			},
			dotStyle: {
				type: String,
				default: 'square',
			},
			autoplay: {
				type: Boolean,
				default: () => true
			},
			interval: {
				type: Number,
				default: () => 5000
			},
			duration: {
				type: Number,
				default: () => 500
			},
			indicatorColor: {
				type: String,
				default: () => '#8799a3'
			},
			indicatorActiveColor: {
				type: String,
				default: () => '#0081ff'
			},
			allowPreviewImg: {
				type: Boolean,
				default: () => false,
			}
		},
        data() {
            return {
			
            }
        },
		methods: {
			handleImgClick(index) {
				this.allowPreviewImg && this.viewImg(index)
				this.$emit('imgClick', index)
			},
			viewImg(index) {
				uni.previewImage({
					urls: this.imgs,
					current: this.imgs[index]
				});
			}
		}
    }
</script>

<style lang="scss" scoped>
	.screen-swiper {
		min-height: 500rpx;
	}
</style>


