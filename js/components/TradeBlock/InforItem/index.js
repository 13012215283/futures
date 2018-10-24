import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import style from './style';
/**
 * @property title 信息名字
 * @property value 信息内容
 */

export default class InforItem extends Component {
  static defaultProps = {
    title: '',
    value: '',
    selfStyle: {},
    textStyle: {},
  };

  render() {
    const { title, value, selfStyle, textStyle } = this.props;

    return (
      <View style={[style.infoItem, selfStyle]}>
        <Text style={style.infoItemTitle}>{title}</Text>
        <Text style={[style.infoItemText, textStyle]}>{value}</Text>
      </View>
    );
  }
}

InforItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  selfStyle: PropTypes.shape({
    width: PropTypes.number,
  }),
  textStyle: PropTypes.shape({
    color: PropTypes.string,
  }),
};
