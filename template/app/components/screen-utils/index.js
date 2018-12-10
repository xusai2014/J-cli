/**
 * 屏幕适配工具类
 */

import { Dimensions, PixelRatio, Platform, StatusBar, StyleSheet } from 'react-native';

let base_width = 750;
let base_height = 1334;

/* 设备宽度 */
const deviceWidth = Dimensions.get('window').width;

/* 设备高度 */
const deviceHeight = Dimensions.get('window').height;

/**
 * 根据基准宽度计算实际像素
 * @param  {Number} width 设计像素
 * @return {Number}       实际像素
 */
export const px = width => {
	if(width === 1) {
		return StyleSheet.hairlineWidth;
	}

	return Math.floor(deviceWidth / base_width * width);
};

export const hpx = height => {
	if(height === 1) {
		return StyleSheet.hairlineWidth;
	}

	return Math.floor(deviceHeight / base_height * height);
}

export default {
	deviceWidth,
	deviceHeight,
	px,
	hpx,
}

/* iPhoneX 屏幕大小 */
// const X_WIDTH = 375;
// const X_HEIGHT = 812;

/**
* 判断是否为iphoneX
* @return {boolean}
*/
// export const isIphoneX = () => {
// 	return (
// 		Platform.OS === 'ios' &&
// 		((deviceWidth === X_WIDTH && deviceHeight === X_HEIGHT) ||
// 		(deviceWidth === X_HEIGHT && deviceHeight === X_WIDTH))
// 	);
// };
