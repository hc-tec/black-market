<template>
	<div class="ncu-shop">
		
		<ncu-custom-header
			:title="otherUserId ? `TA 的摊位` : '摊位'"
			:isBack="otherUserId"
			bgColor="transparent">
		</ncu-custom-header>
		
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
				:admin="!otherUserId"
				:goodsDetails="selectGoodsDetails"
				@handleOperationClick="adminOperationItem.open=true"
				@handleWantedPersonClick="handleWantedPersonClick"
				@want-success="wantSuccess">
			</ncu-goods-details-card>
		</ncu-modal>
		
		<template v-if="!otherUserId">
			<ncu-float-btn
				@click="toUpload">
				<span class="cuIcon-add">
				</span>
			</ncu-float-btn>
			
			<ncu-icon-popup
				:open="adminOperationItem.open"
				:items="adminOperationItem.item"
				:needConfirmBtn="false"
				@click="adminOperationItemClick"
				@cancel="adminOperationItem.open=false"
				@layer-click="adminOperationItem.open=false">
			</ncu-icon-popup>
			
			<ncu-icon-popup
				:open="wantedPersonOperationItem.open"
				:items="wantedPersonOperationItem.item"
				:needConfirmBtn="false"
				@click="wantedPersonOperationItemClick"
				@cancel="wantedPersonOperationItem.open=false"
				@layer-click="wantedPersonOperationItem.open=false">
			</ncu-icon-popup>
			
			<ncu-confirm-modal
				:open="deleteConfirmModal.open"
				title="删除"
				message="确定删除商品？"
				@lock-open="deleteConfirmModal.open=false"
				@layer-click="deleteConfirmModal.open=false"
				@cancelBtnClick="deleteConfirmModal.open=false"
				@confirmBtnClick="deleteConfirm">
			</ncu-confirm-modal>
			
			<ncu-confirm-modal
				:open="buyerSetConfirmModal.open"
				title="提示"
				message="确定设为买家？"
				@lock-open="buyerSetConfirmModal.open=false"
				@layer-click="buyerSetConfirmModal.open=false"
				@cancelBtnClick="buyerSetConfirmModal.open=false"
				@confirmBtnClick="buyerSetConfirm">
			</ncu-confirm-modal>
		</template>
		
		<ncu-message
			v-if="!otherUserId"
			:open="messageConfig.open"
			:type="messageConfig.type"
			:message="messageConfig.message"
			@close="messageClose">
		</ncu-message>
		
	</div>
</template>

<script>
	import GlobalData from '../../common/global.js'
	import { wantedUser_api, goodsView_api, dealView_api } from '../../common/api.js'
	import { httpGet, httpDelete, httpPost } from '../../common/http.js'
    export default {
        data() {
            return {
				refresherEnabled: true,
				goodsDetailCardOpen: false,
				selectGoodsDetails: {},
				selectGoodsIndex: -1, // 删除时用
				otherUserId: null,
				goodsItems: [],
				messageConfig: {
					open: false,
					type: 'success',
					message: ''
				},
				wantedPersonOperationItem: {
					open: false,
					item: [
						// {
						// 	icon: 'edit',
						// 	label: '编辑',
						//  callback: this.editOperationClick
						// },
						{
							icon: 'pick',
							label: '买家',
							callback: this.buyerSetOperationClick
						},
						{
							icon: 'people',
							label: '空间',
							callback: this.toBuyerInfo
						},
					]
				},
				adminOperationItem: {
					open: false,
					item: [
						// {
						// 	icon: 'edit',
						// 	label: '编辑',
						//  callback: this.editOperationClick
						// },
						{
							icon: 'delete',
							label: '下架',
							callback: this.deleteOperationClick
						},
					]
				},
				deleteConfirmModal: {
					open: false
				},
				buyerSetConfirmModal: {
					open: false
				},
				buyerId: null,
				GlobalData: GlobalData,
				isLoading: false,
				curPage: 1,
				noData: false,
				buyerSetConfig: {
					isLoading: false,
				}
            }
        },
		methods: {
			messageOpen(message, type) {
				this.messageConfig = {
					type: type || 'success',
					message: message,
					open: true
				}
			},
			messageClose(overlay) {
				const isDoubleClick = !overlay.clickNum
				if(isDoubleClick) {
					this.messageConfig.open = false
					overlay.notExtend()
					overlay.readyClose()
				} else {
					overlay.extend()
				}
			},
			toUpload() {
				uni.navigateTo({
					url: '/pages/shop/upload'
				})
			},
			async goodsCardClick(index) {
				this.selectGoodsIndex = index
				this.selectGoodsDetails = this.goodsItems[index]
				const goodsInfo = this.selectGoodsDetails.goodsInfo
				const [res, _] = await httpGet(wantedUser_api, {
					goods_id: goodsInfo.goods_id
				})
				const data = res.data
				// 如果商品已卖出，将买家调整至想要人员中的第一个
				const isSold = goodsInfo.goods_is_sold
				if(isSold) {
					const soldUserId = goodsInfo.goods_sold_user
					let soldUserIndex;
					data.some((wantedUser, index) => {
						if(wantedUser.id === soldUserId) {
							soldUserIndex = index
							return true;
						}
					})
					const soldUserItem = data[soldUserIndex]
					data.splice(soldUserIndex, 1)
					data.unshift(soldUserItem)
				}
				
				goodsInfo.goods_wanted_person = data
				
				this.goodsDetailCardOpen = true
			},
			toSellerInfo(index) {
				const goods = this.goodsItems[index]
				this.toUser(goods.seller.id)
			},
			toBuyerInfo() {
				this.toUser(this.buyerId)
			},
			toUser(id) {
				uni.navigateTo({
					url: `/pages/person/index?id=${id}`
				})
			},
			handleWantedPersonClick(id) {
				this.buyerId = id
				this.wantedPersonOperationItem.open=true
			},
			adminOperationItemClick(index) {
				this.adminOperationItem.item[index].callback()
			},
			wantedPersonOperationItemClick(index) {
				this.wantedPersonOperationItem.item[index].callback()
			},
			editOperationClick() {
				
			},
			deleteOperationClick() {
				this.deleteConfirmModal.open = true
			},
			buyerSetOperationClick() {
				const isSold = this.selectGoodsDetails.goodsInfo.goods_is_sold
				if(isSold) {
					this.messageOpen('商品已卖出', 'danger')
					this.wantedPersonOperationItem.open = false
					return
				}
				this.buyerSetConfirmModal.open = true
			},
			async deleteConfirm() {
				const [res, _] = await httpDelete(goodsView_api, {
					goods_id: this.selectGoodsDetails.goodsInfo.goods_id
				})
				if(this.selectGoodsIndex !== -1) {
					this.goodsItems.splice(this.selectGoodsIndex, 1)
				}
				this.goodsDetailCardOpen = false
				this.adminOperationItem.open = false
				this.deleteConfirmModal.open = false
			},
			async buyerSetConfirm() {
				if(this.buyerSetConfig.isLoading) return
				this.buyerSetConfig.isLoading = true
				const [res, err] = await httpPost(dealView_api, {
					buyer_id: this.buyerId,
					goods_id: this.selectGoodsDetails.goodsInfo.goods_id,
				}, 2026)
				this.buyerSetConfig.isLoading = false
				this.selectGoodsDetails.goodsInfo.goods_is_sold = true
				this.wantedPersonOperationItem.open = false
				this.buyerSetConfirmModal.open = false
			},
			async getGoods(page) {
				if(this.isLoading) return
				this.isLoading = true
				const [res, err] = await httpGet(goodsView_api, {
					page: page || 1,
					user_id: this.otherUserId || GlobalData.userInfo.id 
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
			wantSuccess(res) {
				const goodsInfo = this.selectGoodsDetails.goodsInfo
				goodsInfo.goods_wanted_person = res.wanted_user_num
				goodsInfo.is_wanted_user = res.is_wanted_user
			},
		},
		mounted() {
			this.otherUserId = +this.$mp?.page?.options?.id
			this.getGoods()
		}
	}
</script>

<style lang="scss" scoped>
	.addGoods {
		
	}
	.ncu-scroll-items-wrapper {
		font-size: 40px;
		margin-top: 10px;
		background: white;
		padding: 20px 0;
	}
</style>


