/**
 * 屏幕适配工具类
 */

import { Dimensions, PixelRatio, StatusBar } from 'react-native';

import * as theme from '../config/theme.conf';
import { PHONE_SYSTEM_VERSION } from "../config/app.conf";
import { IS_ANDROID_OS, IS_IOS_OS } from "./PlatformUtil";

/* 设备宽度 */
export const deviceWidth = Dimensions.get('window').width;

/* 设备高度 */
export const deviceHeight = Dimensions.get('window').height;

/* dpr */
export const dpr = PixelRatio.get();

/**
 * 根据基准宽度计算实际像素
 * @param  {Number} width 设计像素
 * @return {Number}       实际像素
 */
export const px = width => Math.floor(deviceWidth / theme.BASE_WIDTH * width);

export const isMinScreen = () => deviceWidth === 320;

/* iPhoneX 屏幕大小 */
const X_WIDTH = 375;
const X_HEIGHT = 812;

/**
 * 判断是否为iphoneX
 * @return {boolean}
 */
export const isIphoneX = () => {
  return (
    IS_IOS_OS &&
    ((deviceWidth === X_WIDTH && deviceHeight === X_HEIGHT) ||
      (deviceWidth === X_HEIGHT && deviceHeight === X_WIDTH))
  );
};

/* 是否为android小于5.0的系统版本 */
export const isLessThanAndroid5 = (IS_ANDROID_OS && PHONE_SYSTEM_VERSION.split('.')[0] < 5);

/* 是否为android小于6.0的系统版本 */
export const isLessThanAndroid6 = (IS_ANDROID_OS && PHONE_SYSTEM_VERSION.split('.')[0] < 6);

/**
 * 获取状态栏高度
 * @return {Number} 状态栏高度
 */
export const getStatusHeight = () => {
  const STATUS_HEIGHT = isIphoneX() ? theme.X_STATUS_BAR_HEIGHT : theme.STATUS_BAR_HEIGHT;

  /* 状态栏的高度 */
  let STATUSBAR_HEIGHT = IS_ANDROID_OS ? StatusBar.currentHeight : STATUS_HEIGHT;

  if (IS_ANDROID_OS && PHONE_SYSTEM_VERSION.split('.')[0] < 6) {
    STATUSBAR_HEIGHT = 0;
  }

  return STATUSBAR_HEIGHT;
}