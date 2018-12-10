import React, { Component } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import fetch from '../sx-fetch';

import Storage from '../utils/storage';
import { px } from "../utils/ScreenUtil";

export default class LaunchScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.auth();
  }

  componentDidMount() {
    console.log('LaunchScreen  componentDidMount');
  }

  componentWillUnmount() {
    console.log('LaunchScreen  componentWillUnmount');
  }

  /**
   * 跳转到欢迎页面
   * @return {void}
   */
  goToLoginPage = () => {
    this.props.navigation.navigate('MainTabHome');
  }
  /**
   * 跳转到首页
   * @return {void}
   */
  goToTabPage = () => {
    this.props.navigation.navigate('MainTabHome');
  }

  auth = () => {
    /* 判断是否存在 token */
    Storage.load({
      key: 'loginData',
    }).then(res => {
      if (res['auth-token']) {
        fetch.axiosInstance.defaults.headers['auth-token'] = res['auth-token'];
        this.goToTabPage();
      } else {
        this.goToLoginPage();
      }
    }).catch(err => {
      this.goToLoginPage();
    });

  }

  render() {
    return (
      <View style={{ paddingTop: 50 }}>
        <ActivityIndicator/>
        <Text style={{ textAlign: 'center', color: '#ccc', marginTop: px(10) }}>正在加载中，请耐心等候...</Text>
      </View>
    );
  }
}