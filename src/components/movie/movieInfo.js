import React from 'react'
import httpService from '../../api/httpService'
import Loading from './loading'

//创建电影列表组件
export default class MovieInfo extends React.Component {
	constructor() {
		super();
		this.state = {
			movieInfo: {},
			isShow: true
		}
	}

	//第一次渲染结束
	componentDidMount() {
		this.getMovieInfo(this.props.match.params.id);
	}

	//获取电影详细信息数据
	getMovieInfo(id) {
		httpService.getMovieInfo(id)
			.then(data => {
				console.log(data);
				this.setState({
					movieInfo: data,
					isShow: false
				})
			})
			.catch(err => {
				console.log(err);
			})
	}

	//渲染数据电影列表数据
	renderMovieInfo(data) {
		return (
			<div>
				<h1 style={{paddingBottom: '20px'}}>{data.title}</h1>
				<img src={data.images.large} alt=""/>
				<p style={{paddingTop: '10px'}}>{data.summary}</p>
			</div>
		)
	}

	render() {
		//判断是否显示和隐藏
		if (this.state.isShow) {
			return <Loading message="正在加载" description="数据正在处理中。。。"/>
		} else {
			return (
				<div>
					{
						this.renderMovieInfo(this.state.movieInfo)
					}
				</div>

			)
		}

	}
}
