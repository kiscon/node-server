
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

// 驼峰转连字符
const humpToHyphen = (val) => {
	if (typeof val !== 'string') return val;
	return val.replace(/([A-Z])/g, '_$1').toLowerCase();
}

// 连字符转驼峰
const hyphenToHump = (val) => {
	if (typeof val !== 'string') return val;
	return val.replace(/_(\w)/g, function ($0, $1) {
		return $1.toUpperCase();
	});
}

// 随机产生一个唯一的ID
const guid = () => {
	return Number(Math.random().toString().slice(-3) + (new Date().getTime()).toString());
}

let utils = {
	trim,
	toFixed,
	formatDate,
	existy,
	nameTransformToStart,
	humpToHyphen,
	hyphenToHump,
	guid
}

module.exports = utils;