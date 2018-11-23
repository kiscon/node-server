// 移动端适配方案 flexible
const initScreen  = ()=> {
	(function(window) {
		// 设置html元素的fontSize,
		function setFontSizeRem() {
			var clientWidth = html.getBoundingClientRect().width
			// 针对pad这些超宽屏，限制在540以内，避免被宽度严重拉伸导致难看
			clientWidth / dpr > 540 && (clientWidth = 540 * dpr)
			var cw10 = clientWidth / 10
			html.style.fontSize = cw10 + 'px'
		}
		var timer
		var doc = window.document
		var html = doc.documentElement
		var customMeta = doc.querySelector('meta[name="viewport"]')
		var dpr = 0
		var scale = 0
		if (customMeta) {  // 开发员已经设置了viewport的相关值
			console.warn('请注意：将根据已有的meta标签来设置缩放比例')
			// 获取开发员已经设定的initial-scale
			var customInitialScale = customMeta.getAttribute('content').match(/initial-scale=([\d]+)/)
			if (customInitialScale) {
				scale = parseFloat(customInitialScale[1])
				dpr = parseInt(1 / scale)
			}
		}
		if (!dpr && !scale) {
			var phone = (window.navigator.appVersion.match(/android/gi), window.navigator.appVersion.match(/iphone/gi))
			var windowDpr = window.devicePixelRatio
			dpr = phone ? windowDpr >= 3 && (!dpr || dpr >= 3) ? 3 : windowDpr >= 2 && (!dpr || dpr >= 2) ? 2 : 1 : 1
			scale = 1 / dpr
		}
		html.setAttribute('data-dpr', dpr)
		// 动态设置meta元素
		if (!customMeta) {
			customMeta = doc.createElement('meta')
			customMeta.setAttribute('name', 'viewport')
			customMeta.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
			if (doc.firstElementChild) {
				doc.firstElementChild.appendChild(customMeta)
			} else {
				var div = doc.createElement('div')
				div.appendChild(customMeta)
				doc.write(div.innerHTML)
			}
		}
		// 监听浏览器的缩放（物理尺寸调整）
		window.addEventListener('resize', function() {
			clearTimeout(timer)
			timer = setTimeout(setFontSizeRem, 300)
		}, false)
		// 监听前进、后退、load
		window.addEventListener('pageshow', function(e) {
			if (e.persisted) {
				clearTimeout(timer)
				timer = setTimeout(setFontSizeRem, 300)
			}
		}, false)
		setFontSizeRem()
	})(window)
}

// 去除首尾全部空格
const trim = (string) => {
	return existy(string) ? string.replace(/^\s+|\s+$/ig, '') : ''
}

// 时间格式化
const formatDate = (args) => {
	let {timestamp = 0, fmt = 'yyyy-MM-dd hh:mm:ss'} = {...args}
	var date = new Date(timestamp)
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	}
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + ''
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
		}
	}
	return fmt
}

// 排除null、undefined
const existy = (x) => {
	return x != null
}

// 数值转成带两位小数的过滤器
const toFixed = (value) => {
	if (!value) return 0.00
	return (value / 100 * 1.01 / 1.01).toFixed(2)
}

// 名字第一位转成*过滤器
const nameTransformToStart = (value) => {
	if (!value) return `***`
	let reg = /^([\u4e00-\u9fa5]{1})([\u4e00-\u9fa5]+)/g
	return value.replace(reg, (item, $1, $2) => {
		return `*` + $2
	})
}

export {
	initScreen,
	trim,
	toFixed,
	formatDate,
	existy,
	nameTransformToStart
}