/**
 * 对 react-native-vector-icons 组件的封装，提高易用性
 */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Zocial from 'react-native-vector-icons/Zocial';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';

const IconTypeMaps = {
	Zocial,
	Octicons,
	MaterialIcons,
	MaterialCommunityIcons,
	Ionicons,
	Foundation,
	EvilIcons,
	Entypo,
	FontAwesome,
	SimpleLineIcons,
	Feather,
};

const Icon = props => {
	const { type, style, ...restProps } = props;
	const IconComps = IconTypeMaps[type];

	return (
		<IconComps
			style={[styles.iconView, style]}
			{...restProps}
		/>
	);
};

Icon.propTypes = {
	type: PropTypes.oneOf([
		'Entypo',
		'EvilIcons',
		'Feather',
		'FontAwesome',
		'Foundation',
		'Ionicons',
		'MaterialCommunityIcons',
		'MaterialIcons',
		'SimpleLineIcons',
		'Octicons',
		'Zocial',
	]),
	name: PropTypes.string.isRequired,
};

Icon.defaultProps = {
	type: 'Ionicons',
	size: 20,
	color: '#000',
};

/**
 * 设置默认属性
 * @param  {Object} options 属性对象
 * @return {undefined}
 */
Icon.setDefaultProps = options => {
	Icon.defaultProps = {
		...Icon.defaultProps,
		...options
	};
};

export default Icon;

const styles = StyleSheet.create({
	iconView: {
		justifyContent: 'center',
		alignItems: 'center',
	}
});