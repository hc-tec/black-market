<template>
	<div 
		v-if="true_open"
		class="ncu-container"
		:class="{
			active: open,
		}">
		<div 
			class="ncu-layer"
			:style="{
				transition: `opacity ${during/1000}s linear`,
			}"
			@click="layerClick">
		</div>
		<slot></slot>
	</div>
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
				default: () => 300
			}
		},
        data() {
            return {
				true_open: this.open,
				lock: false
            }
        },
		watch: {
			open() {
				if(this.lock) {
					this.$emit("lock-open", false)
					return;
				}
				if(!this.open) {
					this.lock = true
					setTimeout(() => {
						this.true_open = false
						this.lock = false
					}, this.during)
					return
				}
				this.true_open = true
			}
		},
		methods: {
			layerClick() {
				if(this.closeOnClickLayer) {
					this.$emit('layer-click')
				}
			},
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-container {
		z-index: var(--layer-z-index);
		position: fixed;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
	}
	.ncu-layer {
		background: var(--layer-bg-color);
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		opacity: 0;
		
		z-index: -1;
	}
	.active {
		
		.ncu-layer {
			opacity: 1;
		}
		
	}
</style>


