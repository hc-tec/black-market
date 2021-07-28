<template>
	<div class="ncu-goods-details-card">
		<ncu-carousel
			:imgs="getGoodsAllImgs()"
			:allowPreviewImg="true">
		</ncu-carousel>
		<div class="ncu-goods-details-card-content">
			<div
				class="report-btn"
				@click="report">
				<span class="cuIcon-warn">
				</span>
			</div>
			<p class="ncu-goods-details-card-content__price">
				<span class="cuIcon-moneybag">
				</span> {{ goodsDetails.goodsInfo.goods_price }}
			</p>
			<p class="ncu-goods-details-card-content__title">
				{{ goodsDetails.goodsInfo.goods_title }}
			</p>
			<ncu-goods-details-tab title="标签">
				<div class="ncu-goods-details-card-content__tag-list">
					<ncu-tag 
						v-for="tag in goodsDetails.goodsInfo.goods_tags"
						:key="tag">
						{{ tag }}
					</ncu-tag>
				</div>
			</ncu-goods-details-tab>
			<ncu-goods-details-tab title="上架时间">
				<span class="author-info__launch-time">
					{{ goodsDetails.goodsInfo.goods_launch_time }}
				</span>
			</ncu-goods-details-tab>
			<ncu-goods-details-tab title="所属校区">
				<span class="author-info__location">
					{{ goodsDetails.seller.school_zone }}
				</span>
			</ncu-goods-details-tab>
			<ncu-goods-details-tab title="备注">
				<span class="author-info__remarks">
					{{ goodsDetails.goodsInfo.goods_desc }}
				</span>
			</ncu-goods-details-tab>
			<template v-if="!admin">
				<ncu-goods-details-tab title="卖家">
					<ncu-avatar
						:src="goodsDetails.seller.avatar"
						size="superMini"
						@click="handleAvatarClick">
					</ncu-avatar>
					<span class="author-info__username">
						{{ goodsDetails.seller.user_name }}
					</span>
				</ncu-goods-details-tab>
				<ncu-goods-details-tab title="卖家QQ">
					<span class="author-info__qq">
						{{ goodsDetails.seller.qq }}
					</span>
					<span 
						class="copy cuIcon-copy"
						@click="copy">
					</span>
				</ncu-goods-details-tab>
				<p class="purchase-tip">
					<span class="cuIcon-info"></span>
					如需购买商品，请根据卖家QQ号联系卖家
				</p>
			</template>
			<template v-if="admin">
				<p class="ncu-goods-details-tab__title">
					{{goodsDetails.goodsInfo.goods_wanted_person.length}} 人想要
				</p>
				<div>
					<ncu-avatar 
						style="margin: 10px 10px 5px 0;"
						size="superMini"
						v-for="(person,index) in goodsDetails.goodsInfo.goods_wanted_person"
						:isAuthor="goodsDetails.goodsInfo.goods_is_sold && index==0"
						:key="person.student_id"
						:src="person.avatar"
						@click="toUser(person.id)">
					</ncu-avatar>
				</div>
			</template>
			
		</div>
		<ncu-btn-group class="ncu-goods-operation">
			<template v-if="admin">
				<ncu-button
					class="ncu-goods-operation__btn"
					width="100%"
					bgImage="blue"
					shadow
					:radius="false"
					@click="$emit('handleOperationClick')">
					<span class="cuIcon-more">
					</span>
				</ncu-button>
			</template>
			<template v-else>
				<ncu-button
					class="ncu-goods-operation__btn"
					width="100%"
					shadow
					:bgColor="isHost || isWantedUser ? 'grey' : 'orange'"
					:radius="false"
					@click="wantIt">
					<span class="cuIcon-like">
					</span> {{ isHost 
								? '您的商品' 
								: isWantedUser 
									? '不想要'
									: '想要'}}
				</ncu-button>
			</template>
		</ncu-btn-group>
		
	</div>
</template>

<script>
	/**
	 * @property {Object} goodsDetailsq 商品详细信息
	 * @property {Boolean} admin 是否为卖家
	 */
	import { wantedUser_api } from '../../common/api.js'
	import { httpPut } from '../../common/http.js'
	import GlobalData from '../../common/global.js'
	import ncuGoodsDetailsTab from './ncu-goods-details-tab.vue'
    export default {
		components: {
			ncuGoodsDetailsTab,
		},
		props: {
			goodsDetails: {
				type: Object,
			},
			admin: {
				type: Boolean,
				default: () => false
			}
		},
        data() {
            return {
				
            }
        },
		computed: {
			isWantedUser() {
				return this.goodsDetails.goodsInfo?.is_wanted_user
			},
			isHost() {
				return GlobalData.userInfo?.id === this.goodsDetails.seller?.id
			}
		},
		methods: {
			getGoodsAllImgs() {
				const goodsInfo = this.goodsDetails.goodsInfo
				if(!goodsInfo) return []
				return [goodsInfo.goods_main_image, ...goodsInfo.goods_img]
			},
			copy() {
				uni.setClipboardData({
				    data: this.goodsDetails.seller.qq,
				});
			},
			handleAvatarClick() {
				
			},
			report() {
				
			},
			toUser(id) {
				this.$emit('handleWantedPersonClick', id)
			},
			wantIt() {
				const isSelfGoods = GlobalData.userInfo?.id === this.goodsDetails.seller.id
				if(isSelfGoods) {
					return
				}
				this._wantIt()
			},
			async _wantIt() {
				const goodsInfo = this.goodsDetails.goodsInfo
				const [res, err] = await httpPut(wantedUser_api, {
					goods_id: goodsInfo.goods_id
				}, 2012)
				if(err) {
					this.$emit('want-fail')
					return 
				}
				this.$emit('want-success', res.data)
			}
			
		}
    }
</script>

<style lang="scss">
	.ncu-goods-details-card {
		&__img {
			width: 100%;
			max-height: 300px;
		}
		&__title {
			font-size: 32rpx;
			font-weight: 700;
			text-align: center;
			padding: 0 20px 10px 20px;
		}
		&-content {
			padding: 10px 20px;
			font-size: 32rpx;
			position: relative;
			max-height: 42vh;
			overflow: auto;
			
			&__title {
				font-weight: 700;
			}
			&__price {
				.cuIcon-moneybag {
					font-size: .8rem;
				}
				font-size: 1.1rem;
				color: #ff5000;
			}
			&__tag-list {
				max-width: 73%;
				overflow: auto;
				display: inline-flex;
			}
			
			.report-btn {
				position: absolute;
				top: 10px;
				right: 10px;
				font-size: 1rem;
				color: var(--yellow);
			}
			
		}
	}
	[class^=author-info] {
		font-size: 12px;
	}
	.author-info {
		&__username {
			margin-left: 10px;
		}
	}
	.copy {
		position: absolute;
		right: 15px;
		font-size: 1.2rem;
	}
	.ncu-goods-operation {
		font-size: 12px;
		&__btn {
			width: 50%;
			button {
				transition: background-color .5s;
			}
			// display: inline-block;
			[class*=cuIcon-] {
				padding-right: 5px;
			}
		}	
	}
	.purchase-tip {
		font-size: 10px;
		.cuIcon-info {
			margin-right: 3px;
		}
	}
	
</style>


