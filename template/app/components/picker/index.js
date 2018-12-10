import React, { Component } from 'react';
import { PickerIOS, Platform } from 'react-native';
import PropTypes from 'prop-types';

import PickerAndroid from './PickerAndroid';
// import PickerAndroid from 'react-native-picker-android';

const Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid;
const PickerItem = Picker.Item;

export default class RncPicker extends Component {
	state = {
		language: 'js'
	}

	static propTypes = {
		data: PropTypes.array.isRequired,
	}

	_renderItem = () => {
		const { data } = this.props;

		return data.map((item, index) => (
			<PickerItem
				key={index}
				label={item.label}
				value={item.value}
			/>
		));
	}

	render() {
		return (
			<Picker
				selectedValue={this.state.language}
				onValueChange={this.props.onChange}>
				{ this._renderItem() }
			</Picker>
		);
	}
}