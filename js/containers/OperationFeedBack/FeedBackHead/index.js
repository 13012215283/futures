import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes, { element } from 'prop-types';

import style from './style';

export default class FeedBackHead extends Component {
  static defaultProps = {
    children: <View />,
    title: '',
  };

  render() {
    return (
      <View style={style.container}>
        <View style={style.header}>
          <Text style={style.iconfont}>&#xe6d6;</Text>
          <Text style={style.title}>{this.props.title}</Text>
        </View>
        {this.props.children}
      </View>
    );
  }
}

FeedBackHead.propTypes = {
  children: PropTypes.arrayOf(element),
  title: PropTypes.string,
};
