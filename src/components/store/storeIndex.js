import React from 'react';
import fetch from '../../api/fetch'

import '../../assets/css/store/store.css'

export default class StoreIndex extends React.Component {
	//初始化
	constructor() {
		super();
		this.state = {
			data: {}
		}
	}

	//第一次渲染结束
	componentDidMount() {
		console.log('获取商品列表');
		fetch.getFetch('/api/productSve/getProducts')
			.then(data => {
				console.log(data)
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		return (
			<div className="shop">
				<div className="shop-info">
					<ul>
						<li>
							<div>我的店铺</div>
							<i className="iconfont icon-arrow-right"></i>
						</li>
						<li>
							<div>店铺详情</div>
							<i className="iconfont icon-arrow-right"></i>
						</li>
						<li>
							<div>店铺商品</div>
							<i className="iconfont icon-arrow-right"></i>
						</li>
					</ul>
				</div>
			</div>
		);
	};
}
