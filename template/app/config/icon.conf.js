import React from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';

import { px } from '../utils/ScreenUtil';

/**
 * 根据图标类型和状态获取图标
 * @param  {String} field 图标类型
 * @param  {Boolean} state 选中状态
 * @return {String}  图标
 */
export const getIcon = (type, state) => {
  return state ? iconList[type][0] : iconList[type][1];
};

/* 图标列表：0为选中，1位未选中 */
const iconList = {
  home: [require('../assets/images/home/home-on.png'), require('../assets/images/home/home-off.png')], // 收款
  message: [require('../assets/images/home/message-on.png'), require('../assets/images/home/message-off.png')], // 消息
  bill: [require('../assets/images/home/bill-on.png'), require('../assets/images/home/bill-off.png')], // 账单
  account: [require('../assets/images/home/account-on.png'), require('../assets/images/home/account-off.png')], // 我的
};

/**
 * 获取首页tab图标
 * @param  {String} type            图标标识
 * @param  {Boolean} focused        是否选中
 * @param  {String} tintColor       颜色
 * @param  {String|Number} num      消息数量
 * @param  {String} isShowRedPoint  是否展示小红点
 */
export const getTabIcon = (type, { focused, tintColor }, num, isShowRedPoint = false) => {
  let tabStyle = '';
  if (type === 'home') {
    tabStyle = styles.home;
  }
  if (type === 'message') {
    tabStyle = styles.message;
  }
  if (type === 'bill') {
    tabStyle = styles.bill;
  }
  if (type === 'account') {
    tabStyle = styles.account;
  }
  return (
    <ImageBackground
      source={getIcon(type, focused)}
      style={tabStyle}
    >
      {
        (type === 'message' && isShowRedPoint) ?
          <Text style={styles.messageCount}>{num}</Text> : null
      }
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  home: {
    width: px(38),
    height: px(38),
    marginTop: 0,
  },
  message: {
    width: px(40),
    height: px(38),
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    overflow: 'visible',
  },
  bill: {
    width: px(38),
    height: px(38),
    marginTop: 0,
  },
  account: {
    width: px(38),
    height: px(41),
    marginTop: 0,
  },
  messageCount: {
    position: 'absolute',
    top: px(-8),
    left: px(30),
    minWidth: px(16),
    height: px(16),
    backgroundColor: '#E70103',
    borderRadius: px(8.5),
    overflow: 'hidden',
    paddingTop: px(3),
    paddingBottom: px(3),
    paddingLeft: px(6),
    paddingRight: px(6),
    fontSize: px(20),
    color: '#fff',
    textAlign: 'center',
  }
});