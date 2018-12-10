/**
 * Image 组件封装；
 */
import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from '../icon';

import Text from '../text';
import topView from '../utils/topView';
import { px } from '../screen-utils';
import styles from './styles';

let toastRef;

class Toast extends Component {
	componentDidMount() {
		const { duration } = this.props;

		/* 定时关闭 */
		if(duration !== 0) {
			this.timer = setTimeout(this.closeToast, duration * 1000);
		}

		/* 供外部调用 */
		toastRef = this;
	}

	componentWillUnmount() {
		/* 清除实例对象 */
		toastRef = null;

		/* 清除定时器 */
		this.timer && clearTimeout(this.timer);
	}

	/**
	 * 关闭提示框
	 * @return {undefined}
	 */
	closeToast = () => {
		const { onClose } = this.props;
		typeof onClose === 'function' && onClose();
		this.animationRef.bounceOut(300).then(() => topView.remove('toast'));
	}

	/**
	 * 渲染图标
	 * @return {Element} 图标元素
	 */
	getToastIcon() {
		const { type } = this.props;

		const iconMap = {
			'loading': <ActivityIndicator color="#fff" size="large"/>,
			'success': <Icon type="SimpleLineIcons" name="check" color="#fff" size={px(60)}/>,
			'fail': <Icon type="SimpleLineIcons" name="close" color="#fff" size={px(60)}/>,
			'warn': <Icon type="SimpleLineIcons" name="info" color="#fff" size={px(60)}/>,
		}

		return iconMap[type];
	}

	/**
	 * 渲染提示框内容组件
	 * @return {Element} 提示框内容组件
	 */
	getToastBody() {
		const { message, type } = this.props;

		if(type === 'custom') {
			return message;
		}

		if(type) {
			return (
				<View style={styles.toastBody}>
					{ this.getToastIcon() }
					{ message && <Text style={styles.messageText}>{message}</Text> }
				</View>
			);
		}

		return (
			<View style={styles.toastInfoView}>
				<Text style={styles.toastText}>{message}</Text>
			</View>
		);
	}

	render() {
		const { mask } = this.props;
		return (
			<View style={styles.toastView} pointerEvents={mask ? undefined : 'box-none'}>
				<Animatable.View
					ref={ref => this.animationRef = ref}
					animation="bounceIn"
					duration={400}
				>
					{ this.getToastBody() }
				</Animatable.View>
			</View>
		);
	}
}

/**
 * 显示提示信息
 * @param  {String}   type     提示信息类型
 * @param  {String}   message  文字信息
 * @param  {Number}   duration 关闭时间（秒）
 * @param  {Function} onClose  关闭时的回调函数
 * @param  {Boolean}  mask     是否允许点透
 * @return {undefined}
 */
const notice = (
	type,
	message,
	duration = 3,
	onClose = () => {},
	mask = true,
) => {
	topView.remove('toast');
	setTimeout(() => {
		topView.set(
			<Toast
				type={type}
				message={message}
				duration={duration}
				onClose={onClose}
				mask={mask}
			/>,
			'toast'
		);
	})
};

export default {
	/* 普通文字信息 */
	info(...rest) {
		notice('', ...rest);
	},
	/* 加载提示 */
	loading(...rest) {
		notice('loading', ...rest);
	},
	/* 成功提示 */
	success(...rest) {
		notice('success', ...rest);
	},
	/* 错误提示 */
	fail(...rest) {
		notice('fail', ...rest);
	},
	/* 警告 */
	warn(...rest) {
		notice('warn', ...rest);
	},
	custom(...rest) {
		notice('custom', ...rest);
	},
	hide() {
		toastRef && toastRef.closeToast();
	}
}