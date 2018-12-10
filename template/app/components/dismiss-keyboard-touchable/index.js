/**
 * Created by chengkai on 2018/2/1.
 */

import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export default class DismissKeyboardTouchable extends Component {

  /**
   * 收起键盘
   */
  keyboardHide = () => {
    Keyboard.dismiss();
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {
      children = null,
      style = null,
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.keyboardHide} style={style}>
        {children}
      </TouchableWithoutFeedback>
    )

  }

}