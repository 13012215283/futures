import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { numberFormat } from 'futures/utils/numberFormat';
import paymentBarStyle from './Styles';
// @flow
const styles = StyleSheet.create(paymentBarStyle);

type Props = {
  enterOnPress: Function,
  totalPayment: string,
  buttonDisabled: boolean,
};
export default class PaymentBar extends Component<Props> {
  render() {
    const { enterOnPress, totalPayment, buttonDisabled } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.paymentInfo}>
          <Text style={styles.totalText}>
            总计: ¥
            <Text style={[styles.totalTex, styles.fontSizeF5]}>
              {numberFormat(parseFloat(totalPayment).toFixed(2))}
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          style={
            buttonDisabled
              ? [styles.paymentButton, styles.disabledBackgroundColor]
              : styles.paymentButton
          }
          onPress={enterOnPress}
          disabled={buttonDisabled}
        >
          <Text style={styles.paymentButtonText}>确认支付</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
PaymentBar.defaultProps = {
  enterOnPress() {},
  totalPayment: '0',
  tailPayment: '0',
  serviceCharge: '0',
  buttonDisabled: false,
};
