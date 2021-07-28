<template>
	<div :style="root">
		<div class="crdiv">
			<label 
				class="crlabe2" 
				:class="[crcss2 ? 'changedcss2' : '']">
			</label>
			<label 
				class="crlabel" 
				:class="[crcss1 ? 'changedcss1' : '', icon]" 
				@click="changecss">
			</label>
		</div>
	</div>
</template>

<script>
	/**
	 * @property {String} bgcolor 背景色， 颜色参数
	 * @property {String} symbol 图标， 参考colorui中的标识，如likefill,favorfill
	 */
	export default {
		name:"ncu-crbutton",
		props: {
			bgcolor: {
				type:String, 
				default: () => "#ff0000",
			},
			symbol: {
				type:String,
				default: () => "favorfill",
			}
		},
		data() {
			return {
				"crcss1":false,
				"crcss2":false,
				"root":"",
				"icon":""
			}
		},
		methods: {
			changecss:function() {
				this.$emit("click");
				this.crcss1=!this.crcss1;
				this.crcss2=!this.crcss2;
			}
		},
		mounted() {
			this.root="--bg-color: "+this.bgcolor+";";
			this.icon="cuIcon-"+this.symbol;
		}
	}
</script>

<style lang="scss" scoped>
	.crdiv {
		display: inline-block;
		border-radius: 100%;
		padding: 0px;
		overflow: hidden;
	}
	.crlabel {
		border-radius: 100%;
		width: 50px;
		height: 50px;
		border: 4px solid #ccc;
		display: block;
		overflow: hidden;
		position: relative;
		text-align: center;
		color: #ccc;
		font-size: 30px;
		left: 0;
		top: 50%;
		line-height: 42px;
		vertical-align: middle;
	}
	.crlabe2 {
		border-radius: 100%;
		width: 50px;
		height: 50px;
		border: 0px;
		position: absolute;
	}
	.changedcss1 {
		animation: crfloat1 0.3s 0s forwards;
	}
	.changedcss2 {
		animation: crfloat2 0.7s 0.3s forwards;
	}
	
	@keyframes crfloat1{
		0% {
			font-size: 30px;
		}
		30% {
			font-size: 21px;
		}
		50% {
			font-size: 30px;
		}
		70% {
			transform: scale(1.1);
			font-size: 39px;
		}
		90% {
			transform: scale(1);
			font-size: 24px;
		}
		100% {
			background-color: var(--bg-color);
			color: #eee;
			font-size: 30px;
			border:4px solid var(--bg-color);
		}
	}
	
	@keyframes crfloat2{
		0% {
			box-shadow: 0px 0px 0px 1px var(--bg-color);
			opacity: 0.5;
		}
		30% {
			background-color: var(--bg-color);
			box-shadow: 0px 0px 0px 7px var(--bg-color);
			opacity: 0.5;
		}
		90% {
			box-shadow: 0px 0px 0px 12px var(--bg-color);
		}
		100% {
			box-shadow: 0px 0px 0px 12px var(--bg-color);
			opacity: 0;
		}
	}
</style>
