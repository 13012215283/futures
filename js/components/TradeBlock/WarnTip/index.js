import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import style from './style';

/**
 * @property tip 提示内容
 * @property noStyle 判断是否有border样式
 */

export default class WarnTip extends Component {
  static defaultProps = {
    noStyle: false,
  };

  render() {
    const borderStyle = this.props.noStyle ? {} : style.borderStyle;

    return (
      <View style={[style.WarnTip, borderStyle]}>
        <Text style={style.WarnTipText}>{this.props.tip}</Text>
      </View>
    );
  }
}

WarnTip.propTypes = {
  tip: PropTypes.string.isRequired,
  noStyle: PropTypes.bool,
};
