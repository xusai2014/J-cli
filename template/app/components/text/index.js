/**
 * Text 组件封装
 * 	兼容处理；
 * 	便捷属性；
 */
import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import BaseComponent from '../utils/BaseComponent'

export default class SxpText extends BaseComponent {
	static propTypes = {
		...Text.propTypes,
		type: PropTypes.string,
		align: PropTypes.string,
	};

	static defaultProps = {
		type: null,
		allowFontScaling: false,
		align: 'left',
	};

	static textDefaultStyle = {
		fontSize: 13,
		color: '#333',
	};

	/**
	 * 获取默认样式
	 * @return {Object} 样式对象
	 */
	_getTextStyle = () => {
		const { align, type, style } = this.props;
		const { style: typeStyle } = SxpText.getTypeProps()[type] || {};
		const _textStyles = {
			backgroundColor: 'transparent',
			includeFontPadding: false,
			textAlign: align,
		};

		return [
			SxpText.textDefaultStyle,
			typeStyle,
			_textStyles,
			style
		];
	}

	render() {
		const { style, type } = this.props;
		const typeProps = SxpText.getTypeProps()[type];

		return (
			<Text
				{...(typeProps || {})}
				{...this.props}
				style={this._getTextStyle()}
			/>
		);
	}
}