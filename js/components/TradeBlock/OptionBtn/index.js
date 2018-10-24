import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Button from 'futures/components/Button';
import style from './style';

const OptionRedBtn = props => (
  <View style={[style.btnStyle, { width: props.btnWidth }]}>
    <Button
      type="operation"
      text={props.text}
      subStatus="fillMoney"
      onPress={() => {
        props.onPress();
      }}
    />
  </View>
);

const OptionGrayBtn = props => (
  <View style={[style.btnStyle, { width: props.btnWidth }]}>
    <Button
      type="operation"
      text={props.text}
      subStatus="order"
      onPress={() => {
        props.onPress();
      }}
    />
  </View>
);

module.exports = { OptionRedBtn, OptionGrayBtn };

OptionRedBtn.propTypes = {
  btnWidth: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

OptionGrayBtn.propTypes = {
  btnWidth: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
