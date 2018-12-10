import React, { Component } from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import fetch from '../../sx-fetch';
import { deviceHeight, deviceWidth, isIphoneX, isLessThanAndroid6, px } from '../../utils/ScreenUtil';
import {
  BIND_MERCHANT,
  COUPON,
  HOME_PAGE,
  INSTALL_MACHINE,
  MERCHANT_AUTH,
  NOT_BIND_MERCHANT_HINT,
  QUOTA_MANAGER,
  SWITCH_MERCHANT
} from '../../config/string.conf';
import * as theme from "../../config/theme.conf";
import { IS_IOS_OS } from "../../utils/PlatformUtil";
import { PHONE_SYSTEM_VERSION } from "../../config/app.conf";
import { getTabIcon } from "../../config/icon.conf";
import { showToast } from "../../utils/ToastUtil";

/**
 * 主界面
 * @author chengkai
 */
@fetch.inject()
export default class HomePage extends Component {

  static navigationOptions = ({
    tabBarLabel: HOME_PAGE,
    tabBarIcon: (options) => getTabIcon('home', options),
    tabBarOnPress: ({ navigation, defaultHandler }) => {
      defaultHandler();
      !!navigation.state.params && navigation.state.params.loadMerchantInfo();
    }
  });

  state = {
    bindMerchantName: '',
  };

  /**
   * 跳转到商户认证
   */
  jumpToMerchantAuth = () => {
    // IS_IOS_OS && NativeModules.RNBridgeModule.closeNativePage();
  };

  /**
   * 跳转到装机
   */
  jumpToInstallMachine = () => {

  };

  /**
   * 跳转到额度管理
   */
  jumpToQuotaManager = () => {

    console.log('请求开始')
    this.props.$fetch.get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        console.log('请求成功', res);
      })
      .catch((err) => {
        console.log('请求异常', err);
      })
      .done();

    // this.props.$fetch.simplePost({})
    //   .then((data) => {
    //     showToast('请求结束');
    //     // this.loading.dismiss();
    //     console.log('请求成功', data);
    //   }).catch((err) => {
    //   // this.loading.dismiss();
    //   console.log('请求异常', err);
    //   showToast('请求异常');
    // });
  };

  /**
   * 跳转到额度管理
   */
  jumpToCoupon = () => {
    this.props.navigation.navigate('CouponMainPage');
  };

  /**
   * 跳转绑定商户
   */
  jumpToBindMerchant = () => {
    showToast('跳转到绑定商户');
  };

  /**
   * 获取 已绑定商户名称
   */
  getMerchantType = () => {
    let merchantName = this.state.bindMerchantName;
    if (merchantName !== NOT_BIND_MERCHANT_HINT && merchantName !== '') {
      return SWITCH_MERCHANT;
    } else {
      return BIND_MERCHANT;
    }
  };

  componentDidMount() {
    console.log('加载了Home界面');
  }

  render() {
    return (
      <View style={styles.headerStyle}>
        <StatusBar
          animated={IS_IOS_OS}
          backgroundColor='transparent'
          translucent={parseFloat(PHONE_SYSTEM_VERSION) >= 6.0}
          barStyle='dark-content'
        />
        <View style={styles.bannerContainerStyle}>
          <View style={styles.statusBarPlaceHolderStyle}/>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.bindMerchantTextStyle}
                  onPress={this.jumpToBindMerchant}>{this.getMerchantType()}</Text>
            <Text numberOfLines={1}
                  style={styles.bindMerchantNameTextStyle}>{!!this.state.bindMerchantName ? this.state.bindMerchantName : NOT_BIND_MERCHANT_HINT}</Text>
          </View>
          <Image source={require('../../assets/images/home/home_bannner.png')}
                 style={styles.bannerImageStyle}/>
        </View>
        <View style={styles.funListContainerStyle}>
          <TouchableOpacity activeOpacity={0.7} style={styles.funListItemStyle} onPress={this.jumpToCoupon}>
            <Image source={require('../../assets/images/home/home_coupon.png')}
                   style={styles.funIconStyle}/>
            <Text style={styles.funTextStyle}>{COUPON}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.funListItemStyle} onPress={this.jumpToQuotaManager}>
            <Image source={require('../../assets/images/home/home_quota_manage.png')}
                   style={styles.funIconStyle}/>
            <Text style={styles.funTextStyle}>{QUOTA_MANAGER}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.funListItemStyle} onPress={this.jumpToMerchantAuth}>
            <Image source={require('../../assets/images/home/home_merchant_auth.png')}
                   style={styles.funIconStyle}/>
            <Text style={styles.funTextStyle}>{MERCHANT_AUTH}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.funListItemStyle} onPress={this.jumpToInstallMachine}>
            <Image source={require('../../assets/images/home/home_install_machine.png')}
                   style={styles.funIconStyle}/>
            <Text style={styles.funTextStyle}>{INSTALL_MACHINE}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// export default fetch.inject()(HomePage);

const styles = StyleSheet.create({
  headerStyle: {
    width: deviceWidth,
    height: deviceHeight,
    alignItems: 'center',
    backgroundColor: theme.PAGE_BG_COLOR,
  },
  bannerContainerStyle: {
    backgroundColor: theme.COLOR_WHITE,
    paddingTop: isIphoneX() ? px(40) : 0,
  },
  statusBarPlaceHolderStyle: {
    backgroundColor: theme.COLOR_WHITE,
    width: deviceWidth,
    height: isLessThanAndroid6 ? 0 : px(40)
  },
  bannerImageStyle: {
    height: px(323),
    width: px(691),
    margin: px(30),
    marginTop: 0,
    backgroundColor: theme.COLOR_WHITE
  },
  funListContainerStyle: {
    width: deviceWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLOR_WHITE
  },
  funListItemStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: px(23),
    flex: 1,
    marginBottom: px(20)
  },
  funIconStyle: {
    width: px(94),
    height: px(94)
  },
  funTextStyle: {
    fontSize: px(23),
    marginTop: px(17),
    color: theme.BASE_FONT_COLOR
  },
  todayTradeContainerStyle: {
    flexDirection: 'column',
    height: px(268),
    width: deviceWidth,
    backgroundColor: theme.COLOR_WHITE,
    marginTop: px(20)
  },
  todayTradeHeaderContainerStyle: {
    width: deviceWidth,
    flexDirection: 'row',
    alignItems: 'center'
  },
  blueIconStyle: {
    width: px(7),
    height: px(23),
    backgroundColor: theme.COLOR_TAB_BAR_BLUE,
    margin: px(30),
    marginRight: px(15)
  },
  todayTradeTextStyle: {
    fontSize: px(30),
    color: theme.COLOR_LIGHT_BLACK,
    fontWeight: 'bold'
  },
  todayTradeInfoContainerStyle: {
    flexDirection: 'row',
    marginLeft: px(32),
    marginRight: px(32),
    marginTop: px(20),
    height: px(138),
    backgroundColor: '#CFE1FF'
  },
  dateContainerStyle: {
    width: px(138),
    height: px(138),
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateWeekTextStyle: {
    fontSize: px(26),
    color: theme.COLOR_WHITE,
    marginBottom: px(14)
  },
  dateTextStyle: {
    fontSize: px(22),
    color: theme.COLOR_WHITE
  },
  tradeMoneyContainerStyle: {
    marginRight: 1
  },
  tradeInfoContainerStyle: {
    flex: 1,
    backgroundColor: theme.COLOR_BLUE_GRAY,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tradeInfoTextStyle: {
    fontSize: px(24),
    color: theme.COLOR_DEEP_BLUE,
    marginBottom: px(14)
  },
  detailTextStyle: {
    fontSize: px(48),
    color: theme.COLOR_DEEP_BLUE,
    fontWeight: 'bold'
  },
  cornerTextStyle: {
    fontSize: px(20),
    color: theme.COLOR_DEEP_BLUE
  },
  bindMerchantTextStyle: {
    margin: px(30),
    color: theme.COLOR_TAB_BAR_BLUE,
    fontSize: px(30)
  },
  bindMerchantNameTextStyle: {
    margin: px(30),
    color: theme.FONT_LIGHT_COLOR,
    fontSize: px(30),
    maxWidth: px(500)
  },

});
