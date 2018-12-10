import React, { Component, cloneElement, Children } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Entypo from 'react-native-vector-icons/Entypo';

import Text from '../text';
import TouchableOpacity from '../touchable';
import ScreenUtils from '../screen-utils';
import ListItem from './ListItem';
import styles from './styles';

const { px } = ScreenUtils;

export default class List extends Component {
	static defaultProps = {
		renderHeader: undefined,
	};

	static Item = ListItem;

	render() {
		const { renderHeader, children } = this.props;

		return (
			<View>
				{
					renderHeader ?
					<View style={styles.itemChildren}>
						{renderHeader}
					</View> : null
				}
				<View style={styles.listBody}>
					{
						Children.map(children, (item, index) => {
							return cloneElement(item, {
								key: index,
								index,
								length: children.length
							});
						})
					}
				</View>
			</View>
		);
	}
}