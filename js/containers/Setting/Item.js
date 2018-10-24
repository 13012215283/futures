import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Button from 'futures/components/Button';
import PropTypes from 'prop-types';
import { colors } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';
import style from './style';

// @flow
type Props = {
  label: string,
  onPress: Function,
};

export default class Item extends Component<Props> {
  render() {
    const { label, onPress } = this.props;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={style.itemContainer}>
          <Text style={style.text}>{label}</Text>
          <Text style={style.icon}>&#xe802;</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const LogOutBtn = ({ onPress, text, ...props }) => (
  <Button
    type="primary"
    subStatus="disable"
    text={text}
    onPress={onPress}
    containerStyle={{
      backgroundColor: colors[1104],
      height: px2dp(104),
    }}
    textStyle={{
      color: colors[1102],
    }}
    {...props}
  />
);

LogOutBtn.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

module.exports = { Item, LogOutBtn };
