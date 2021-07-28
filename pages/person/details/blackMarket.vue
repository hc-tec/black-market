<template>
	<div class="black-market-details">
		<ncu-custom-header
			:isBack="true"
			title="摊位"
			bgColor="transparent">
		</ncu-custom-header>
		
		<ncu-nav
			:items="navItems"
			:tabActive="navActive"
			@tabSelect="navChange"
			:divided="false">
		</ncu-nav>
		
		<ncu-scroll-wrapper
			_style="margin-top: 30px;"
			:soften="false"
			:refresherEnabled="refresherEnabled"
			@change="val => refresherEnabled=val"
			@scrolltolower="getGoods(curPage)">
			
			<ncu-goods
				:goodsItems="goodsItems"
				@click="goodsCardClick"
				@avatarClick="toSellerInfo">
			</ncu-goods>
			
			
			<ncu-loading-part 
				type="rect"
				:active="isLoading">
			</ncu-loading-part>
			<ncu-no-data v-if="noData">
			</ncu-no-data>
		</ncu-scroll-wrapper>
		
		<ncu-modal
			class="ncu-goods-details-card-wrapper"
			:open="goodsDetailCardOpen"
			modalPadding="0"
			modalWidth="80%"
			@layer-click="goodsDetailCardOpen=false"
			@lock-open="goodsDetailCardOpen=false">
			<ncu-goods-details-card
				:goodsDetails="selectGoodsDetails"
				@want-success="wantSuccess">
			</ncu-goods-details-card>
		</ncu-modal>
		
	</div>
</template>

<script>
	import { atomicGoodsView_api } from '../../../common/api.js'
	import { httpGet } from '../../../common/http.js'
    export default {
        data() {
            return {
				navActive: 0,
				navItems: ['买入数量', '卖出数量', '想要数量', '现有数量'],
				filters: ['purchase_goods', 'sold_goods', 'favor_goods', 'current_goods'],
				refresherEnabled: true,
				goodsDetailCardOpen: false,
				selectGoodsDetails: {},
				goodsItems: [],
				isLoading: false,
				curPage: 1,
				noData: false,
            }
        },
		methods: {
			navChange(index) {
				//TODO: 根据导航索引 改变数据
				this.navActive = index
				this.goodsItems = []
				this.curPage = 1
				this.noData = false
				this.getGoods(1)
			},
			goodsCardClick(index) {
				this.selectGoodsDetails = this.goodsItems[index]
				this.goodsDetailCardOpen = true
			},
			toSellerInfo(index) {
				const goods = this.goodsItems[index]
				uni.navigateTo({
					url: `/pages/person/index?id=${goods.seller.id}`
				})
			},
			async _getGoods(page, params) {
				if(this.isLoading) return
				this.isLoading = true
				
				const [res, err] = await httpGet(atomicGoodsView_api, {
					page: page || 1,
					...params,
				})
				this.isLoading = false
				this.noData = res.data.detail
				if(this.noData) {
					return
				}
				this.curPage ++
				const results = res.data.results
				if(results && !results.length) {
					this.noData = true
					return
				}
				this.goodsItems = [...this.goodsItems, ...results]
			},
			getGoods(page) {
				this._getGoods(page, {
					filter:  this.filters[this.navActive]
				})
			},
			wantSuccess(res) {
				const goodsInfo = this.selectGoodsDetails.goodsInfo
				goodsInfo.goods_wanted_person = res.wanted_user_num
				goodsInfo.is_wanted_user = res.is_wanted_user
			},
		},
		mounted() {
			const query = this.$root.$mp.query
			const active = +query.active
			this.navActive = active ? active : 0
			this.getGoods(1)
		}
    }
</script>

<style lang="scss" scoped>
	
	
</style>


