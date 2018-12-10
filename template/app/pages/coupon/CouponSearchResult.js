import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from "../../components";
import * as theme from '../../config/theme.conf';
import { COUPON, } from '../../config/string.conf';
import { px } from "../../utils/ScreenUtil";

// @fetch.inject()
export default class CouponSearchResult extends Component {

  static navigationOptions = navigation => ({
    header: Header({
      title: `${navigation.navigation.state.params && navigation.navigation.state.params.name ? navigation.navigation.state.params.name : ''}${COUPON}`,
      backButtonColor: theme.COLOR_WHITE,
      headerTintColor: theme.COLOR_WHITE,
      headerStyle: {
        backgroundColor: theme.BASE_COLOR,
        barStyle: "light-content",
      }
    }),
  });

  render() {
    return (
      <View style={styles.containerStyle}>
        <Text style={{ fontSize: px(30)}}>优惠券搜索结果</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
