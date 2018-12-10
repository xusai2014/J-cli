import React, { Component } from 'react';
import { View, ActionSheetIOS, Platform, Modal, Animated, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';

import topView from '../utils/topView';
import styles from './styles';
import Text from '../text';
import TouchableOpacity from '../touchable';
import { hpx } from '../screen-utils';

class ActionSheetAndroid extends Component {
	static defaultProps = {
		options: [],
		title: null,
		message: null,
	}

	/**
	 * 关闭action窗口
	 * @return {undefined}
	 */
	_closeModal = index => {
		this.props.callback(index);
		this.handleRef.fadeOut(200).then(topView.remove);
		this.handleBodyRef.slideOutDown(200);
	}

	/**
	 * 点击遮罩层
	 * @return {undefined}
	 */
	_onClosePress = () => {
		const { cancelButtonIndex } = this.props;
		if(cancelButtonIndex) {
			this._closeModal(cancelButtonIndex);
		}
	}

	/**
	 * 选项选项元素
	 * @return {Element} 选项列表
	 */
	_renderOptions = () => {
		const { options, cancelButtonIndex, destructiveButtonIndex } = this.props;

		return (
			<ScrollView style={{
				maxHeight: hpx(800)
			}}>
				{
					options.map((item, index) => {
						if(cancelButtonIndex === index) return null;

						return (
							<TouchableOpacity
								key={index}
								style={styles.actionItem}
								onPress={() => this._closeModal(index)}
							>
								<Text style={[
									styles.actionText,
									destructiveButtonIndex === index ? styles.removeButtonText : {}
								]}>{item}</Text>
							</TouchableOpacity>
						);
					})
				}
			</ScrollView>
		);
	}

	/**
	 * 渲染取消按钮
	 * @return {Element} 取消按钮
	 */
	_renderCancelItem = () => {
		const { cancelButtonIndex, options } = this.props;

		if(!cancelButtonIndex) return null;

		const cancelItem = options[cancelButtonIndex];

		return [
			<View key={0} style={styles.cancenMargin}/>,
			<TouchableOpacity
				key={1}
				style={styles.actionItem}
				onPress={() => this._closeModal(cancelButtonIndex)}
			>
				<Text style={styles.actionText}>{cancelItem}</Text>
			</TouchableOpacity>
		];
	}

	_renderTitle = () => {
		const { title, message } = this.props;

		if(!title && !message) return;

		return (
			<View style={styles.titleView}>
				{title && <Text style={styles.titleText}>{title}</Text>}
				{message && <Text style={styles.messageText}>{message}</Text>}
			</View>
		);
	}

	/**
	 * 渲染选项容器元素
	 * @return {Element} 选项容器元素
	 */
	_renderActionBody = () => {
		return (
			<Animatable.View
				ref={ref => this.handleBodyRef = ref}
				animation="bounceInUp"
				duration={500}
				style={styles.modalBody}
				onStartShouldSetResponder={() => true}
			>
				{ this._renderTitle() }
				{ this._renderOptions() }
				{ this._renderCancelItem() }
			</Animatable.View>
		);
	}

	render() {
		return (
			<View style={{zIndex: 1000}}>
				<Modal
					visible={true}
					transparent={true}
					onRequestClose={topView.remove}
				>
					<Animatable.View
						ref={ref => this.handleRef = ref}
						style={styles.container}
						animation="fadeIn"
						duration={600}
						onStartShouldSetResponder={() => true}
						onResponderRelease={this._onClosePress}
					>
						{ this._renderActionBody() }
					</Animatable.View>
				</Modal>
			</View>
		);
	}
}

const show = (options, callback) => {
	if(Platform.OS === 'ios') {
		ActionSheetIOS.showActionSheetWithOptions(options, callback);
	} else {
		topView.set(
			<ActionSheetAndroid
				{...options}
				callback={callback}
			/>
		);
	}
}

export default {
	show,
}