import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import TailPaymentSuccessStyle from './Styles';

const styles = StyleSheet.create(TailPaymentSuccessStyle);

export default class TailPaymentSuccess extends Component {
  // 返回持仓
  static returnToPosition() {}

  // 查看交割进度
  static deliverySchedule() {}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconTitleContent}>
          <Text style={styles.successIcon}>&#xe6d6;</Text>
          <Text style={styles.titleText}>补款成功!</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText}>
            恭喜你支付成功！{'\n'}平台会尽快审核您的支付详情{'\n'}请随时关注您的审核进度
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.returnToPosition}
            onPress={TailPaymentSuccess.returnToPosition}
          >
            <Text style={styles.returnToPositionText}>返回持仓</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deliverySchedule}
            onPress={TailPaymentSuccess.deliverySchedule}
          >
            <Text style={styles.deliveryScheduleText}>查看交割进度</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
