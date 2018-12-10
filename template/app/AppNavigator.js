import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  NavigationActions,
  StackViewTransitionConfigs
} from 'react-navigation';
import { StackViewStyleInterpolator } from "react-navigation-stack";
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import Home from './pages/home/navigation';
import Coupon from './pages/coupon/navigation';
import Common from './pages/common/navigation';
import { IS_ANDROID_OS } from "./utils/PlatformUtil";
import { createReactNavigationReduxMiddleware, reduxifyNavigator } from "react-navigation-redux-helpers";
import LaunchScreen from "./pages/LaunchScreen";
import MainTabHome from "./pages/MainTabHome";

const navReduxMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const TransitionConfiguration = () => ({
  screenInterpolator: (sceneProps) => {
    const { scene } = sceneProps;
    const { route } = scene;
    // 获取屏幕切换时新屏幕的参数
    const params = route.params || {};
    /* forHorizontal 表示从右向左滑出 forVertical 表示从下向上滑出 */
    const transition = params.transition || 'forHorizontal';
    return StackViewStyleInterpolator[transition](sceneProps);
  }
});

/* The screens you add to MODAL_ROUTES will have the modal transition.  */
const MODAL_ROUTES = ['CouponMainPage'];

const dynamicModalTransition = (transitionProps, prevTransitionProps) => {
  const isModal = MODAL_ROUTES.some(
    screenName =>
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
  );
  return isModal ? StackViewTransitionConfigs.defaultTransitionConfig(
    transitionProps,
    prevTransitionProps,
    isModal
  ) : {
    screenInterpolator: (sceneProps) => {
      // 配置android与IOS相同的PUSH动画
      return StackViewStyleInterpolator.forHorizontal(sceneProps);
    }
  };
};

const StackNavigator = createStackNavigator({
  // LaunchScreen: { screen: LaunchScreen },
  // MainTabHome: { screen: MainTabHome },
  MainTabHome: { screen: MainTabHome },
  ...Home,
  ...Coupon,
  ...Common,
}, {
  // initialRouteName: 'LaunchScreen',
  mode: 'card',
  headerMode: 'screen',
  transitionConfig: dynamicModalTransition,
  defaultNavigationOptions: () => ({
    // headerBackTitle: null,
    // headerTintColor: theme.NAVBAR_TITLE_COLOR,
    // headerStyle: {
    //     backgroundColor: theme.NAVBAR_BG_COLOR,
    //     borderBottomWidth: 0,
    //     elevation: 0,
    // },
    header: null,
  })
});

/**
 * 应用根路由
 */
const RootNavigator = createAppContainer(createSwitchNavigator({
  LaunchScreen: { screen: LaunchScreen },
  StackNavigator: StackNavigator
}, {
  initialRouteName: 'LaunchScreen',
  // resetOnBlur: false,
  // backBehavior: 'none'
}));

const AppReduxifyNavigator = reduxifyNavigator(RootNavigator, "root");

class AppWithNavigationState extends Component {

  /**
   * 返回页面
   * @return {Boolean}
   */
  onBack = () => {
    const { dispatch, state } = this.props;
    if (state.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  componentWillMount() {
    /* 安卓添加返回按钮监听事件 */
    if (IS_ANDROID_OS) {
      DeviceEventEmitter.addListener('hardwareBackPress', this.onBack);
    }
    // fetchInterceptors(this.props.dispatch);
    SplashScreen.hide();
  }

  render() {
    return (
      <AppReduxifyNavigator {...this.props}/>
    )
  }
}

const mapStateToProps = (state) => ({
  state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export default AppNavigator;
export { RootNavigator, AppNavigator, navReduxMiddleware }
