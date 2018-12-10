import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';
// import fetch from '../../sx-fetch';
import { px } from '../../utils/ScreenUtil';
import { Header, Image } from "../../components";
import * as theme from '../../config/theme.conf';
import { COUPON, } from '../../config/string.conf';

// @fetch.inject()
export default class CouponMainPage extends Component {

  static navigationOptions = ({ navigation, navigation: { state } }) => ({
    header: Header({
      title: COUPON,
      backButtonColor: theme.COLOR_WHITE,
      headerTintColor: theme.COLOR_WHITE,
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: theme.BASE_COLOR,
        barStyle: "light-content",
      },
      // onBack: nav => {
      //     !!state && !!state.params && state.params.onBackPage();
      // }
    }),
    // gesturesEnabled: false,
  });

  clickButton = () => {
    this.props.navigation.navigate('CouponSearchResult');
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Button style={{ margin: px(30)}} onPress={this.clickButton} title="跳转结果界面" color="#841584"/>
        <Image
          style={{ width: px(692), height: px(364) }}
          source={{ uri: 'https://gaopin-preview.bj.bcebos.com/133101093973.jpg' }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: theme.PAGE_BG_COLOR,
    flexDirection: 'column',
    alignItems: 'center'
  }
});
