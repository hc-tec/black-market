<template>
	<div class="ncu-mall">
		
		<ncu-custom-header
			:title="mallTitle"
			bgColor="transparent">
			<div 
				class="nav-bar-left" 
				slot="left"
				@click="schoolZoneItem.open=true">
				<span class="cuIcon-locationfill"></span>
				{{ schoolZones[goodsSchoolZone-1].label }}
			</div>
		</ncu-custom-header>
		
		<ncu-scroll-wrapper
			:refresherEnabled="refresherEnabled"
			@change="val => refresherEnabled=val"
			@scrolltolower="getGoods(curPage)">
			<div class="ncu-scroll-items-wrapper animate-move-in">
				<ncu-dance-words 
					words="Welcome"
					style="text-align: center;">
				</ncu-dance-words>
				<ncu-scroll-title
					:scrollItem="scrollItems"
					@click="scrollTitleClick">
				</ncu-scroll-title>
			</div>
			
			<div class="ncu-special-goods">
				<ncu-zhhot-button 
					bgColor="rgb(212,240,254)"
					color="rgb(10,65,136)"
					icon="cuIcon-present"
					text="免费区"
					style="width: 100%;margin-right: .5em;"
					:index="8"
					@click="toSpecialPriceGoods('free', $event)">
				</ncu-zhhot-button>
				<ncu-zhhot-button
					bgColor="rgb(200,246,235)"
					color="rgb(10,86,63)"
					icon="cuIcon-evaluate"
					text="特价区"
					style="width: 100%;"
					:index="9"
					@click="toSpecialPriceGoods('special', $event)">
				</ncu-zhhot-button>
			</div>
			
			<ncu-goods 
				:goodsItems="goodsItems"
				@click="goodsCardClick"
				@avatarClick="toSellerInfo">
			</ncu-goods>
			
			<!-- <div class="ncu-mall-goods">
				<div class="ncu-mall-goods__left">
					<ncu-goods-card
						v-for="(goodsItem,index) in 
								goodsItems.slice(0, Math.ceil(goodsItems.length/2))"
						:key="goodsItem.goods_id"
						:index="index"
						:goods="goodsItem"
						@click="goodsCardClick"
						@avatarClick="toSellerInfo">
					</ncu-goods-card>
				</div>
				<div class="ncu-mall-goods__right">
					<ncu-goods-card
						v-for="(goodsItem,index) in 
								goodsItems.slice(Math.ceil(goodsItems.length/2))"
						:key="goodsItem.goods_id"
						:index="Math.ceil(goodsItems.length/2)+index"
						:goods="goodsItem"
						@click="goodsCardClick(Math.ceil(goodsItems.length/2)+index)"
						@avatarClick="toSellerInfo">
					</ncu-goods-card>
				</div>
			</div> -->
			<ncu-loading-part 
				type="bounce-stick"
				:active="isLoading">
			</ncu-loading-part>
			<ncu-no-data v-if="noData">
			</ncu-no-data>
		</ncu-scroll-wrapper>
		
		<ncu-float-btn
			@click="toSearch">
			<span 
				:class="[`cuIcon-${urlParamsTag ? 'back' : 'search'}`]">
			</span>
		</ncu-float-btn>
		
		<ncu-modal 
			class="ncu-goods-details-card-wrapper"
			modalPadding="0"
			modalWidth="80%"
			:open="goodsDetailCardOpen"
			@layer-click="goodsDetailCardOpen=false"
			@lock-open="goodsDetailCardOpen=false">
			<ncu-goods-details-card
				:goodsDetails="selectGoodsDetails"
				@want-success="wantSuccess">
			</ncu-goods-details-card>
		</ncu-modal>
	
		<ncu-popup-select
			v-model="schoolZoneItem.school_zone"
			title="选择校区"
			direction="top"
			:open="schoolZoneItem.open"
			:items="schoolZones"
			@confirm="schoolZoneModifyConfirm"
			@cancel="schoolZoneItem.open=false"
			@layer-click="schoolZoneItem.open=false">
		</ncu-popup-select>
	</div>
</template>

<script>
	import { goodsView_api, searchGoods_api } from '../../common/api.js'
	import { httpGet } from '../../common/http.js'
	import { schoolZones } from '../../common/config.js'
	import GlobalData from '../../common/global.js'
    export default {
		onLoad(option) {
			this.urlParamsTag = option.tag
		},
        data() {
            return {
				refresherEnabled: true,
				goodsDetailCardOpen: false,
				mallTitle: '商城',
				urlParamsTag: '',
				schoolZones: schoolZones,
				selectGoodsDetails: {},
				scrollItems: [
					{
						text: '书籍',
						link: '#'
					},
					{
						text: '鼠标',
						link: '#'
					},
					{
						text: '键盘',
						link: '#'
					},
					{
						text: '文具',
						link: '#'
					},
					{
						text: '盒',
						link: '#'
					},
					{
						text: '图书',
						link: '#'
					},
					{
						text: '洗衣液',
						link: '#'
					},
					{
						text: '包',
						link: '#'
					},
					{
						text: '衣架',
						link: '#'
					},
				],
				goodsItems: [
					/*
					// {
					// 	seller: {
					// 		id: 0,
					// 		user_name: '卖家',
					// 		school_zone: '青山湖校区',
					// 		avatar: '',
					// 	},
					// 	goodsInfo: {
					// 		goods_id : 0,
					// 		goods_main_image: 'https://img11.360buyimg.com/seckillcms/s280x280_jfs/t1915/193/1773849739/92841/1e46f9e3/56da836bN8241f9c4.png.webp',
					// 		goods_img: ['https://img11.360buyimg.com/seckillcms/s280x280_jfs/t1915/193/1773849739/92841/1e46f9e3/56da836bN8241f9c4.png.webp'],
					// 		goods_title: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
					// 		goods_price: 10.24,
					// 		goods_tags: ['可刀'],
					// 	}
						
					// },
					*/
				],
				schoolZoneItem: {
					school_zone: 0,
					open: false
				},
				goodsSchoolZone: 1,
				isLoading: false,
				curPage: 1,
				noData: false,
			}
        },
		methods: {
			toSpecialPriceGoods(area, e) {
				const params = JSON.stringify(e)
				uni.navigateTo({
					url: `/pages/mall/special-area?params=${params}`
				})
			},
			scrollTitleClick(index) {
				const tag = this.scrollItems[index].text
				if(this.urlParamsTag) {
					uni.redirectTo({
						url: `/pages/mall/index?tag=${tag}`
					})
					return
				}
				uni.navigateTo({
					url: `/pages/mall/index?tag=${tag}`
				})
				// this.goodsItems = []
				// this.curPage = 1
				// this.noData = false
				// this.urlParamsTag = tag
				// this.getGoods()
			},
			goodsCardClick(index) {
				this.selectGoodsDetails = this.goodsItems[index]
				this.goodsDetailCardOpen = true
			},
			schoolZoneModifyConfirm() {
				const isChange = this.schoolZoneItem.school_zone !== this.goodsSchoolZone
				this.schoolZoneItem.open = false
				if(!this.schoolZoneItem.school_zone || !isChange) return
				this.goodsSchoolZone = this.schoolZoneItem.school_zone
				this.init()
				this.getGoods()
			},
			init() {
				this.isLoading = false
				this.curPage = 1
				this.noData = false
				this.goodsItems = []
			},
			toSellerInfo(index) {
				const goods = this.goodsItems[index]
				uni.navigateTo({
					url: `/pages/person/index?id=${goods.seller.id}`
				})
			},
			toSearch() {
				if(this.urlParamsTag) {
					uni.navigateBack()
					return
				}
				uni.navigateTo({
					url: '/pages/mall/search'
				})
			},
			async getGoodsByTime(page) {
				if(this.isLoading) return
				this.isLoading = true
				const [res, err] = await httpGet(goodsView_api, {
					page: page || 1,
					school_zone: this.goodsSchoolZone,
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
			async getGoodsByTag(page) {
				if(this.isLoading) return
				this.isLoading = true
				const [res, err] = await httpGet(searchGoods_api, {
					page: page || 1,
					q: this.urlParamsTag,
					school_zone: this.goodsSchoolZone,
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
				if(this.urlParamsTag) {
					this.getGoodsByTag(page)
				} else {
					this.getGoodsByTime(page)
				}
			},
			wantSuccess(res) {
				const goodsInfo = this.selectGoodsDetails.goodsInfo
				goodsInfo.goods_wanted_person = res.wanted_user_num
				goodsInfo.is_wanted_user = res.is_wanted_user
			},
			formatSchoolZones(originSchoolZone) {
				let target
				this.schoolZones.some(school_zone => {
					if(school_zone.label === originSchoolZone) {
						target = school_zone.value
						return true
					}
				})
				return target || 1
			},
			startRequest() {
				this.goodsSchoolZone = this.formatSchoolZones(GlobalData.userInfo.school_zone)
				if(this.urlParamsTag) {
					this.mallTitle = `商城 - ${this.urlParamsTag}`
				} else {
					this.mallTitle = '商城'
				}
				this.getGoods()
			},
		},
		mounted() {
			const isLogin = GlobalData.checkLogin()
			if(!isLogin) {
				GlobalData.login.addWatcher(this.startRequest)
			} else {
				this.startRequest()
			}
			
		},
		beforeDestroy() {
			GlobalData.login.removeWatcher(this.startRequest)
		},
    }
</script>

<style lang="scss">
	.ncu-scroll-items-wrapper {
		font-size: 40px;
		margin-top: 10px;
		background: white;
		padding: 20px 0;
	}
	.ncu-special-goods {
		display: flex;
		justify-content: space-around;
		margin: .8em .6em 0;
	}
	.nav-bar-left {
		font-size: .9rem;
		color: var(--main-light-color);
		font-weight: 400;
		[class^=cuIcon] {
			font-size: 1rem;
		}
	}
</style>


