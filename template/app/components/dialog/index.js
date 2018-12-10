/**
 * 弹框组件
 */
import React, { Component, cloneElement, isValidElement } from 'react';
import { Modal, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

import topView from '../utils/topView';
import View from '../view'
import styles from './styles';

let dialogRef;

class Dialog extends Component {
	state = {
		visibleModal: false,
		bodyHeight: 0,
	};

	static propTypes = {
		/* 弹框位置 */
		position: PropTypes.oneOf(['top', 'center', 'bottom']),
		/* 中间弹框的动画效果 */
		animationType: PropTypes.oneOf(['bounceIn', 'fadeInDown', 'fadeInUp']),
		/* 点击蒙曾是否关闭 */
		maskClosable: PropTypes.bool,
		/* 关闭时的回调函数 */
		onClose: PropTypes.func,
		/* 是否使用topView打开 */
		isTopView: PropTypes.bool,
	};

	static defaultProps = {
		position: 'center',
		animationType: 'bounceIn',
		maskClosable: true,
		onClose: () => {}
	}

	componentDidMount() {
		/* 供外部调用 */
		toastRef = this;
		this.props.isTopView && this.showModal();
	}

	componentWillUnmount() {
		toastRef = null;
	}

	componentWillReceiveProps(nextProps) {
		const { visible } = this.props;
		const { visible: nextVisible } = nextProps;

		if(!visible && nextVisible) {
			this.showModal();
		}

		if(visible && !nextVisible) {
			this.closeModal();
		}
	}

	/**
	 * 显示弹框
	 * @return {undefined}
	 */
	showModal = () => {
		this.setState({
			visibleModal: true,
		});
	}

	/**
	 * 关闭事件
	 * @return {undefined}
	 */
	onClose = () => {
		const { isTopView, onClose } = this.props;
		isTopView ? this.closeModal() : onClose();
	}

	/**
	 * 关闭窗口
	 * @return {undefined}
	 */
	closeModal = () => {
		const { position, animationType } = this.props;

		if(position === 'center') {
			const centerAmination = {
				'bounceIn': 'fadeOut',
				'fadeInDown': 'fadeOutUp',
				'fadeInUp': 'fadeOutDown',
			}

			this.bodyHandleRef[centerAmination[animationType]](300);
		} else {
			this.bodyHandleRef.transitionTo({
				height: 0
			}, 300);
		}

		this.handleRef.fadeOut(300).then(() => {
			this.setState({
				visibleModal: false
			}, topView.remove);
		});
	}

	/**
	 * 获取窗口高度，设置动画元素高度
	 * @param  {Object} e 事件对象
	 * @return {undefined}
	 */
	contentLayout = e => {
		const { height } = e.nativeEvent.layout;

		this.setState({
			bodyHeight: height,
		});
	}

	/**
	 * 渲染内容元素
	 * @return {Element} 内容元素
	 */
	_renderBody = () => {
		const { children } = this.props;
		return cloneElement(children, {
			onLayout: this.contentLayout
		});
	}

	/**
	 * 遮罩层元素样式
	 * @return {Array} 样式
	 */
	_getBodyStyle = () => {
		const { position } = this.props;
		const positionMap = {
			top: 'flex-start',
			center: 'center',
			bottom: 'flex-end',
		};

		return [
			StyleSheet.absoluteFill,
			{
				backgroundColor: 'transparent',
				justifyContent: positionMap[position],
				alignItems: position === 'center' ? 'center' : undefined,
			}
		];
	}

	/**
	 * 动画容器元素样式
	 * @return {Element} 样式对象
	 */
	_getContentStyle = () => {
		const { bodyHeight } = this.state;
		const { position } = this.props;
		const justifyMap = {
			'top': 'flex-end',
			'bottom': 'flex-start',
		}

		return {
			height: bodyHeight,
			justifyContent: justifyMap[position],
			overflow: 'hidden',
		};
	}

	/**
	 * 动画效果类型
	 * @return {String} 动画类型字符串
	 */
	_bodyAnimation = () => {
		const { position, animationType } = this.props;
		const animationMap = {
			bottom: 'fadeInUpBig',
			top: 'fadeInDownBig',
			center: animationType,
		};

		return animationMap[position];
	}

	render() {
		const { bodyHeight, visibleModal } = this.state;
		const { maskClosable, visible } = this.props;

		return (
			<Modal
				visible={visibleModal}
				transparent={true}
				onRequestClose={this.onClose}
			>
				<Animatable.View
					ref={ref => this.handleRef = ref}
					style={styles.container}
					animation="fadeIn"
					duration={260}
				/>
				<View
					style={this._getBodyStyle()}
					onStartShouldSetResponder={() => true}
					onResponderRelease={maskClosable ? this.onClose : undefined}
				>
					<Animatable.View
						ref={ref => this.bodyHandleRef = ref}
						style={this._getContentStyle()}
						animation={this._bodyAnimation()}
						duration={260}
						onStartShouldSetResponder={() => true}
					>
						{this._renderBody()}
					</Animatable.View>
				</View>
			</Modal>
		);
	}
}

Dialog.show = (content) => {
	if(isValidElement(content)) {
		topView.set(
			<Dialog isTopView>
				{content}
			</Dialog>
		);
	} else if(typeof content === 'object') {
		const defaultParams = {
			content: null,
			position: 'center',
			animationType: ''
		}
		const { content: _content, ...restProps } = content;

		topView.set(
			<Dialog {...restProps} isTopView>
				{content.content}
			</Dialog>
		);
	}

	return {
		close() {
			toastRef && toastRef.closeModal();
		}
	}
}

export default Dialog;