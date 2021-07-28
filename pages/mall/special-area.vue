<template>
	<div>
		<ncu-custom-header
			bgColor="transparent" 
			:isBack="true"
			:title="config.text"
			:color="config.color">
		</ncu-custom-header>
		
		<div class="ncu-special-goods-area">
			<div 
				class="ncu-special-goods-area__image-header"
				:style="{
					backgroundColor: config.bgColor,
				}">
			</div>
			<div class="ncu-special-goods-area-main">
				<ncu-scroll-wrapper
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
						:active="loadingConfig.isLoading">
					</ncu-loading-part>
					<ncu-no-data v-if="loadingConfig.noData">
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
		</div>
		
	</div>
</template>

<script>
	import { goodsView_api } from '../../common/api.js'
	import { httpGet } from '../../common/http.js'
    export default {
		onLoad(option) {
			const params = JSON.parse(option.params)
			Object.assign(this.config, params)
		},
        data() {
            return {
				config: {
					bgColor: '',
					color: '',
					text: ''
				},
				refresherEnabled: true,
				goodsDetailCardOpen: false,
				selectGoodsDetails: {},
				goodsItems: [],
				loadingConfig: {
					isLoading: false,
					curPage: 1,
					noData: false,
				}
				
            }
        },
		methods: {
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
				if(this.loadingConfig.isLoading) return
				this.loadingConfig.isLoading = true
				const [res, err] = await httpGet(goodsView_api, {
					page: page || 1,
					school_zone: 1,
				})
				this.loadingConfig.isLoading = false
				this.loadingConfig.noData = res.data.detail
				if(this.loadingConfig.noData) {
					return
				}
				this.curPage ++
				const results = res.data.results
				if(results && !results.length) {
					this.loadingConfig.noData = true
					return
				}
				this.goodsItems = [...this.goodsItems, ...results]
			},
			getGoods(page) {
				this._getGoods(page, {
					
				})
			},
			wantSuccess(res) {
				const goodsInfo = this.selectGoodsDetails.goodsInfo
				goodsInfo.goods_wanted_person = res.wanted_user_num
				goodsInfo.is_wanted_user = res.is_wanted_user
			},
		},
		mounted() {
			this.getGoods(1)
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-special-goods-area {
		position: relative;
		top: -90px;
		height: calc(96vh - 90px);
		
		&__image-header {
			width: 100%;
			height: 120px;
			background-image: var(--texture);
			background-position: left;
		}
		
		&-main {
			background-color: var(--main-bg-color);
			height: 100%;
			position: relative;
			top: -10px;
			border-top-left-radius: 1em;
			border-top-right-radius: 1em;
			overflow: hidden;
		}
		
	}
</style>


