/**
 * view 组件封装；
 * 	加入一些便捷属性；
 */
import React, { Component } from 'react';
import { View as RNView, SafeAreaView, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import BaseComponent from '../utils/BaseComponent';
import TouchableOpacity from '../touchable';

export default class View extends BaseComponent {
	static propTypes = {
		/* 是否适配iphoneX */
		useSafeArea: PropTypes.bool,
		/* 占满 flex: 1 */
		flex: PropTypes.bool,
		/* 内容横向排列 */
		row: PropTypes.bool,
		/* 是否换行 */
		wrap: PropTypes.bool,
		/* 是否水平垂直居中 */
		center: PropTypes.bool,
		/* 样式 */
		style: ViewPropTypes.style,
	};

	static defaultProps = {}

	/**
	 * 样式
	 * @return {Array} 样式数组
	 */
	getStyle = () => {
		const { style, flex, row, wrap, center } = this.props;
		const defaultStyle = {
			flex: flex ? 1 : 0,
			flexDirection: row ? 'row' : 'column',
			flexWrap: wrap ? 'wrap' : 'nowrap',
		}

		if(center) {
			defaultStyle.justifyContent = 'center';
			defaultStyle.alignItems = 'center';
		}

		return [defaultStyle, style];
	}

	render() {
		const { useSafeArea, onPress } = this.props;
		const ViewComponent = useSafeArea ? SafeAreaView : RNView;
		let pressProps = {};

		if(onPress) {
			pressProps = {
				onStartShouldSetResponder: () => true,
				onResponderRelease: onPress
			}
		}

		return (
			<ViewComponent
				{...this.props}
				{...pressProps}
				style={this.getStyle()}
			/>
		);
	}
}