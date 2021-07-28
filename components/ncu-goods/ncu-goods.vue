<template>
	<div class="ncu-mall-goods">
		<div class="ncu-mall-goods__left">
			<ncu-goods-card
				v-for="(goodsItem,index) in 
						goodsItems.slice(0, Math.ceil(goodsItems.length/2))"
				:key="goodsItem.goods_id"
				:index="index"
				:goods="goodsItem"
				@click="handleCardClick(index)"
				@avatarClick="handleAvatarClick">
			</ncu-goods-card>
		</div>
		<div class="ncu-mall-goods__right">
			<ncu-goods-card
				v-for="(goodsItem,index) in 
						goodsItems.slice(Math.ceil(goodsItems.length/2))"
				:key="goodsItem.goods_id"
				:index="Math.ceil(goodsItems.length/2)+index"
				:goods="goodsItem"
				@click="handleCardClick(Math.ceil(goodsItems.length/2)+index)"
				@avatarClick="handleAvatarClick">
			</ncu-goods-card>
		</div>
	</div>
</template>

<script>
    export default {
		props: {
			goodsItems: {
				type: Array,
			}
		},
        data() {
            return {
				handleCardClick(index) {
					this.$emit('click', index)
				},
				handleAvatarClick(index) {
					this.$emit('avatarClick', index)
				}
            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-mall {
		&-goods {
			margin: 2rem 0 1rem 0;
			padding: 0 1%;
			display: flex;
			justify-content: space-evenly;
			align-item:flex-start;
			
			&__left,
			&__right {
				width: 47%;
				display: flex;
				flex-direction: column;
				align-item:flex-start;
			}
			
			& div:first-child {
				margin-right: 1px;
			}
			
		}
	}
</style>


