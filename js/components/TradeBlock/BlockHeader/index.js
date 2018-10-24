import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import style from './style';

/**
 * @property headtitle 头部标题
 * @property headerStyle default:{} 设置高度的底部边框的样式属性
 */

export default class BlockHeader extends Component {
  static defaultProps = {
    headtitle: '',
    children: <View />,
    headerStyle: {},
    headerFont: {},
  };

  render() {
    const { headtitle, headerStyle, headerFont } = this.props;

    return (
      <View style={[style.positionBlockHeader, headerStyle]}>
        <View style={style.pBloHeadText}>
          <Text style={[style.headFont, headerFont]} numberOfLines={1}>
            {headtitle}
          </Text>
        </View>
        {this.props.children}
      </View>
    );
  }
}

BlockHeader.propTypes = {
  headtitle: PropTypes.string,
  children: PropTypes.element,
  headerStyle: PropTypes.shape({
    height: PropTypes.number,
    borderBottomWidth: PropTypes.number,
    borderBottomColor: PropTypes.string,
    fontSize: PropTypes.number,
  }),
  headerFont: PropTypes.shape({
    fontSize: PropTypes.number,
  }),
};
