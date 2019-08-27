// 提示信息
const tipConfig = {
	RES_OK: 0,
	RES_Err: -1,
	ok_Txt: 'OK',
	err_Txt: '服务器访问错误！',
	codeErr_Txt: '代码执行出错：',
	userErr_Txt: '找不到用户信息！',
	paramsErr_Txt: '参数错误！',
	$log: (options) => {
		console.log(`${options.title}-参数：`, options.params || {})
		console.log(`${options.title}-错误：`, options.error || null)
		console.log(`${options.title}-结果：`, JSON.stringify(options.result) || null)
	}
}

module.exports = tipConfig

