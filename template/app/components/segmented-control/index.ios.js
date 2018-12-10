import React, { Component } from 'react';
import { View, StyleSheet, ViewPropTypes, SegmentedControlIOS } from 'react-native';

import TouchableOpacity from '../touchable';
import Theme from '../theme';
import propTypes from './PropsType';

export default class SegmentedControl extends Component {
	static propTypes = propTypes;

	static defaultProps = {
		tintColor: Theme.themeColor,
		selectedIndex: 0,
		disabled: false,
	}

	render() {
		const { disabled, ...restProps } = this.props;

		return (
			<SegmentedControlIOS
				{...restProps}
				enabled={!disabled}
			/>
		);
	}
}