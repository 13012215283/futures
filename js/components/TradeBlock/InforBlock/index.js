import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import style from './style';

/**
 * @property headtitle 头部标题
 * @property status value: pending,resolved,revoke,usetted
 */

export default class InforBlock extends Component {
  static defaultProps = {
    children: <View />,
  };

  render() {
    return <View style={style.positionInfo}>{this.props.children}</View>;
  }
}

InforBlock.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};
