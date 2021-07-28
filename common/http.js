



const validate = (res, code) => {
	// 进行状态码验证
	let err = '';
	if(code) {
		try {
			const isValid = res.data.code === code
			isValid || (err = `${res.data.msg}:「${res.data.error}」`)
		} catch(e) {
			err = e
		}
		
	}
	return [res, err]
}

export const httpGet = async (url, params, code) => {
	let [_, res] = await uni.request({
		url,
		method: 'GET',
		data: params,
		header: {
			'Cookie': uni.getStorageSync('cookie')
		}
	})
	return validate(res, code)
}

export const httpPost = async (url, data, code) => {
	let [_, res] = await uni.request({
		url,
		method: 'POST',
		data,
		header: {
			'Content-Type': 'application/json',
			'Cookie': uni.getStorageSync('cookie'),
		}
	})
	return validate(res, code)
}

export const httpDelete = async (url, params, code) => {
	let [_, res] = await uni.request({
		url,
		method: 'DELETE',
		data: params,
		header: {
			'Cookie': uni.getStorageSync('cookie')
		}
	})
	return validate(res, code)
}

export const httpPut = async (url, data, code) => {
	let [_, res] = await uni.request({
		url,
		method: 'PUT',
		data,
		header: {
			'Content-Type': 'application/json',
			'Cookie': uni.getStorageSync('cookie'),
		}
	})
	return validate(res, code)
}

export const filePost = async (url, data, code) => {
	let [_, res] = await uni.request({
		url,
		method: 'POST',
		data,
		header: {
			'content-type': 'application/json',
			'Cookie': uni.getStorageSync('cookie'),
		},
	})
	return validate(res, code)
}

export const fileUploader = async (url, filePath, code) => {
	const res = await uni.uploadFile({
		url,
		filePath,
		formData: data,
		name: '录音',
		header: {
			'Content-Type': 'multipart/form-data',
			'Cookie': uni.getStorageSync('cookie'),
		}
	})
	return validate(res, code)
	
}

export const uniFileUploader = (url, filePath, code, fileAlias) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: url,
			header: {
				'Cookie': uni.getStorageSync('cookie')
			},
			filePath: filePath,
			name: fileAlias || 'file',
			success: res => {
				res.data = JSON.parse(res.data)
				// 进行状态码验证
				let err = '';
				if(code) {
					const isValid = res.data.code === code
					isValid || (err = `${res.data.msg}:「${res.data.error}」`)
				}
				resolve({
					res, 
					err
				})
			},
			fail: reject,
		})
	})
	
}

