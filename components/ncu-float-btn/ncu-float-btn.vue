<template>
	<div 
		class="ncu-float-btn"
		:style="{
			right: `${right}px`,
			bottom: `${bottom}px`,
		}">
		<button
			class="cu-btn"
			:class="[bgColor ? 'bg-'+bgColor : '',]"
			hover-class="in"
			hover-stay-time="100"
			@click="$emit('click')">
			<slot></slot>
		</button>
	</div>
</template>

<script>
    export default {
		props: {
			bgColor: {
				type: String,
				default: () => 'white'
			},
			right: {
				type: Number,
				default: () => 30
			},
			bottom: {
				type: Number,
				default: () => 80
			},
		},
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-float-btn {
		position: fixed;
		
		.cu-btn {
			box-shadow: 0.3rem 0.3rem 0.6rem hsla(215,46%,78%,0.8),-0.3rem -0.3rem 0.6rem hsla(215,46%,108%,0.8);
			width: 50px;
			height: 50px;
			border-radius: 50%;
			transition: box-shadow .2s;
		}
		
		.in {
			box-shadow: 0 0 0 rgba(163,177,198,0.6),-0 -0 0 rgba(236,240,241,0.6),3px 3px 5px rgba(163,177,198,0.6) inset,-3px -3px 3px hsla(0,0%,100%,0.3) inset;
		}
		
	}
</style>


