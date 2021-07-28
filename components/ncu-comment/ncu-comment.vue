<template>
	<div class="ncu-comment">
		<ncu-title 
			class="ncu-comment__title"
			title="评论">
		</ncu-title>
		<scroll-view
			refresher-default-style="none"
			:scroll-y="true"
			:style="{
				minHeight: '50px',
				height: height,
				maxHeight: '500px',
			}"
			@scrolltolower="$emit('scrolltolower')">
			<div class="ncu-comment__items">
				<slot></slot>
			</div>
		</scroll-view>
	</div>
</template>

<script>
    export default {
		props: {
			height: {
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
	.ncu-comment {
		width: 100%;
		margin: 0 auto 100px auto;
		padding: 20px 0;
		background-color: #fff;
		border-radius: 15px;
		box-shadow: 0 1px 3px rgba(18, 18, 18, 0.1);
		position: relative;
		z-index: 2;
		
		&__title {
			
		}
		
		&__items {
			margin-top: 20px;
		}
	}
</style>


