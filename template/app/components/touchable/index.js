import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';

export default class SxpTouchableOpacity extends Component {
	static defaultProps = {
		onPress: () => {},   // 点击事件
		interval: 1500,		 // 点击间隔时间
		disabled: false,     // 是否禁用
		activeOpacity: 0.65, // 点击时的透明度
	}

	/* 延迟点击的时间戳 */
	prePressTime = 0

	/**
	 * 点击事件
	 * @return {undefined}
	 */
	_onPress = () => {
		const { disabled, interval, onPress } = this.props;
		const now = Date.now();

		if(disabled) return;

		if(interval > 0 || this.prePressTime > 0) {
			if(now - this.prePressTime > interval) {
				this.prePressTime = now;
				onPress();
			}
		} else {
			onPress();
		}
	}

	render() {
		const { onPress, ...otherProps } = this.props;

		return (
			<TouchableOpacity
				{...otherProps}
				onPress={this._onPress}
			/>
		);
	}
}