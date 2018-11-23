//封装一个正在加载组件
import React from 'react'
import {Spin, Alert} from 'antd'
//es6 封装无状态组件
export default (props) => (
	<Spin tip="Loading...">
		<Alert
			message={props.message}
			description={props.description}
			type="info"
		/>
	</Spin>
)

