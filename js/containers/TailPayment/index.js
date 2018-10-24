import React, { Component } from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import { apis, errtips } from 'futures/constants';
import { request } from 'futures/utils/request';
import { Toast } from 'futures/components/Toast';
import { Tail } from 'futures/components/Payment';
import { ReplenishSucess } from 'futures/containers/OperationFeedBack';
import Dialog from 'futures/components/Dialog';
import noop from 'futures/utils/noop';
import getBanks from 'futures/utils/getBanks';

export default class PurchasePayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialog: false,
      sucessPay: false,
      deliveryData: {},
      deliveryId: '',
      addressId: '',
      adressCount: 0,
      verifyInfo: {
        rmAnFlg: '',
        bankCardNo: '',
        bankName: '',
        bankLogo: '',
      },
    };

    /** 空函数定义 */
    this.noop = noop;
    this.actionForPaying = this.actionForPaying.bind(this);
    this.actionForInMoney = this.actionForInMoney.bind(this);
    this.inMoneySussess = this.inMoneySussess.bind(this);
    this.surePay = this.surePay.bind(this);
    this.cancelPay = this.cancelPay.bind(this);
    this.checkDelyProgress = this.checkDelyProgress.bind(this);
    this.returnPosition = this.returnPosition.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.addNewAddress = this.addNewAddress.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
  }

  async componentDidMount() {
    this.getPaymentData();
    this.banks = await getBanks();
    this.getVerifyInfo();
  }

  /** 请求数据 */
  async getPaymentData() {
    try {
      const { futureId, uid } = this.props.navigation.state.params;
      const body = {
        '03': futureId,
        '00': uid,
      };

      const response = await request(apis.DeliveryC_paymentData, body);
      const { addressId, size } = response;
      this.setState({
        deliveryData: response,
        addressId,
        adressCount: Number(size),
      });
    } catch (e) {
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后重试', Toast.SHORT);
      }
    }
  }

  async getVerifyInfo() {
    try {
      const { uid } = this.props.navigation.state.params;
      const response = await request(apis.UserC_searchAuth, {
        '00': uid,
      });
      const { bankCardNo, bankName, rmAnFlg } = response;

      this.setState({
        verifyInfo: {
          rmAnFlg,
          bankCardNo,
          bankName: this.banks[bankName] && this.banks[bankName].name,
          bankLogo: this.banks[bankName] && this.banks[bankName].icon,
        },
      });
    } catch (e) {
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后再试', Toast.SHORT);
      }
    }
  }

  inMoneySussess(addValue) {
    const { deliveryData } = this.state;
    deliveryData.balance =
      parseFloat(deliveryData.balance) + parseFloat(addValue);
    this.setState({
      deliveryData,
    });
  }

  /** 入金点击事件 */
  actionForInMoney() {
    const { navigation } = this.props;
    const { uid } = navigation.state.params;
    const { verifyInfo } = this.state;
    const { bankCardNo, bankLogo, bankName } = verifyInfo;
    navigation.navigate('Withdraw', {
      uId: uid,
      isRealAccount: true,
      bankCardNo,
      bankName,
      bankLogo,
      inMoneySuccess: this.inMoneySussess,
    });
  }

  /** 付款按钮的点击事件 */
  actionForPaying() {
    this.setState({
      showDialog: true,
    });
  }

  addNewAddress() {
    const { adressCount } = this.state;
    if (adressCount > 0) {
      this.changeAddress();
      return;
    }
    const { navigation } = this.props;
    const { uid } = navigation.state.params;
    navigation.navigate('AddAddress', {
      uId: uid,
      operation: 'add',
      data: {},
      updateAddress: this.updateAddress,
    });
  }

  changeAddress() {
    const { navigation } = this.props;
    const { uid } = navigation.state.params;
    navigation.navigate('Address', {
      uId: uid,
      selectId: this.state.addressId,
      updateAddress: this.updateAddress,
      canSelect: true,
    });
  }

  updateAddress(addressInfo, adressCount = 1) {
    const obj = {
      city: addressInfo.city || '',
      province: addressInfo.province || '',
      detailed: addressInfo.detailed || '',
      mobile: addressInfo.mobile || '',
      name: addressInfo.name || '',
      addressId: addressInfo.id || '',
    };

    const { city, province, detailed, mobile, name, addressId } = obj;
    const { deliveryData } = this.state;
    deliveryData.address =
      addressId === '' ? '' : `${province} ${city} ${detailed}`;
    deliveryData.mobile = mobile;
    deliveryData.realname = name;
    deliveryData.addressId = addressId;

    this.setState({
      adressCount,
      deliveryData,
      addressId,
    });
  }

  /** 弹框确定的点击事件 */
  async surePay() {
    try {
      const { futureId, uid } = this.props.navigation.state.params;
      const body = {
        '03': futureId,
        '00': uid,
        '55': this.state.addressId,
      };
      const response = await request(apis.DeliveryC_payment, body);
      const { orderId } = response;
      this.setState({
        deliveryId: orderId,
        sucessPay: true,
      });
    } catch (e) {
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后重试', Toast.SHORT);
      }
    }
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
    const { navigation } = this.props;
    const { uid, futureId } = navigation.state.params;
    const { futureName } = this.state.deliveryData;
    navigation.navigate('DeliverySchedule', {
      productName: futureName,
      productCode: futureId,
      uId: uid,
      deliveryId: this.state.deliveryId,
    });
  }

  render() {
    const { deliveryData, showDialog, sucessPay } = this.state;
    const { futureId } = this.props.navigation.state.params;
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
        <Tail
          {...deliveryData}
          futureId={futureId}
          actionForPaying={this.actionForPaying}
          actionForInMoney={this.actionForInMoney}
          addNewAddress={this.addNewAddress}
          changeAddress={this.changeAddress}
        />
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
