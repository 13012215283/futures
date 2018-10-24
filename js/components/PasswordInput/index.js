import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { sizes, colors } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';
import PasswordInput from './PasswordInput';

// @flow
type Props = {
  title: string,
};
class Password extends Component<Props> {
  render() {
    const { title, ...props } = this.props;

    return (
      <View style={style.box}>
        <Text style={style.tips}>{title}</Text>
        <PasswordInput maxLength={6} {...props} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tips: {
    color: colors[1101],
    fontSize: sizes.f2,
    height: px2dp(104),
    textAlignVertical: 'center',
  },
});

export default Password;
