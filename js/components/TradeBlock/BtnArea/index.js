import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import style from './style';

export default class BtnArea extends Component {
  static defaultProps = {
    children: <View />,
  };

  render() {
    return <View style={style.btnArea}>{this.props.children}</View>;
  }
}

BtnArea.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};
