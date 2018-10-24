import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { numberFormat } from 'futures/utils/numberFormat';
import PaymentBar from 'futures/components/PaymentBar';
import AvailPayment from 'futures/components/AvailPayment';
import noop from 'futures/utils/noop';
import PurchasePaymentStyle from './style';

const styles = StyleSheet.create(PurchasePaymentStyle);

/**
 * @property balance 可用金额
 * @property deliveryPrice 总计
 */

export default class PurchasePayment extends Component {
  // 列表按钮点击
  static itemNoticeOnPress() {}

  static defaultProps = {
    children: <View />,
    balance: '0',
    deliveryPrice: '0',
    actionForPaying: noop,
    actionForInMoney: noop,
    addNewAddress: noop,
    changeAddress: noop,
    address: '',
    mobile: '',
    realname: '',
  };

  constructor(props) {
    super(props);
    const { address, mobile, realname, balance } = this.props;
    this.state = {
      address,
      mobile,
      realname,
      balance,
    };

    this.actionForPaying = this.actionForPaying.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { address, mobile, realname, balance } = nextProps;
    this.setState({
      address,
      mobile,
      realname,
      balance,
    });
  }

  actionForPaying = () => {
    this.props.actionForPaying();
  };

  actionForInMoney = () => {
    this.props.actionForInMoney();
  };

  renderAdressView(address, realname, mobile) {
    if (address) {
      return (
        <TouchableOpacity onPress={this.props.changeAddress}>
          <View style={styles.adressView}>
            <Text style={styles.adressNoti}>订单配送至</Text>
            <Text style={styles.adressDetail} numberOfLines={1}>
              {address}
            </Text>
            <Text style={styles.adressDetail} numberOfLines={1}>
              {`${realname} ${mobile}`}
            </Text>
            <Text style={styles.icon} numberOfLines={1}>
              &#xe6d6;
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.adressDefaultView}>
        <Text style={styles.adressNoti}>订单配送至</Text>
        <TouchableOpacity
          style={styles.addAdressContainer}
          onPress={this.props.addNewAddress}
        >
          <View style={styles.addAdressButton}>
            <Text style={styles.addAdressText}>+ 添加收货地址</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { deliveryPrice } = this.props;
    const { address, mobile, realname, balance } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.topArea}>
          <View style={styles.infoList}>{this.props.children}</View>
          {this.renderAdressView(address, mobile, realname)}
          <AvailPayment
            balance={numberFormat(parseFloat(balance).toFixed(2))}
            isEnough={parseFloat(balance) >= parseFloat(deliveryPrice)}
            actionForInMoney={this.actionForInMoney}
          />
        </View>
        <PaymentBar
          totalPayment={deliveryPrice}
          enterOnPress={this.actionForPaying}
          buttonDisabled={
            parseFloat(balance) <= parseFloat(deliveryPrice) || address === ''
          }
        />
      </View>
    );
  }
}

PurchasePayment.propTypes = {
  children: PropTypes.element,
  balance: PropTypes.string,
  deliveryPrice: PropTypes.string,
  actionForPaying: PropTypes.func,
  address: PropTypes.string,
  mobile: PropTypes.string,
  realname: PropTypes.string,
  actionForInMoney: PropTypes.func,
  addNewAddress: PropTypes.func,
  changeAddress: PropTypes.func,
};
