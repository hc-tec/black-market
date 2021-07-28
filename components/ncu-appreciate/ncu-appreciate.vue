<template>
	<div class="ncu-appreciate-wrapper">
		<div 
			class="ncu-appreciate"
			:class="active ? 'is-active' : ''"
			hover-class="scale-out"
			:hover-stay-time="100"
			@click.stop="$emit('click', !active)">
		</div>
		<span 
			v-if="num"
			class="ncu-appreciate__num">
			{{ num }}
		</span>
	</div>
</template>

<script>
	/**
	 * 点赞按钮
	 * @description 点赞按钮
	 * @property {Boolean} active 激活点赞效果
	 * @event {Function} click	按钮点击
	 */
    export default {
		name: 'ncu-appreciate',
		props: {
			active: {
				type: Boolean,
				default: () => false,
			},
			num: {
				type: Number,
			}
		},
        data() {
            return {
            }
        },
    }
</script>

<style lang="scss" scoped>
	.ncu-appreciate-wrapper {
		position: relative;
	}
	.ncu-appreciate {
		$scale: 100px;
		width: $scale;
		height: $scale;
		background-image: url("/static/heart.png");
		background-position: 0 0;
		background-repeat: no-repeat;
		transition: background-position 1s steps(28), transform .1s linear;
		transition-duration: 0s;
		transform: scale(.6);
		
		&__num {
			position: absolute;
			top: 50%;
			left: 65%;
			transform: translateY(-50%);
			font-size: 1rem;
		}
	}
	.ncu-appreciate.is-active {
		transition-duration: 1s;
		background-position: -2800px 0;
	}
	.scale-out {
		transform: scale(.5);
	}

</style>


