/**
 * Image 组件封装；
 */
import React, { Component } from 'react';
import { Image } from 'react-native';

const errorSource = require('../../assets/images/common/location_modal.png'); // 加载错误回调

export default class SxpImage extends Component {

  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  onError = () => {
    this.setState({ error: true });
  }

  render() {
    const { source, ...otherProps } = this.props;
    const { error } = this.state;
    return error ? (
      <Image
        source={errorSource}
        {...otherProps}
      />
    ) : (
      <Image
        source={{ cache: 'force-cache', ...source }}
        onError={this.onError}
        {...otherProps}
      />
    );
  }
}
