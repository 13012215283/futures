import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import style from './style';

/**
 * 交易单状态
 * @property text 标签上面显示的值
 */

export default class LabBtn extends Component {
  static defaultProps = {
    text: '',
  };
  render() {
    const { text } = this.props;

    return (
      <View style={style.btn}>
        <Text style={style.btnFont}>{text}</Text>
      </View>
    );
  }
}

LabBtn.propTypes = {
  text: PropTypes.string,
};
