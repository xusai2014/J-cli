import React, { Component } from 'react';
import { StyleSheet, Text, WebView } from 'react-native';
import { EMPTY_STRING, H5_LOAD_ERROR_HINT } from '../../config/string.conf';
import { Header } from "../../components";
import * as theme from "../../config/theme.conf";
import { hideToast, showLoading } from "../../utils/ToastUtil";
import { px } from "../../utils/ScreenUtil";

/**
 * 通用WebView(可层级返回)
 * @author chengkai
 */
export default class CommonWebView extends Component {

  static navigationOptions = ({ navigation: { state } }) => ({
    header: Header({
      title: !!state.params && state.params.title ? state.params.title : EMPTY_STRING,
      backButtonColor: theme.COLOR_WHITE,
      headerTintColor: theme.COLOR_WHITE,
      headerStyle: {
        backgroundColor: theme.NAVBAR_BG_COLOR,
        barStyle: "light-content",
      },
      onBack: nav => {
        !!state.params && state.params.onBackPage();
      }
    })
  })

  state = {
    canGoBack: false,
  }
  onBackPage = () => {
    if (this.state.canGoBack) {
      this.mWebView.goBack();
    } else {
      this.props.navigation.goBack();
    }
  }
  onShouldStartLoadWithRequest = (event) => {
    this.setState({ canGoBack: event.canGoBack });
    return true;
  };
  handlerOnNavigationStateChange = (navState) => {
    this.setState({ canGoBack: navState.canGoBack });
  }
  /**
   * 加载开始
   */
  onLoadStart = () => {
    showLoading();
  }
  /**
   * 加载结束
   */
  onLoadEnd = () => {
    hideToast();
  }
  /**
   * 加载成功
   */
  onLoadSuccess = () => {

  }
  /**
   * 加载失败
   */
  onError = () => {

  }
  onLoadErrorClick = () => {
    this.mWebView.reload();
  }
  renderErrorView = () => {
    return (
      <Text style={styles.errorViewText} onPress={this.onLoadErrorClick}>{H5_LOAD_ERROR_HINT}</Text>
    )
  }

  getUrlFromParams = () => {
    let url = "";
    try {
      url = this.props.navigation.state.params.link;
    } catch (e) {
    }
    return url;
  }

  componentDidMount() {
    const { navigation: { setParams } } = this.props;
    setParams({
      onBackPage: this.onBackPage,
    });
  }

  componentWillUnmount() {
    hideToast();
  }

  render() {
    let uri = this.getUrlFromParams();
    return (
      <WebView
        ref={ref => this.mWebView = ref}
        automaticallyAdjustContentInsets={false}
        style={styles.webViewStyle}
        source={{ uri }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        onNavigationStateChange={this.handlerOnNavigationStateChange}
        startInLoadingState={true}
        scalesPageToFit={true}
        onLoadStart={this.onLoadStart}
        onLoadEnd={this.onLoadEnd}
        onLoad={this.onLoadSuccess}
        onError={this.onError}
        renderError={this.renderErrorView}
      />
    );
  }
}

const styles = StyleSheet.create({
  webViewStyle: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorViewText: {
    color: theme.BASE_FONT_COLOR,
    fontSize: px(30),
    textAlign: 'center',
    marginTop: 30
  }
})