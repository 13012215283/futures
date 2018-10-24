import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import style from './style';

/**
 * @property title 标题
 * @property value 标题值
 * @property valueStyle 标题值的样式属性：自定义颜色
 */

const TextNormal = props => (
  <View style={style.textLine}>
    <Text style={style.textStyle}>{props.title}</Text>
    <Text style={[style.textStyle, { marginLeft: 3 }, props.valueStyle]}>
      {props.value}
    </Text>
  </View>
);

const TextBold = props => (
  <View style={style.textLine}>
    <Text style={style.textStyle}>{props.title}</Text>
    <Text style={style.deliveValue}>{props.value}</Text>
  </View>
);

module.exports = { TextNormal, TextBold };

TextNormal.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  valueStyle: PropTypes.shape({
    color: PropTypes.string,
  }),
};

TextNormal.defaultProps = {
  valueStyle: {},
};

TextBold.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
