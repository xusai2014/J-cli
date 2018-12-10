import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import * as theme from '../config/theme.conf';

import { px } from '../utils/ScreenUtil';
import AccountPage from "./acount/AccountPage";
import HomePage from "./home/HomePage";

/**
 * 首页导航
 * @type {Object}
 */
export default createBottomTabNavigator({
  HomePage: { screen: HomePage },
  AccountPage: { screen: AccountPage }
}, {
  initialRouteName: 'AccountPage',
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  navigationOptions: {
    gesturesEnabled: false,
    headerBackTitle: null,
  },
  tabBarOptions: {
    showIcon: true,
    activeTintColor: theme.COLOR_TAB_BAR_BLUE,
    inactiveTintColor: theme.TAB_TINT_COLOR,
    indicatorStyle: { height: 0 },
    style: {
      backgroundColor: '#ffffff',
      height: 49,
      justifyContent: 'center',
      overflow: 'visible',
    },
    labelStyle: {
      fontSize: 11,
      lineHeight: 11,
      marginTop: 0,
      paddingBottom: 5,
      paddingTop: 0
    },
    iconStyle: {
      width: px(750),
      height: px(50),
      overflow: 'visible',
    }
  }
});