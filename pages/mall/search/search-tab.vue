<template>
	<div class="search-tab">
		<div class="search-tab__title">
			<span class="icon" :class="icon"></span>
			{{ title }}
		</div>
		<slot></slot>
	</div>
</template>

<script>
    export default {
		props: {
			icon: {
				type: String,
			},
			title: {
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
	.search-tab {
		margin-bottom: 1rem;
		color: var(--main-light-color);
		&__title {
			margin-bottom: 10px;
		}
		.icon {
			margin-right: 5px;
			font-size: .9rem;
		}
	}
</style>


