import React, { Component } from 'react';
import { View, StyleSheet, ViewPropTypes, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import ScreenUtils from '../screen-utils';
import Text from '../text';
import TouchableOpacity from '../touchable';
import Theme from '../theme';
import Icon from '../icon';
import styles from './styles';
import { IconPropTypes, getIconElement } from '../utils/iconUtils';

const { px } = ScreenUtils;

export default class Button extends Component {
	static propTypes = {
		/* 样式 */
		style: ViewPropTypes.style,
		/* 按钮文字样式 */
		textStyle: ViewPropTypes.style,
		/* 按钮事件方法 */
		onPress: PropTypes.func,
		/* 是否禁用按钮 */
		disabled: PropTypes.bool,
		/* 点击按钮时的透明度 */
		activeOpacity: PropTypes.number,
		/* 主题颜色 */
		themeColor: PropTypes.string,
		/* 是否显示透明背景 */
		ghost: PropTypes.bool,
		/* 按钮图标，可以是元素或者Icon组件的props对象 */
		icon: IconPropTypes,
		/* 图标是否显示在按钮右边 */
		iconRight: PropTypes.bool,
		/* 圆角值 */
		borderRadius: PropTypes.number,
		/* 背景元素 */
		backgroundElement: PropTypes.element,
		/* 按钮文字 */
		label: PropTypes.string,
	};

	static defaultProps = {
		style: {},
		textStyle: {},
		onPress: () => {},
		disabled: false,
		activeOpacity: 0.7,
		themeColor: Theme.themeColor,
		ghost: false,
		icon: undefined,
		iconRight: false,
		borderRadius: px(12),
		backgroundElement: null,
	}

	/**
	 * 按钮容器样式
	 * @return {Array} 样式数组
	 */
	_getButtonViewStyle = () => {
		const { ghost, disabled, activeOpacity, themeColor, borderRadius } = this.props;

		const _style = {
			opacity: disabled ? activeOpacity : 1,
			backgroundColor: ghost ? 'transparent' : themeColor,
			borderColor: themeColor,
			borderWidth: 1,
			borderRadius
		};

		return _style;
	}

	/**
	 * 文字及图标颜色
	 * @return {String} 颜色
	 */
	_getColor = () => {
		const { ghost, themeColor } = this.props;
		return ghost ? themeColor : '#fff';
	}

	/**
	 * 按钮文字样式
	 * @return {Array} 样式数组
	 */
	_getButtonTextStyle = () => {
		const { ghost, themeColor, textStyle } = this.props;

		const _style = {
			color: this._getColor(),
		}

		return [styles.buttonText, _style, textStyle];
	}

	_getLoading = () => {
		const { loading } = this.props;

		return loading && (
			<ActivityIndicator animating={true} color={this._getColor()}/>
		);
	}

	render() {
		const {
			children,
			textStyle,
			disabled,
			onPress,
			activeOpacity,
			interval,
			icon,
			style,
			borderRadius,
			iconRight,
			label
		} = this.props;

		const _icon = getIconElement(icon, this._getColor());

		return (
			<TouchableOpacity
				style={[styles.buttonView, style]}
				onPress={onPress}
				activeOpacity={disabled ? 1 : activeOpacity}
				interval={interval}
				disabled={disabled}
			>
				<View style={[styles.buttonBody, this._getButtonViewStyle()]}>
					{this._getLoading()}
					{ iconRight || _icon }
					<Text style={this._getButtonTextStyle()}>{children || label}</Text>
					{ iconRight && _icon }
				</View>
			</TouchableOpacity>
		);
	}
}
