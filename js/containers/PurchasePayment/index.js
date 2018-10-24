import React, { Component } from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';

import { Purchase } from 'futures/components/Payment';
import { ReplenishSucess } from 'futures/containers/OperationFeedBack';
import Dialog from 'futures/components/Dialog';
import noop from 'futures/utils/noop';

export default class PurchasePayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialog: false,
      sucessPay: false,
    };

    /** 空函数定义 */
    this.noop = noop;

    this.actionForPaying = this.actionForPaying.bind(this);
    this.surePay = this.surePay.bind(this);
    this.cancelPay = this.cancelPay.bind(this);
    this.checkDelyProgress = this.checkDelyProgress.bind(this);
    this.returnPosition = this.returnPosition.bind(this);
  }

  /** 付款按钮的点击事件 */
  actionForPaying() {
    this.setState({
      showDialog: true,
    });
  }

  /** 弹框确定的点击事件 */
  surePay() {
    this.setState({
      sucessPay: true,
    });
  }

  /** 弹框的取消点击事件 */
  cancelPay() {
    this.setState({
      showDialog: false,
    });
  }

  /** 返回到持仓页面 */
  returnPosition() {
    this.props.navigation.navigate('HomePage');
  }

  /** 查看交割 */
  checkDelyProgress() {
    this.noop();
  }

  render() {
    const data = {
      availPay: 12000,
      totalPayment: 23456.78,
      tailPayment: 1234.0,
      serviceCharge: 617.28,
    };

    const { showDialog, sucessPay } = this.state;
    if (sucessPay) {
      return (
        <ReplenishSucess
          returnPosition={this.returnPosition}
          checkDelyProgress={this.checkDelyProgress}
        />
      );
    }
    return (
      <View style={{ height: '100%' }}>
        <Purchase {...data} actionForPaying={this.actionForPaying} />
        <Dialog
          content="您是否要继续进行付款操作？"
          header="提示"
          visible={showDialog}
          button={[
            {
              name: '确认',
              callback: this.surePay,
            },
            {
              name: '取消',
              callback: this.cancelPay,
            },
          ]}
        />
      </View>
    );
  }
}

PurchasePayment.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.object).isRequired,
};
