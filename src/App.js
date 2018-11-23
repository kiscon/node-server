import React, {Component} from 'react';
import MediaQuery from 'react-responsive';

import MovieIndex from './components/movie/movieIndex';
import StoreIndex from './components/store/storeIndex';

import 'antd/dist/antd.css';

class App extends Component {
	componentWillMount() {
		//定义你的逻辑即可11
		console.log("Index - componentWillMount");
	}

	componentDidMount() {
		console.log("Index - componentDidMount");
	}

	render() {
		return (
			<div>
				<MediaQuery query='(min-device-width: 1224px)'>
					<MovieIndex/>
				</MediaQuery>
				<MediaQuery query='(max-device-width: 1224px)'>
					<StoreIndex/>
				</MediaQuery>
			</div>
		);
	}
}

// 脚手架配置
// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc
export default App;
