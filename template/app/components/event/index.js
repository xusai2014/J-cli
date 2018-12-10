import React, { Component } from 'react';
import { DeviceEventEmitter, BackHandler, Platform } from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';

/**
 * 事件通知高阶组件
 */
export default (options = {}) => WrappedComponent => {
	class EnhancedComponent extends Component {
		componentWillUnmount() {
			/* 清除普通事件 */
			this.eventList.map(item => item && item.remove());

			/* 清除android返回按钮事件 */
			if(this.backHandlerName) {
				BackHandler.removeEventListener(this.backHandlerName, this.backHandlerCallback);
			}
		}

		/* 普通事件列表 */
		eventList = []

		/**
		 * 注册监听事件
		 * @param  {String}   eventName 事件名称
		 * @param  {Function} callback  事件回调函数
		 * @return {undefined}
		 */
		on = (...rest) => {
			if(rest[0] === 'androidBack' && Platform.OS === 'android') {
				/* android返回按钮事件 */
				this.backHandlerName = `backHandle_${Date.now()}`;
				this.backHandlerCallback = rest[1];
				BackHandler.addEventListener(this.backHandlerName, this.backHandlerCallback);
			} else {
				/* 普通事件 */
				const eventHandle = DeviceEventEmitter.addListener(...rest);
				this.eventList.push(eventHandle);
				return eventHandle;
			}
		}

		/**
		 * 出发监听事件
		 * @param  {...[any]} args 事件参数
		 * @return {undefined}
		 */
		emit = (...args) => {
			DeviceEventEmitter.emit(...args);
		}

		/**
		 * 事件prop属性
		 * @return {Object} 事件属性
		 */
		getEventProps = () => {
			const { propName } = options;

			return {
				[propName || 'event']: {
					on: this.on,
					emit: this.emit,
				}
			};
		}

		render() {
			return (
				<WrappedComponent
					{...this.getEventProps()}
					{...this.props}
				/>
			);
		}
	}

	EnhancedComponent.on = (...rest) => {
		return rest[0] === 'androidBack' ?
			BackHandler.addEventListener(...rest) :
			DeviceEventEmitter.addListener(...rest);
	};

	EnhancedComponent.emit = DeviceEventEmitter.emit;

	hoistNonReactStatic(EnhancedComponent, WrappedComponent);
	return EnhancedComponent;
}