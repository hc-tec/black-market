<template>
	<div 
		class="ncu-dance-words"
		@click="rePlay">
		<div 
			v-if="!isRePlay"
			class="ncu-dance-words__wrapper"
			v-for="(word,index) in words"
			:style="{
				animationDelay: 0.2*index+'s'
			}">
			<span>{{ word }}</span>
			<span 
				class="ncu-dance-words__layer"
				:style="{
					backgroundColor: colors[index%8],
					animationDelay: (words.length-1)*0.2+1+'s'
				}">
			</span>
		</div>
	</div>
</template>

<script>
    export default {
		props: {
			words: {
				type: String
			}
		},
        data() {
            return {
				colors: [
					'rgb(238,101,101)', 'rgb(238,204,101)',
					'rgb(169,238,101)', 'rgb(101,238,135)',
					'rgb(101,238,238)', 'rgb(101,135,238)',
					'rgb(169,101,238)', 'rgb(238,101,204)'
				],
				lock: false,
				isRePlay: false,
            }
        },
		methods: {
			init() {
				setTimeout(() => {
					this.lock = false
				}, 4500)
			},
			rePlay() {
				if(this.lock) return
				this.lock = true
				this.isRePlay = true
				setTimeout(() => {
					this.isRePlay = false
				}, 100)
				this.init()
			}
		},
		created() {
			this.init()
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-dance-words {
		padding-bottom: 10px;
		display: flex;
		justify-content: center;
		
		&__wrapper {
			display: inline-block;
			position: relative;
			width: 40px;
			text-align: center;
			animation: words-in 4s ease;
			animation-fill-mode: forwards;
			opacity: 0;
			overflow: hidden;
		}
			
		&__layer {
			position: absolute;
			width: 50%;
			height: calc(100% + 10px);
			left: -100%;
			top: 0;
			z-index: -1;
			animation: layer-move 1s forwards;
		}
	}
	@keyframes words-in {
		0% {
			transform: translate(-50px, -50px);
			opacity: 1;
			width: 40px;
		} 25% {
			transform: translate(0px, 0px);
			opacity: 1;
		} 75% {
			transform: translate(0px, 0px);
			opacity: 1;
			width: 40px;
		} 100% {
			width: auto;
			transform: translate(0px, 0px);
			opacity: 1;
		}
	}
	@keyframes layer-move {
		0% {
			left: -50%;
		} 50% {
			left: 0;
		} 100% {
			left: 100%;
		}
	}
</style>


