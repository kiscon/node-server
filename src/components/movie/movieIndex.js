import React from 'react'
import {
	HashRouter as Router,
	Route,
	NavLink
} from 'react-router-dom'
/*
* 打包时报错： Import in body of module; reorder to top import/first
* 解决方案：https://blog.csdn.net/Wu_shuxuan/article/details/78722055
* */
import MovieList from './movieList';
import MovieInfo from './movieInfo';
import '../../assets/css/movie/main.css';

import {Layout, Menu, BackTop} from 'antd';

const {Header, Content, Footer} = Layout;

const Header1 = () => {
	return (
		<Header>
			<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{lineHeight: '64px', fontSize: '16px'}}>
				<Menu.Item key="1"><NavLink to="/movielist/in_theaters">正在热映</NavLink></Menu.Item>
				<Menu.Item key="2"><NavLink to="/movielist/coming_soon">即将上映</NavLink></Menu.Item>
				<Menu.Item key="3"><NavLink to="/movielist/top250">Top250</NavLink></Menu.Item>
			</Menu>
		</Header>
	)
}

export default class MovieIndex extends React.Component {
	componentDidMount() {
		let path = window.location.pathname;
		if (path === '/') {
			window.location.href = '/#/movielist/in_theaters';
		}
	}

	render() {
		return (
			<Router>
				<div>
					<Layout className="layout">
						{/*头部*/}
						<Header1/>
						{/*内容*/}
						<Content style={{padding: '0 50px'}}>
							<div style={{marginTop: '25px', background: '#fff', padding: 24, minHeight: 280}}>
								<div>
									<Route path="/movielist/:type/:page?" component={MovieList}/>
									<Route path="/movieinfo/:id" component={MovieInfo}/>
								</div>
							</div>
						</Content>
						{/*底部*/}
						<Footer style={{textAlign: 'center'}}>
							Ant Design &copy;2018 Created by abc
						</Footer>
					</Layout>
					{/*返回顶部*/}
					<BackTop>
						<div className="ant-back-top-inner">UP</div>
					</BackTop>
				</div>
			</Router>
		)
	}
}

