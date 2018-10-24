import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import noop from 'futures/utils/noop';
import { BothSideContainer } from 'futures/components/TradeBlock';
import style from './style';

/**
 * @property isEnough 可用的金额
 * @property balance 可用的金额
 */

export default class AvailPayment extends Component {
  static defaultProps = {
    balance: '',
    isEnough: false,
    actionForInMoney: noop,
  };

  render() {
    const { balance, isEnough, actionForInMoney } = this.props;

    return (
      <BothSideContainer containerStyle={style.balanceContainer}>
        <Text style={style.nameText}>可用金额</Text>
        <View style={style.balanceTip}>
          <TouchableOpacity onPress={actionForInMoney}>
            <Text style={style.actionText} onPress={this.itemNoticeOnPress}>
              {isEnough ? '' : '金额不足 请入金 >'}
            </Text>
          </TouchableOpacity>
          <Text style={style.valueText}>{balance}</Text>
        </View>
      </BothSideContainer>
    );
  }
}

AvailPayment.propTypes = {
  balance: PropTypes.string,
  isEnough: PropTypes.bool,
  actionForInMoney: PropTypes.func,
};
