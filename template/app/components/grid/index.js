import React, { Component, cloneElement } from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import View from '../view';
import Text from '../text';
import Carousel from '../carousel';
import styles from './styles';
import { px } from '../screen-utils';
import { IconPropTypes, getIconElement } from '../utils/iconUtils';

export default class Grid extends Component {
	static propTypes = {
		/* 带单数组 */
		data: PropTypes.array.isRequired,
		/* 每一项的渲染函数 */
		renderItem: PropTypes.func,
		/* 是否轮播 */
		isCarousel: PropTypes.bool,
		/* 轮播时的行数 */
		carouselMaxRow: PropTypes.number,
		/* 列数 */
		col: PropTypes.number,
		/* 是否显示边框 */
		hasLine: PropTypes.bool,
		/* 边框颜色 */
		lineColor: PropTypes.string,
		/* 每一项容器样式 */
		itemStyle: ViewPropTypes.style,
		/* 点击事件 */
		onPress: PropTypes.func,
	};

	static defaultProps = {
		col: 4,
		hasLine: true,
		lineColor: '#ddd',
		carouselMaxRow: 2,
	}

	_renderItem = (item, index) => {
		const { onPress } = this.props;

		return (
			<View flex center onPress={() => onPress(item, index)}>
				{ getIconElement(item.icon, '#999') }
				<Text>{item.text}</Text>
			</View>
		);
	}

	/**
	 * 遍历带单列表
	 * @return {Element} 列表元素
	 */
	_renderGridContent = () => {
		const {
			data,
			renderItem,
			itemStyle,
			hasLine,
			lineColor,
			col,
			onPress
		} = this.props;

		const _style = {
			height: px(750/col),
			borderLeftWidth: hasLine ? 1 : 0,
			borderColor: lineColor,
		}

		const _rowStyle = {
			borderBottomWidth: hasLine ? 1 : 0,
			borderRightWidth: hasLine ? 1 : 0,
			borderColor: lineColor,
		}

		const elArray = [];
		const renderItemFun = renderItem || this._renderItem;

		for (let i = 0; i < data.length; i += col) {
			const itemArray = [];

			for (let j = i; j < i + col; j ++) {
				itemArray.push(
					<View
						flex
						key={`key_${j}`}
						style={[_style, itemStyle]}
					>
						{ data[j] && renderItemFun(data[j], j) }
					</View>
				);
			}

			elArray.push(
				<View row key={`key=${i}`} style={_rowStyle}>
					{ itemArray }
				</View>
			);
		}

		return elArray;
	}

	render() {
		const boxStyle = {
			borderTopWidth: this.props.hasLine ? 1 : 0,
			borderColor: this.props.lineColor,
		}

		return (
			<View style={boxStyle}>
				{ this._renderGridContent() }
			</View>
		);
	}
}