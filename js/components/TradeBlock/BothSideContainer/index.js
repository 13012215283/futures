import React, { Component } from 'react';
import PropTypes, { element } from 'prop-types';
import { View } from 'react-native';

import style from './style';

export default class TextLine extends Component {
  static defaultProps = {
    children: <View />,
    containerStyle: {},
  };

  render() {
    const { containerStyle } = this.props;

    return (
      <View style={[style.bothSideContainer, containerStyle]}>
        {this.props.children}
      </View>
    );
  }
}

TextLine.propTypes = {
  children: PropTypes.arrayOf(element),
  containerStyle: PropTypes.shape({
    height: PropTypes.number,
  }),
};
