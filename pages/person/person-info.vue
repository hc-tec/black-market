<template>
	<div class="person-info">
		<ncu-custom-header
			:isBack="true"
			title="个人信息"
			style="width: 100%;">
		</ncu-custom-header>
		<div class="person-info-items">
			<ncu-settings-item
				label="头像" 
				arrow
				:index="1"
				@click="avatarItem.open=true">
				<ncu-avatar 
					:src="GlobalData.userInfo.avatar"
					size="mini">
				</ncu-avatar>
			</ncu-settings-item>
			<ncu-settings-item 
				label="用户名" 
				arrow
				:index="2"
				@click="userNameItem.open=true">
				{{ GlobalData.userInfo.user_name }}
			</ncu-settings-item>
			<ncu-settings-item
				label="学号" 
				arrow
				:index="3"
				@click="studentIdItem.open=true">
				{{ GlobalData.userInfo.student_id }}
			</ncu-settings-item>
			<ncu-settings-item
				label="密码" 
				arrow
				:index="4"
				@click="passwordItemActivate">
				******
			</ncu-settings-item>
			<ncu-settings-item
				label="QQ" 
				arrow
				:index="5"
				@click="qqItemActivate">
				{{ GlobalData.userInfo.qq }}
			</ncu-settings-item>
			<ncu-settings-item
				label="所属校区" 
				arrow
				:index="6"
				@click="schoolZoneItem.open=true">
				{{ GlobalData.userInfo.school_zone }}
			</ncu-settings-item>
			<ncu-settings-item
				label="个人简介" 
				arrow
				:index="7"
				@click="profileItem.open=true">
				{{ GlobalData.userInfo.profile }}
			</ncu-settings-item>
		</div>
		<ncu-icon-popup
			:open="avatarItem.open"
			:items="avatarItem.avatarPopupItems"
			:needConfirmBtn="false"
			@click="avatarPopupItemClick"
			@cancel="avatarItem.open=false"
			@layer-click="avatarItem.open=false">
		</ncu-icon-popup>
		
		<ncu-popup-confirm-modal
			title="请输入用户名"
			:open="userNameItem.open"
			:keyboardHeight="keyboardHeight"
			@confirm="userNameModifyConfirm"
			@cancel="userNameItem.open=false"
			@layer-click="userNameItem.open=false">
			<light-input 
				v-model="userNameItem.user_name"
				@focus="inputFocus"
				@blur="inputBlur">
			</light-input>
		</ncu-popup-confirm-modal>
		
		<ncu-popup-confirm-modal
			title="请输入学号"
			:open="studentIdItem.open"
			:keyboardHeight="keyboardHeight"
			@confirm="StudentIdModifyConfirm"
			@cancel="studentIdItem.open=false"
			@layer-click="studentIdItem.open=false">
			<light-input 
				v-model="studentIdItem.student_id"
				@focus="inputFocus"
				@blur="inputBlur">
			</light-input>
		</ncu-popup-confirm-modal>
		
		<ncu-popup-confirm-modal
			title="请输入修改密码"
			cancelBtnText="返回"
			:open="passwordItem.open"
			:keyboardHeight="keyboardHeight"
			@confirm="passwordModifyConfirm"
			@cancel="passwordModifyCancel"
			@layer-click="passwordItem.open=false">
			<light-input 
				v-model="passwordItem.password"
				@focus="inputFocus"
				@blur="inputBlur">
			</light-input>
		</ncu-popup-confirm-modal>
		
		<ncu-popup-confirm-modal
			title="验证码"
			:open="passwordValidCodeItem.open"
			:keyboardHeight="keyboardHeight"
			@confirm="passwordValidCodeModifyConfirm"
			@cancel="passwordValidCodeItem.open=false"
			@layer-click="passwordValidCodeItem.open=false">
			<div class="valid-code-wrapper">
				<v-valid-input
					style="width: 100%;"
					ref="passwordValidCodeInput"
					input-type="light-input"
					v-model="passwordValidCodeItem.validCode"
					@send="passwordSendValidCode"
					@focus="inputFocus"
					@blur="inputBlur">
				</v-valid-input>
				<!-- <light-input 
					v-model="passwordValidCodeItem.validCode"
					style="width: 80%;margin-right: 10px;"
					@focus="inputFocus"
					@blur="inputBlur">
				</light-input>
				<ncu-button 
					size="mini" 
					bgColor="blue"
					hollowOut
					:radius="false"
					@click="passwordSendValidCode">
					{{ passwordValidCodeItem.btnText }}
				</ncu-button> -->
			</div>
		</ncu-popup-confirm-modal>
		
		<ncu-popup-confirm-modal
			title="请输入QQ"
			cancelBtnText="返回"
			:open="qqItem.open"
			:keyboardHeight="keyboardHeight"
			@confirm="qqModifyConfirm"
			@cancel="qqModifyCancel"
			@layer-click="qqItem.open=false">
			<light-input 
				v-model="qqItem.qq"
				@focus="inputFocus"
				@blur="inputBlur">
			</light-input>
		</ncu-popup-confirm-modal>
		
		<ncu-popup-confirm-modal
			title="验证码"
			:open="qqValidCodeItem.open"
			:keyboardHeight="keyboardHeight"
			@confirm="qqValidCodeModifyConfirm"
			@cancel="qqValidCodeItem.open=false"
			@layer-click="qqValidCodeItem.open=false">
			<div class="valid-code-wrapper">
				<v-valid-input
					style="width: 100%;"
					ref="qqValidCodeInput"
					input-type="light-input"
					v-model="qqValidCodeItem.validCode"
					@send="qqSendValidCode"
					@focus="inputFocus"
					@blur="inputBlur">
				</v-valid-input>
				<!-- <light-input 
					v-model="qqValidCodeItem.validCode"
					style="width: 80%;margin-right: 10px;"
					@focus="inputFocus"
					@blur="inputBlur">
				</light-input>
				<ncu-button 
					size="mini" 
					bgColor="blue"
					hollowOut
					:radius="false"
					@click="qqSendValidCode">
					{{ qqValidCodeItem.btnText }}
				</ncu-button> -->
			</div>
		</ncu-popup-confirm-modal>
		
		<ncu-popup-select 
			v-model="schoolZoneItem.school_zone"
			title="选择校区"
			:open="schoolZoneItem.open"
			:items="schoolZones"
			@confirm="schoolZoneModifyConfirm"
			@cancel="schoolZoneItem.open=false"
			@layer-click="schoolZoneItem.open=false">
		</ncu-popup-select>
		
		<ncu-popup-confirm-modal
			title="请输入个人简介"
			:open="profileItem.open"
			:keyboardHeight="keyboardHeight"
			@confirm="profileModifyConfirm"
			@cancel="profileItem.open=false"
			@layer-click="profileItem.open=false">
			<light-input 
				type="textarea"
				v-model="profileItem.profile"
				@focus="textareaFocus"
				@blur="inputBlur">
			</light-input>
		</ncu-popup-confirm-modal>
		
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
	import  GlobalData from '../../common/global.js'
	import { schoolZones } from '../../common/config.js'
	import { httpGet, httpPut, httpPost, uniFileUploader } from '../../common/http.js'
	import { getCode_api, image_upload_api, qqModify_api, avatarModify_api, 
			 passwordModify_api, userNameModify_api, studentIdModify_api, 
			 schoolZoneModify_api, profileModify_api } from '../../common/api.js'
    export default {
        data() {
            return {
				GlobalData: GlobalData,
				schoolZones: schoolZones,
				keyboardHeight: 0,
				avatarItem: {
					avatar: '',
					open: false,
					avatarPopupItems: [
						{
							icon: 'pic',
							label: '相册'
						}
					]
				},
				userNameItem: {
					user_name: '',
					open: false,
				},
				studentIdItem: {
					student_id: '',
					open: false,
				},
				passwordItem: {
					password: '',
					open: false,
				},
				passwordValidCodeItem: {
					validCode: '',
					open: false
				},
				qqItem: {
					qq: '',
					open: false,
				},
				qqValidCodeItem: {
					validCode: '',
					open: false
				},
				schoolZoneItem: {
					school_zone: 0,
					open: false
				},
				profileItem: {
					profile: '',
					open: false
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
			textareaFocus(e) {
				this.keyboardHeight = 120
			},
			inputFocus(e) {
				this.keyboardHeight = e.detail.height
			},
			inputBlur() {
				this.keyboardHeight = 0
			},
			async handleAvatarUpload(imgPath) {
				const {res, err} = await uniFileUploader(image_upload_api, 
												imgPath,
												1002)
				if(err) {
					this.messageOpen(err, 'danger')
					return
				}
				return res
			},
			async avatarPopupItemClick(index) {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: async (res) => {
						this.isLoading = true
						const avatar_res = await this.handleAvatarUpload(res.tempFilePaths[0])
						this.isLoading = false
						if(!avatar_res) return
						const changeImg = avatar_res.data.data.path
						const [_, err] = await httpPut(avatarModify_api, {
							avatar: changeImg
						}, 2004)
						this.isLoading = false
						if(err) {
							this.messageOpen(err, 'danger')
							return
						}
						GlobalData.userInfo.avatar = avatar_res.data.data.path
						// this.avatarItem.avatar = res.tempFilePaths
						this.avatarItem.open = false
						this.messageOpen('头像修改成功')
					}
				})
			},
			passwordItemActivate() {
				const isValidate = 
					this.passwordValidCodeItem.validCode
				if(!isValidate) {
					this.passwordValidCodeItem.open = true
				} else {
					this.passwordItem.open = true
				}
			},
			qqItemActivate() {
				const isValidate = 
					this.qqValidCodeItem.validCode
				if(!isValidate) {
					this.qqValidCodeItem.open = true
				} else {
					this.qqItem.open = true
				}
			},
			async passwordSendValidCode() {
				this.isLoading = true
				const [res, err] = await httpGet(getCode_api,{},2006)
				this.isLoading = false
				if(err) {
					this.messageOpen(err, 'danger')
				} else {
					this.$refs.passwordValidCodeInput.send()
					this.messageOpen('验证码发送成功')
				}
			},
			async qqSendValidCode() {
				this.isLoading = true
				const [res, err] = await httpGet(getCode_api,{},2006)
				this.isLoading = false
				if(err) {
					this.messageOpen(err, 'danger')
				} else {
					this.$refs.qqValidCodeInput.send()
					this.messageOpen('验证码发送成功')
				}
			},
			passwordValidCodeModifyConfirm() {
				const isValidate =
					this.passwordValidCodeItem.validCode
				if(!isValidate) {
					this.messageOpen('验证码不能为空', 'danger')
				} else {
					this.passwordValidCodeItem.open = false
					this.passwordItem.open = true
				}
			},
			qqValidCodeModifyConfirm() {
				const isValidate =
					this.qqValidCodeItem.validCode
				if(!isValidate) {
					this.messageOpen('验证码不能为空', 'danger')
				} else {
					this.qqValidCodeItem.open = false
					this.qqItem.open = true
				}
			},
			async userNameModifyConfirm() {
				const isValid = this.userNameItem.user_name
				if(!isValid) return
				this.isLoading = true
				const [res, err] = await httpPut(userNameModify_api, {
					user_name: this.userNameItem.user_name
				}, 2005)
				this.isLoading = false
				if(err) {
					this.messageOpen(err, 'danger')
					return
				}
				this.messageOpen('用户名修改成功')
				this.userNameItem.open = false
				GlobalData.userInfo.user_name = this.userNameItem.user_name
			},
			async StudentIdModifyConfirm() {
				const isValid = this.studentIdItem.student_id
				if(!isValid) return
				this.isLoading = true
				const [res, err] = await httpPut(studentIdModify_api, {
					student_id: this.studentIdItem.student_id
				}, 2022)
				this.isLoading = false
				if(err) {
					this.messageOpen(err, 'danger')
					return
				}
				this.messageOpen('学号修改成功')
				this.studentIdItem.open = false
				GlobalData.userInfo.student_id = this.studentIdItem.student_id
			},
			passwordModifyCancel() {
				this.passwordItem.open = false
				this.passwordValidCodeItem.open = true
			},
			async passwordModifyConfirm() {
				const isValid = this.passwordItem.password
				if(!isValid) return
				this.isLoading = true
				const [res, err] = await httpPut(passwordModify_api, {
					password: this.passwordItem.password,
					ver_code: this.passwordValidCodeItem.validCode
				}, 2007)
				this.isLoading = false
				if(err) {
					this.messageOpen(err, 'danger')
					return
				}
				this.messageOpen('密码修改成功')
				this.passwordItem.open = false
			},
			qqModifyCancel() {
				this.qqItem.open = false
				this.qqValidCodeItem.open = true
			},
			async qqModifyConfirm() {
				const isValid = this.qqItem.qq
				if(!isValid) return
				this.isLoading = true
				const [res, err] = await httpPut(qqModify_api, {
					qq: this.qqItem.qq,
					ver_code: this.qqValidCodeItem.validCode
				}, 2008)
				this.isLoading = false
				if(err) {
					this.messageOpen(err, 'danger')
					return
				}
				this.messageOpen('QQ修改成功')
				GlobalData.userInfo.qq = this.qqItem.qq
				this.qqItem.open = false
			},
			async schoolZoneModifyConfirm() {
				const isValid = this.schoolZoneItem.school_zone
				if(!isValid) return
				this.isLoading = true
				const [res, err] = await httpPut(schoolZoneModify_api, {
					school_zone: this.schoolZoneItem.school_zone
				}, 2023)
				this.isLoading = false
				if(err) {
					this.messageOpen(err, 'danger')
					return
				}
				this.messageOpen('所属校区修改成功')
				this.schoolZoneItem.open = false
				GlobalData.userInfo.school_zone = schoolZones[this.schoolZoneItem.school_zone-1].label
			},
			async profileModifyConfirm() {
				const isValid = this.profileItem.profile
				if(!isValid) return
				this.isLoading = true
				const [res, err] = await httpPut(profileModify_api, {
					profile: this.profileItem.profile
				}, 2024)
				this.isLoading = false
				if(err) {
					this.messageOpen(err, 'danger')
					return
				}
				this.messageOpen('简介修改成功')
				this.profileItem.open = false
				GlobalData.userInfo.profile = this.profileItem.profile
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
		}
    }
</script>


<style lang="scss" scoped>
	
	.avatar-popup {
		
	}
	.valid-code-wrapper {
		display: flex;
		align-items: center;
	}
</style>



