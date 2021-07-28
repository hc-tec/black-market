<template>
	<div class="ncu-forum-upload">
		<ncu-custom-header
			isBack
			title="谈谈心得 & 发布需求"
			style="width: 100%;">
		</ncu-custom-header>
		
		<form>
			<view class="cu-form-group">
				<textarea 
					class="ncu-forum-upload__input"
					v-model="thread.thread_info" 
					placeholder="谈谈心得 & 发布需求"
					:cursor="1"
					focus>
				</textarea>
			</view>
			
			<view class="cu-form-group margin-top padding-top">
				<view class="grid col-4 grid-square flex-sub">
					<view 
						class="bg-img" 
						v-for="(item,index) in thread.thread_images" 
						:key="index" 
						@tap="ViewImage" 
						:data-url="thread.thread_images[index]">
						<image :src="item" mode="aspectFill"></image>
						<view 
							class="cu-tag bg-red" 
							@click.stop="DelImg" 
							:data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
		
			<ncu-button
				class="animate-move-bottom"
				bgImage="blue"
				width="100%" 
				style="width: 90%;margin: 10px auto;display: block;animation-delay: 1s;"
				shadow
				:disabled="isLoading"
				@click="addToForum">
				<span class="cuIcon-upload">
				</span> 发送
			</ncu-button>
			
		</form>
		
		<ncu-message
			:open="messageConfig.open"
			:type="messageConfig.type"
			:message="messageConfig.message"
			@close="messageClose">
		</ncu-message>
		
		<ncu-loading
			:active="isLoading"
			type="bounce-stick">
		</ncu-loading>
		
	</div>
</template>

<script>
	import GlobalData from  '../../common/global.js'
	import { httpPost, uniFileUploader } from '../../common/http.js'
	import { Host, thread_api, image_upload_api } from '../../common/api.js'
	import { validator } from '../../common/func.js'
    export default {
        data() {
            return {
				thread: {
					thread_info: '##',
					thread_topic: '',
					thread_images: []
				},
				messageConfig: {
					open: false,
					type: 'success',
					message: ''
				},
				isLoading: false,
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
			initThread() {
				this.thread = {
					thread_info: '##',
					thread_topic: '',
					thread_images: []
				}
			},
			ChooseImage() {
				uni.chooseImage({
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: (res) => {
						if (this.thread.thread_images.length != 0) {
							this.thread.thread_images = [...this.thread.thread_images, ...res.tempFilePaths]
							
						} else {
							this.thread.thread_images = res.tempFilePaths
						}
					}
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '',
					thread_info: '确定要删除这段回忆吗？',
					cancelText: '还想保留',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.thread.thread_images.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.thread.thread_images,
					current: e.currentTarget.dataset.url
				});
			},
			splitTopic(content) {
				const hasFirstFlag = content.indexOf('#')
				const hasLastFlag = content.slice(hasFirstFlag+1)
									.indexOf('#')
				const hasTopic = [hasFirstFlag, hasLastFlag]
									.indexOf(-1) === -1
				if(hasTopic) {
					const topic = content.split('#')[1]
					if(!topic) {
						this.messageOpen('请加上帖子话题叭', 'danger')
						return ['', '']
					}
					const isValidLen = topic.length <= 15
					if(!isValidLen) {
						this.messageOpen('话题字数不能超出 15', 'danger')
						return ['', '']
					}
					const _content = content.slice(hasLastFlag+2)
					if(!_content) {
						this.messageOpen('主体内容不能为空', 'danger')
						return ['', '']
					}
					return [topic, _content]
				} else {
					this.messageOpen('请加上帖子话题叭', 'danger')
					return ['', '']
				}
			},
			async imagesUpload() {
				const len = this.thread.thread_images.length
				for(let i=0;i<len;++i) {
					const img = this.thread.thread_images[i]
					const hasUpload = img.startsWith(Host)
					if(hasUpload) {
						continue
					}
					const { res } = await uniFileUploader(image_upload_api, 
										img, 1002)
					const upload_img = res.data.data.path
					this.thread.thread_images[i] = upload_img
				}
			},
			async addToForum() {
				if(this.isLoading) return
				this.isLoading = true
				const [topic,content] = this.splitTopic(this.thread.thread_info)
				if(!topic || !content) {
					this.isLoading = false
					return
				}
				try {
					await this.imagesUpload()
					const data = {
						user_id: GlobalData.userInfo.id,
						thread_topic: topic,
						thread_info: content,
						thread_images: this.thread.thread_images,
					}
					const [res, err] = await httpPost(thread_api, data, 2015)
					this.isLoading = false
					if(err) {
						this.messageOpen(err, 'danger')
						return
					}
					this.messageOpen('帖子发布成功惹')
					this.initThread()
				} catch(e) {
					this.isLoading = false
					this.messageOpen('网络错误', 'danger')
				}
			}
		}
    }
</script>

<style lang="scss" scoped>
	.ncu-forum-upload {
		
		&__input {
			font-size: 16px;
			height: 30vh;
		}
	}
</style>


