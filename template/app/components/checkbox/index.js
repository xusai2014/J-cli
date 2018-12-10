/**
 * 单选、多选
 */
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { px } from '../screen-utils';
import theme from '../theme';
import Icon from '../icon';
import Text from '../text';
import { IconPropTypes, getIconElement } from '../utils/iconUtils';

class CheckBox extends Component {
	static propTypes = {
		/* 是否选中 */
		checked: PropTypes.bool,
		/* 是否禁用 */
		disabled: PropTypes.bool,
		/* 选中或取消时的回调 */
		onChange: PropTypes.func,
		/* 容器样式 */
		style: ViewPropTypes.style,
		/* 选中时的图标，可以是元素或者Icon组件的props对象 */
		checkedIcon: IconPropTypes,
		/* 未选中时的图标，可以是元素或者Icon组件的props对象 */
		uncheckedIcon: IconPropTypes,
		/* 图标颜色 */
		color: PropTypes.string,
		/* 文字信息 */
		label: PropTypes.string,
		/* 文字信息样式 */
		labelStyle: Text.propTypes.style,
		/* 图标是否显示在右边 */
		rightIcon: PropTypes.bool,
	};

	static defaultProps = {
		checked: false,
		onChange: () => {},
		checkedIcon: 'md-checkmark-circle',
		uncheckedIcon: 'md-radio-button-off',
		color: theme.themeColor,
		rightIcon: false,
	}

	/**
	 * 改变选中状态
	 * @return {undefined}
	 */
	checkChange = () => {
		this.props.onChange(!this.props.checked);
	}

	/**
	 * 渲染图标元素
	 * @return {Element} 图标元素
	 */
	renderIcon = () => {
		const {
			checked,
			checkedIcon,
			uncheckedIcon,
			color,
			rightIcon,
		} = this.props;

		return getIconElement(checked ? checkedIcon : uncheckedIcon, color);
	}

	/**
	 * 渲染 label 元素
	 * @return {Element}  label 元素
	 */
	renderLabel = () => {
		const {
			label,
			labelStyle,
			rightIcon,
		} = this.props;

		return label && (
			<Text style={[
				{marginHorizontal: px(8)},
				labelStyle && labelStyle
			]}>
				{label}
			</Text>
		);
	}

	render() {
		const {
			checked,
			style,
			disabled,
			checkedIcon,
			uncheckedIcon,
			color,
			label,
			labelStyle,
			rightIcon,
		} = this.props;

		return (
			<TouchableOpacity
				onPress={this.checkChange}
				style={[
					{
						opacity: disabled ? 0.6 : 1,
						flexDirection: 'row',
						alignItems: 'center'
					},
					style
				]}
				disabled={disabled}
			>
				{rightIcon ? this.renderLabel() : this.renderIcon() }
				{rightIcon ? this.renderIcon() : this.renderLabel() }
			</TouchableOpacity>
		);
	}
}

CheckBox.setTypeProps = options => {
	CheckBox.defaultProps = {
		...CheckBox.defaultProps,
		...options
	}
};

export default CheckBox;