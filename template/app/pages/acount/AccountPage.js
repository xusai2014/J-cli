/**
 * Created by yangzishu
 */
import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { getTabIcon } from '../../config/icon.conf';
import * as theme from '../../config/theme.conf';
import { deviceHeight, deviceWidth } from '../../utils/ScreenUtil';
import { MINE, } from '../../config/string.conf';
import { PHONE_SYSTEM_VERSION } from "../../config/app.conf";
import { IS_IOS_OS } from "../../utils/PlatformUtil";

export default class AccountPage extends Component {

  static navigationOptions = {
    tabBarLabel: MINE,
    tabBarIcon: (options) => getTabIcon('account', options),
    tabBarOnPress: ({ navigation, defaultHandler }) => {
      defaultHandler();
      !!navigation.state.params && navigation.state.params.loadUserInfo();
    },
  };

  componentDidMount() {
    console.log('加载了我的界面');
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <StatusBar
          animated={IS_IOS_OS}
          backgroundColor='transparent'
          translucent={parseFloat(PHONE_SYSTEM_VERSION) >= 6.0}
          barStyle='dark-content'
        />
        <Text style={styles.titleStyle}>我的界面</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: theme.PAGE_BG_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth,
    height: deviceHeight,
  },
  titleStyle: {
    textAlign: 'center'
  }
});