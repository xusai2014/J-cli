import React, { Component, isValidElement } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { deviceWidth, getStatusHeight } from '../utils/ScreenUtil';
// import { Text } from '../components';
import { PHONE_SYSTEM_VERSION } from "../config/app.conf";
import * as theme from "../config/theme.conf";
import { IS_IOS_OS } from "../utils/PlatformUtil";
import Entypo from 'react-native-vector-icons/Entypo';

/* header组件的默认高度 */
const HEADER_HEIGHT = 44;

/* 状态栏的高度 */
const STATUSBAR_HEIGHT = getStatusHeight();

/**
 * 页面header 公用组件类
 */
class Header extends Component {
  static defaultProps = {
    headerInit: () => {}
  }
  /**
   * 返回方法
   * @return {void}
   */
  goBack = () => {
    const { onBack } = this.props;
    if (onBack) {
      onBack(this.props.navigation);
    } else {
      // this.props.navigation.goBack();
      this.props.navigation.dispatch(NavigationActions.back());
    }
  }
  /**
   * 返回按钮
   * @return {Node}
   */
  backButton = () => {
    const { backButtonColor = '#fff' } = this.props;

    return (
      <TouchableOpacity onPress={this.goBack} style={styles.backButton}>
        <Entypo name="chevron-thin-left" color={backButtonColor} size={22}/>
      </TouchableOpacity>
    );
  }

  componentWillMount() {
    const { headerInit } = this.props;

    headerInit(this.props.navigation);
  }

  render() {
    let {
      children,
      absolute,
      opacity = 1,
      leftButton,
      rightButton,
      title = '',
      isRenderHeader = true,
      headerTintColor = '#333',
      headerStyle: {
        backgroundColor,
        barStyle = "dark-content",
        statusBarBackground = backgroundColor,
      },
      scene,
      isBack = true,
    } = this.props;

    if (leftButton === null) {
      leftButton = <View/>
    } else {
      if (!leftButton && scene.index && isBack) {
        leftButton = this.backButton();
      }
    }

    // backgroundColor & translucent 属性只用于android平台(所以这里未判断 android | ios)
    if (backgroundColor === 'white' && statusBarBackground === 'white' && parseFloat(PHONE_SYSTEM_VERSION) <= 6.0) {
      statusBarBackground = theme.STATUS_BAR_BG_COLOR
    }

    const headerStyle = {
      position: 'relative',
      zIndex: 100000,
      width: deviceWidth,
    }

    if (absolute) {
      headerStyle.marginBottom = 0 - HEADER_HEIGHT - STATUSBAR_HEIGHT;
    }

    return (
      isRenderHeader ?
        <View style={headerStyle}>
          <View style={[styles.headerBackground, {
            backgroundColor,
            opacity,
          }]}></View>
          <StatusBar
            animated={IS_IOS_OS}
            backgroundColor={statusBarBackground}
            translucent={parseFloat(PHONE_SYSTEM_VERSION) >= 6.0}
            barStyle={barStyle}
          />
          <View style={styles.headerBody}>
            <View style={styles.headerLeft}>
              {typeof leftButton === 'function' ? leftButton() : leftButton}
            </View>
            {
              isValidElement(title) ?
                title :
                <Text style={[styles.headerTitle, {color: headerTintColor}]}>
                  {title}
                </Text>
            }
            <View
              style={styles.headerRight}
            >
              {typeof rightButton === 'function' ? rightButton() : rightButton}
            </View>
          </View>
        </View>
        :
        <StatusBar
          animated={IS_IOS_OS}
          backgroundColor={statusBarBackground}
          translucent={parseFloat(PHONE_SYSTEM_VERSION) >= 6.0}
          barStyle={barStyle}
        />
    );
  }
}

/**
 * navigationOptions 配置中生成header组件的函数
 * @param  {Object} options header配置参数
 * @return {function}       生成header组件的函数
 */
export default options => props => {
  const {
    navigation,
    scene,
  } = props;

  // console.log('options:', options);
  // console.log('props:', props);

  return (
    <Header
      {...options}
      navigation={navigation}
      scene={scene}
    />
  );
}

const styles = StyleSheet.create({
  headerBody: {
    width: deviceWidth,
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: STATUSBAR_HEIGHT,
    left: 0,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '500',
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  headerLeft: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  headerRight: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    right: 10,
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  headerBackground: {
    height: HEADER_HEIGHT + STATUSBAR_HEIGHT,
  },
  backButton: {
    width: 42,
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
