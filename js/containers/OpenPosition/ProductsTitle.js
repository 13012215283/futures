import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, sizes } from '../../components/themes';
import { px2dp } from '../../utils/px2dp';
// @flow
type Props = {
  productName: 'string',
  productID: 'string',
};

export default class ProductsTitle extends Component<Props> {
  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.title}>{this.props.productName}</Text>
        <View style={styles.pid}>
          <Text style={styles.pidText}>{this.props.productID}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors['1001'],
    height: px2dp(100),
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: px2dp(32),
  },
  title: {
    fontSize: sizes.f4,
    color: colors.white,
  },
  pid: {
    height: px2dp(36),
    marginLeft: px2dp(32),
    paddingLeft: px2dp(10),
    paddingRight: px2dp(10),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.white,
    borderRadius: px2dp(18),
    justifyContent: 'center',
  },
  pidText: {
    fontSize: sizes.f0,
    textAlign: 'center',
    color: colors.white,
  },
});
