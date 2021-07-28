

export const throttle = (fn, wait, immediate) => {
	let timer, timeStamp=0;
	let context, args;
	let run = () => {
		timer=setTimeout(()=>{
			if(!immediate){
				fn.apply(context,args);
			}
			clearTimeout(timer);
			timer=null;
		},wait);
	}
 
	return function () {
		context=this;
		args=arguments;
		if(!timer){
			if(immediate){
				fn.apply(context,args);
			}
			run();
		}
	}
 
}

// 增加前缘触发功能
export const debounce = (fn, wait, immediate=false) => {
	let timer, startTimeStamp=0;
	let context, args;
 
	let run = (timerInterval)=>{
		timer= setTimeout(()=>{
			let now = (new Date()).getTime();
			let interval=now-startTimeStamp
			if(interval<timerInterval){ // the timer start time has been reset，so the interval is less than timerInterval
				startTimeStamp=now;
				run(wait-interval);  // reset timer for left time 
			}else{
				if(!immediate){
					fn.apply(context,args);
				}
				clearTimeout(timer);
				timer=null;
			}
			
		},timerInterval);
	}
 
	return function(){
		context=this;
		args=arguments;
		let now = (new Date()).getTime();
		startTimeStamp=now; // set timer start time
 
		if(!timer){
			if(immediate) {
				fn.apply(context,args);
			}
			run(wait);    // last timer alreay executed, set a new timer
		}
	}
 
}

/**
 * @param{String} time: 给出的时间 -> 2020-11-18 11:58:00
 */
export const timeFormat = (time) => {
	const curTime = new Date()
	time = new Date(time)
	
	const curYear = curTime.getFullYear()
		, curMouth = curTime.getMonth()+1
		, curDay = curTime.getDate()
		, curMinute = curTime.getMinutes()
		, year = time.getFullYear()
		, month = time.getMonth()+1
		, day = time.getDate()
		, minute = time.getMinutes()
	// 获取相差的时间戳
	const timeDelta = curTime - time
	
	// 单位时间
	const SECOND_UNIT = 1000
		, MINUTE_UNIT = SECOND_UNIT * 60
		, HOUR_UNIT = MINUTE_UNIT * 60
		, DAY_UNIT = HOUR_UNIT * 24
	
	// 1 分钟以内，返回 刚刚
	if(timeDelta < MINUTE_UNIT) {
		return "刚刚"
	}
	// 60 分钟以内，返回 xx 分钟前
	const minuteDelta = Math.ceil(timeDelta / MINUTE_UNIT)
	if(minuteDelta < 60) {
		return `${minuteDelta}分钟前`
	}
	// 24 小时以内，返回 xx 小时前
	const hourDelta = Math.ceil(timeDelta / HOUR_UNIT)
	if(hourDelta < 24) {
		return `${hourDelta}小时前`
	}
	const dayDelta = parseInt(timeDelta / DAY_UNIT)
	// 昨天，返回 昨天
	if(dayDelta === 1) {
		return "昨天"
	}
	// 前天，返回 前天
	if(dayDelta === 2) {
		return "前天"
	}
	// 其余情况，返回 xxxx.xx.xx 年月日顺序
	const formatTime = `${year}.${month}.${day}`
	return formatTime;
}


export const getFileInfo = (filePath) => {
	if(!filePath) return
	return new Promise((resolve, reject) => {
		uni.getFileInfo({
			filePath,
			success(res) {
				resolve(res)
			},
			fail(e) {
				reject(e)
			},
		})
	})
}


export const validator = (obj, requiredFields, requiredFieldsHans) => {
	const fieldsLen = requiredFields.length
	let err = '';
	for(let i=0;i<fieldsLen;++i) {
		const field = requiredFields[i]
		if(!obj[field]) {
			err += `${requiredFieldsHans 
				? requiredFieldsHans[i] 
				: requiredFields[i]} & `
		}
	}
	err = err.slice(0, err.length-2)
	return err
}


export const sleep = (time) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, time)
	})
}

// 驼峰转中线
export const toLine = (name) => {
  return name.replace(/([A-Z])/g,"-$1").toLowerCase();
}

export const cssObjectToString = style => {
	let results = []
	Object.keys(style).forEach(key => {
		const newKey = toLine(key)
		results.push(`${newKey}:${style[key]}`)
	})
	return results.join(';')
}
