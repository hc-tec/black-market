<template>
	<div class="ncu-goods-upload">
		<ncu-custom-header
			isBack
			title="给小摊添添货"
			style="width: 100%;">
		</ncu-custom-header>
		
		<ncu-scroll-wrapper
			:refresherEnabled="refresherEnabled"
			@change="val => refresherEnabled=val">
			<div class="ncu-goods-upload">
				<light-input
					class="animate-move-left"
					size="super"
					style="margin: 0 10px;display: block;"
					v-model="goodsInfo.goods_title"
					placeholder="标题">
				</light-input>
				<ncu-settings-item
					label="价格"
					index="1"
					@click="goodsPriceItem.open=true"
					:arrow="false">
					￥{{ goodsInfo.goods_price }}
				</ncu-settings-item>
				<ncu-settings-item
					label="标签"
					index="2"
					style="width: 60%;"
					@click="goodsTagsItem.open=true"
					:arrow="false">
					<template v-if="goodsInfo.goods_tags.length">
						<ncu-tag
							style="margin-right: 5px;display: inline;"
							v-for="tag in goodsInfo.goods_tags"
							:key="tag">
							{{ tag }}
						</ncu-tag>
					</template>
					<p v-else>无</p>
				</ncu-settings-item>
				<ncu-settings-item
					label="备注"
					index="3"
					@click="goodsDescItem.open=true"
					:arrow="false">
					<p v-if="goodsInfo.goods_desc">
						{{ goodsInfo.goods_desc }}
					</p>
					<p v-else>无</p>
				</ncu-settings-item>
				<ncu-settings-item
					label="图片"
					index="4"
					@click="goodsImgsItem.open=true"
					:arrow="false">
					<image
						class="small-img"
						style="margin-right: 5px;"
						v-for="img in goodsAllImgs"
						:key="img"
						v-if="img"
						:src="img">
					</image>
					<p v-else>无</p>
				</ncu-settings-item>
				<ncu-button 
					class="animate-move-bottom"
					bgImage="blue"
					width="100%" 
					style="width: 90%;margin: 10px auto;display: block;animation-delay: 1s;"
					shadow
					:disabled="isLoading"
					@click="addToShop">
					<span class="cuIcon-upload">
					</span> 添加到摊位
				</ncu-button>
			</div>
		</ncu-scroll-wrapper>
		
		<ncu-popup-confirm-modal
			title="请输入价格"
			:open="goodsPriceItem.open"
			:keyboardHeight="keyboardHeight"
			@confirm="goodsPriceConfirm"
			@cancel="goodsPriceItem.open=false"
			@layer-click="goodsPriceItem.open=false">
			<light-input
				type="digit"
				v-model="goodsPriceItem.item"
				@focus="inputFocus"
				@blur="inputBlur">
			</light-input>
		</ncu-popup-confirm-modal>
		
		<ncu-popup-confirm-modal
			:open="goodsTagsItem.open"
			:keyboardHeight="keyboardHeight"
			@confirm="goodsTagsConfirm"
			@cancel="goodsTagsItem.open=false"
			@layer-click="goodsTagsItem.open=false">
			<div class="tag-chosen">
				<ncu-title title="已选标签" type="no-bg"></ncu-title>
				<div class="ncu-goods-tags">
					<template v-if="goodsTagsItem.item.length">
						<ncu-popup-option
							v-for="tag in goodsTagsItem.item"
							style="margin-right: 10px;"
							size="mini"
							:key="tag"
							@click="handleTagRemove(tag)">
							{{ tag }}
						</ncu-popup-option>
					</template>
					<p v-else>无</p>
				</div>
			</div>
			<div class="tag-choose">
				<ncu-title title="热门标签" type="no-bg"></ncu-title>
				<div class="ncu-goods-tags hot">
					<ncu-popup-option 
						v-for="tag in goodsHotTags"
						style="margin-right: 10px;"
						size="mini"
						:key="tag"
						:active="goodsTagsItem.item.includes(tag)"
						@click="handleTagClick(tag)">
						{{ tag }}
					</ncu-popup-option>
				</div>
				<!-- <ncu-title title="我的标签"></ncu-title>
				<div class="ncu-goods-tags self">
					<template v-if="goodsSelfTags.length">
						<ncu-popup-option
							v-for="tag in goodsSelfTags"
							style="margin-right: 10px;"
							size="mini"
							:key="tag"
							:active="goodsTagsItem.item.includes(tag)"
							@click="handleTagClick(tag)">
							{{ tag }}
						</ncu-popup-option>
					</template>
					<p v-else>无</p>
				</div> -->
				<div class="ncu-goods-new-tag">
					<light-input
						v-model="goodsTagsItem.newTag"
						style="margin-right: 10px;width: 100%;"
						placeholder="添加标签"
						@focus="inputFocus"
						@blur="inputBlur">
						<div
							slot="suffix"
							class="valid-send-btn cuIcon-add bg-gradual-blue"
							@click="addNewTag">
						</div>
					</light-input>
				</div>
				
			</div>
		</ncu-popup-confirm-modal>
		
		<ncu-popup-confirm-modal
			title="备注"
			:open="goodsDescItem.open"
			:keyboardHeight="keyboardHeight"
			@confirm="goodsDescConfirm"
			@cancel="goodsDescItem.open=false"
			@layer-click="goodsDescItem.open=false">
			<light-input
				type="textarea"
				v-model="goodsDescItem.item"
				placeholder="这件商品, hmm, 我还得多说两句"
				@focus="textareaFocus"
				@blur="inputBlur">
			</light-input>
		</ncu-popup-confirm-modal>
	
		
		<ncu-popup-confirm-modal
			:open="goodsImgsItem.open"
			@confirm="goodsImgsConfirm"
			@cancel="goodsImgsItem.open=false"
			@layer-click="goodsImgsItem.open=false">
			<div class="ncu-goods-upload__imgs-upload">
				<ncu-button 
					width="100%"
					@click="chooseImgs">
					选择图片
				</ncu-button>
				<div class="ncu-goods-upload__imgs">
					<div class="ncu-goods-upload__main-img">
						<ncu-title type="no-bg" title="主图 (所选图片的第一张)"></ncu-title>
						<ncu-img 
							:src="goodsImgsItem.main_img"
							@click="previewImgs(goodsImgsItem.main_img)">
						</ncu-img>
					</div>
					<div>
						<ncu-title type="no-bg" title="副图 (最多6张)"></ncu-title>
						<div class="ncu-goods-upload__other-imgs">
							<ncu-img
								style="min-width: 30%;margin: 1% 1%;"
								v-for="i in 6"
								:key="i"
								:src="goodsImgsItem.other_imgs[i]"
								@click="previewImgs(goodsImgsItem.other_imgs[i])">
							</ncu-img>
						</div>
					</div>
				</div>
			</div>
		</ncu-popup-confirm-modal>
	
		<ncu-message
			:open="messageConfig.open"
			:type="messageConfig.type"
			:message="messageConfig.message"
			@close="messageClose">
		</ncu-message>
	
		<ncu-loading
			:active="isLoading"
			type="elem">
		</ncu-loading>
	</div>
</template>

<script>
	import GlobalData from '../../common/global.js'
	import { Host, image_upload_api, goodsView_api } from '../../common/api.js'
	import { uniFileUploader, httpPost } from '../../common/http.js'
	import { validator } from '../../common/func.js'
    export default {
        data() {
            return {
				refresherEnabled: true,
				keyboardHeight: 0,
				goodsHotTags: ['可刀', '九成新', '几天前买的', '书上含笔记'],
				goodsSelfTags: ['可刀', '九成新', '几天前买的', '书上含笔记', '可刀', '九成新', '几天前买的', '书上含笔记', '可刀', '九成新', '几天前买的', '书上含笔记', '可刀', '九成新', '几天前买的', '书上含笔记', '可刀', '九成新', '几天前买的', '书上含笔记'],
				goodsInfo: {
					goods_main_image: '', // 商品主图
					goods_img: [], // 商品图片
					goods_title: '蓝牙耳机', // 商品标题
					goods_price: 20, // 商品价格
					goods_tags: ['可刀'], // 商品标签
					goods_desc: '', // 商品描述
				},
				goodsPriceItem: {
					item: 0,
					open: false,
				},
				goodsTagsItem: {
					item: [],
					open: false,
					newTag: '',
				},
				goodsDescItem: {
					item: '',
					open: false,
				},
				goodsImgsItem: {
					main_img: '',
					other_imgs: [],
					open: false,
				},
				messageConfig: {
					open: false,
					type: 'success',
					message: ''
				},
				isLoading: false,
			}
        },
		computed: {
			goodsAllImgs() {
				const goodsInfo = this.goodsInfo
				const mainImg = goodsInfo.goods_main_image
				const validMainImgSrc = mainImg.length !== 0
				const imgs = JSON.parse(JSON.stringify(goodsInfo.goods_img))
				imgs.push(mainImg)
				return imgs
			}
		},
		methods: {
			inputFocus(e) {
				this.keyboardHeight = e.detail.height
			},
			inputBlur() {
				this.keyboardHeight = 0
			},
			textareaFocus(e) {
				this.keyboardHeight = 120
			},
			goodsPriceConfirm() {
				this.goodsInfo.goods_price = parseFloat(this.goodsPriceItem.item)
				this.goodsPriceItem.open = false
			},
			goodsTagsConfirm() {
				this.goodsInfo.goods_tags = JSON.parse(JSON.stringify(this.goodsTagsItem.item))
				this.goodsTagsItem.open = false
			},
			goodsDescConfirm() {
				this.goodsInfo.goods_desc = this.goodsDescItem.item
				this.goodsDescItem.open = false
			},
			goodsImgsConfirm() {
				this.goodsInfo.goods_main_image = this.goodsImgsItem.main_img
				this.goodsInfo.goods_img = JSON.parse(JSON.stringify(this.goodsImgsItem.other_imgs))
				this.goodsImgsItem.open = false
			},
			handleTagClick(tag) {
				const item = this.goodsTagsItem.item
				const tagIndex = item.indexOf(tag)
				const isContain = tagIndex !== -1
				if(isContain) {
					item.splice(tagIndex, 1)
				} else {
					item.push(tag)
				}
			},
			handleTagRemove(tag) {
				const item = this.goodsTagsItem.item
				const tagIndex = item.indexOf(tag)
				const isContain = tagIndex !== -1
				if(isContain) {
					item.splice(tagIndex, 1)
				}
			},
			addNewTag() {
				const newTag = this.goodsTagsItem.newTag
				if(!newTag) return
				this.goodsHotTags.push(newTag)
				this.goodsTagsItem.newTag = ''
			},
			chooseImgs() {
				uni.chooseImage({
					count: 7, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						// res.tempFilePaths
						[this.goodsImgsItem.main_img, ...this.goodsImgsItem.other_imgs] = res.tempFilePaths
					}
				})
			},
			previewImgs(src) {
				const validSrc = src != null && src.length != 0
				if(!validSrc) return
				uni.previewImage({
					urls: [this.goodsImgsItem.main_img, ...this.goodsImgsItem.other_imgs],
					current: src
				});
			},
			async uploadImages(...imgList) {
				const len = imgList.length
				for(let i=0;i<len;++i) {
					let img
					if(i === 0) {
						// main_image
						img = this.goodsInfo.goods_main_image
					} else {
						// other_images
						img = this.goodsInfo.goods_img[i-1]
					}
					const hasUpload = img.startsWith(Host)
					console.log(img, hasUpload)
					if(hasUpload) {
						continue
					}
					const { res } = await uniFileUploader(image_upload_api, img, 1002)
					img = res.data.data.path
					if(i === 0) {
						// main_image
						this.goodsInfo.goods_main_image = img
					} else {
						// other_images
						this.goodsInfo.goods_img[i-1] = img
					}
				}
			},
			goodsInfoValidator() {
				let err = '';
				const is_main_img_exist = this.goodsImgsItem.main_img
				!is_main_img_exist && (err += '商品主图')
				const requiredFields = ['goods_title', 'goods_price']
				const requiredFieldsHans = ['商品标题', '商品价格']
				return err+validator(this.goodsInfo, requiredFields, requiredFieldsHans)
			},
			async addToShop() {
				if(this.isLoading) return
				this.isLoading = true
				const valid_err = this.goodsInfoValidator()
				
				if(valid_err) {
					this.messageOpen(valid_err+'不能为空', 'danger')
					this.isLoading = false
					return
				}
				try {
					await this.uploadImages(this.goodsImgsItem.main_img, ...this.goodsImgsItem.other_imgs)
					const [res, err] = await httpPost(goodsView_api, {
						...this.goodsInfo,
					}, 2011)
					this.isLoading = false
					if(err) {
						this.messageOpen(err, 'danger')
						return
					}
					this.messageOpen('商品上架成功')
					uni.redirectTo({
						url: '/pages/index/index'
					})
				} catch(e) {
					this.isLoading = false
					this.messageOpen('网络错误', 'danger')
				}
			},
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
		},
    }
</script>

<style lang="scss" scoped>
	.ncu-goods-upload {
		padding: 20px 0;
		background-color: var(--main-bg-color);
		
		[class*=cuIcon-] {
			margin-right: 5px;
		}
		
		&__imgs-upload {
			
		}
		
		&__imgs {
			.img {
				width: 60px;
				height: 60px;
				margin: 0 auto;
				display: block;
			}
		}
		
		&__main-img {
			
		}
		
		&__other-imgs {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
		}
		
	}
	.tag-chosen {
		padding-bottom: 10px;
		border-bottom: 1px solid var(--interval-line-color);
	}
	.tag-choose {
		max-height: 60vh;
		overflow: auto;
	}
	.ncu-goods-tags {
		height: 60px;
		display: flex;
		flex-wrap: wrap;
		max-height: 12vh;
		overflow: auto;
		
		&.self {
			font-size: 1rem;
			margin-bottom: 10px;
		}
		&.hot {
			height: 80px;
		}
	}
	.ncu-goods-new-tag {
		display: flex;
		align-items: center;
	}
	.small-img {
		width: 15px;
		height: 15px;
		margin-right: 2px;
	}
	.valid-send-btn {
		width: 40px;
		position: absolute;
		top: 0;
		height: 100%;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 10px;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		z-index: 10;
	}
</style>


