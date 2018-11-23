import React from 'react'
import {Pagination} from 'antd'

import httpService from '../../api/httpService'
import Loading from './loading'
import '../../assets/css/movie/movielist.css'

//创建电影列表组件
export default class Movielist extends React.Component {
	//初始化
	constructor() {
		super();
		this.state = {
			movieData: {},
			isShow: true, //判断是否显示和隐藏
			pageSize: 10, //默认每页条数
			defaultCurrent: 1, //默认当前页数
			total: 1 //数据总数
		}
	}

	//第一次渲染结束
	componentDidMount() {
		let page = this.props.match.params.page || 1;
		//在进入组件初始化渲染完成以后做请求电影数据
		this.getMovieData(this.props.match.params.type, page, this.state.pageSize);
	}

	//根据锚点的不同切换不同的数据
	componentWillReceiveProps(newprops) {
		console.log(newprops);
		// let page = parseInt(newprops.match.params.page || 1);
		let page = newprops.match.params.page || 1;
		//设置加载页
		this.setState({
			isShow: true
		});
		//获取电影数据
		this.getMovieData(newprops.match.params.type, page, this.state.pageSize);
	}

	//切换页面方法
	changePage(page, pageSize) {
		console.log(page, pageSize);
		this.setState({
			isShow: true,
			defaultCurrent: page,
			pageSize: pageSize
		});
		//获取电影列表数据
		this.getMovieData(this.props.match.params.type, page, pageSize);
	}


	//获取电影列表数据
	getMovieData(type, page, count) {
		httpService.getMovieList(type, page, count)
			.then(data => {
				console.log(data);
				//获取数据将数据显示到页面上
				this.setState({
					movieData: data,
					isShow: false,
					defaultCurrent: page,
					total: data.total
				})
			})
			.catch(err => {
				console.log(err);
			})
	}

	//跳转电影详细页面
	gotoMovieDetail(id) {
		console.log(this.props);
		this.props.history.push(`/movieinfo/${id}`);
	}

	//处理名字
	getNameJoin(datas) {
		let arr = [];
		for (let data of datas) {
			arr.push(data.name);
		}
		return arr.join('、')
	}

	//渲染数据电影列表数据
	renderMovieList(data) {
		return data.map(item => {
			return (
				<div key={item.id} className='list'>
					<div onClick={() => this.gotoMovieDetail(item.id)} className='img-div'>
						<img src={item.images.small} alt="" className='img'/></div>
					<div className='info-div'>
						<h2 className='info-title'>{item.title}</h2>
						<p className='info-genres'>类型：{item.genres.join('、')}</p>
						<p>导演：{this.getNameJoin(item.directors)}</p>
						<p>主演：{this.getNameJoin(item.casts)}</p>
						<p className='info-year'>上映年份：{item.year}</p>
						<p className='info-rating'>评分：{item.rating.average}</p>
					</div>
				</div>
			)
		})
	}

	render() {
		//判断是否显示和隐藏
		if (this.state.isShow) {
			return <Loading message="正在加载" description="数据正在处理中。。。"/>
		} else {
			return (
				<div>
					<div style={{display: 'flex', flexWrap: 'wrap'}}>
						{
							this.renderMovieList(this.state.movieData.subjects)
						}
					</div>
					<div>
						<Pagination showSizeChanger
						            style={{textAlign: 'center'}}
						            onChange={this.changePage.bind(this)}
						            onShowSizeChange={this.changePage.bind(this)}
						            defaultCurrent={this.state.defaultCurrent}
						            total={this.state.total}
						            pageSize={this.state.pageSize}
						/>
					</div>
				</div>

			)
		}

	}
}
