/*
* 功能：fetch请求，获取数据
* */
export default {
	getFetch(url) {
		return fetch(url).then(res => {
			if (res.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' + res.status)
				return
			}
			return res.json()
		})
	}
}