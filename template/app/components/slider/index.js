import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, InteractionManager } from 'react-native';

import { px } from '../screen-utils';
import theme from '../theme';

export default class Slider extends Component {
	static defaultProps = {
		style: {},
		minValue: 0,
		maxValue: 0,
		step: 1,
		onChange: () => {},
		onTouchStart: () => {},
		onTouchEnd: () => {},
		paddingHorizontal: 30,
	}

	state = {
		sliderValue: -px(30),
		sliderMeasure: [],
	}

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this._viewRef.measure((...args) => {
				this.setState({
					sliderMeasure: args
				});
			});
		});
	}

	onSliderMove = e => {
		const { minValue, maxValue, onChange, step } = this.props;
		const { sliderMeasure } = this.state;
		const { pageX } = e.nativeEvent;

		let offset = pageX - sliderMeasure[4];

		if(offset < 0) {
			offset = 0;
		} else if(offset > sliderMeasure[2]) {
			offset = sliderMeasure[2];
		}

		const percentage = (offset/sliderMeasure[2]).toFixed(3);
		const valueCount = maxValue - minValue;

		const sliderValue = percentage * valueCount + minValue;

		onChange(Math.round(sliderValue/step) * step);
	}

	getSliderValue = () => {
		const { value, minValue, maxValue } = this.props;
		const { sliderMeasure } = this.state;
		let percentage = (value - minValue)/(maxValue - minValue);

		if(percentage < 0) {
			percentage = 0;
		} else if(percentage > 1) {
			percentage = 1;
		}

		return ((sliderMeasure[2] || 0) * percentage) - px(26);
	}

	onTouchStart = () => {
		this.props.onTouchStart();
	}

	onTouchEnd = () => {
		this.props.onTouchEnd();
	}

	render() {
		const { style, paddingHorizontal } = this.props;
		const sliderValue = this.getSliderValue();

		return (
			<View style={[styles.sliderView, {paddingHorizontal}, style]}>
				<View style={styles.sliderBarView} ref={ref => this._viewRef = ref}>
					<View style={[styles.sliderValueBar, {width: sliderValue + px(30)}]}/>
				</View>
				<View style={[
					StyleSheet.absoluteFill,
					styles.sliderButtonView,
					{paddingHorizontal}
				]}>
					<View
						style={{marginLeft: sliderValue}}
						onStartShouldSetResponder={() => true}
						onResponderMove={this.onSliderMove}
						onResponderStart={this.onTouchStart}
						onResponderRelease={this.onTouchEnd}
						onResponderTerminate={this.onTouchEnd}
					>
						<View style={styles.sliderButtonIcon}/>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	sliderView: {
		height: px(60),
		justifyContent: 'center',
		opacity: 1,
	},
	sliderBarView: {
		height: px(16),
		backgroundColor: '#ccc',
		borderRadius: px(8),
		overflow: 'hidden',
	},
	sliderValueBar: {
		height: px(16),
		backgroundColor: '#4CA6FF',
	},
	sliderButtonView: {
		justifyContent: 'center',
	},
	sliderButtonIcon: {
		width: px(60),
		height: px(60),
		borderRadius: px(30),
		backgroundColor: theme.themeColor,
	}
});