import fetchJsonp from 'fetch-jsonp'
//统一的地址
let url = 'https://api.douban.com/v2';

export default {
	//暴露获取电影列表方法
	//type 电影列表类型
	getMovieList(type, page, count) {
		//拼接url https://api.douban.com/v2/movie/in_theaters?page=1
		//获取到start 启示数
		let start = (page - 1) * count;
		let _url = `${url}/movie/${type}?start=${start}&count=${count}`;
		//根据url 发送数据请求
		return fetchJsonp(_url, {timeout: 8000}).then(r => r.json());
	},
	getMovieInfo(id) {
		//拼接url https://api.douban.com/v2/movie/subject/17
		let _url = `${url}/movie/subject/${id}`;
		//根据url 发送数据请求
		return fetchJsonp(_url, {timeout: 8000}).then(r => r.json());
	},
	getSearchInfo(q, page, count) {
		let start = (page - 1) * count;
		let _url = `${url}/movie/search?q=${q}&start=${start}&count=${count}`;
		return fetchJsonp(_url, {timeout: 8000}).then(r => r.json());
	}
}