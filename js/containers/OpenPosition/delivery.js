import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text, Keyboard } from 'react-native';

import { numberFormat } from 'futures/utils/numberFormat';
import { noop } from 'futures/utils/noop';
import { request } from 'futures/utils/request';
import { getStorageData } from 'futures/utils/getStorageData';
import { apis, errtips } from 'futures/constants';
import { Toast } from 'futures/components/Toast';
import Dialog from 'futures/components/Dialog';
import Lasted5Price from 'futures/components/Lasted5Price';
import getBanks from 'futures/utils/getBanks';

import PurchaseDelivery from './PurchaseDelivery';
import ProductsTitle from './ProductsTitle';
import OpenPostion from './index';
import styles from './index.style';

// @flow
type Props = {
  navigation: Object,
};

export default class OpenPositionDelivery extends Component<Props> {
  static navigationOptions = OpenPostion.navigationOptions;

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    const { operation } = params;
    let direction;
    if (operation === 'GoLong') {
      direction = '1';
    } else if (operation === 'GoShort') {
      direction = '2';
    }
    this.state = {
      direction,
      shouldPay: false,
      total: 0,
      id: '',
      balance: '0',
      latestPrice: '0',
      buyPriceList: [],
      sellPriceList: [],
      isLoading: true,
      minPosition: '1',
      maxPosition: '100',
      address: '',
      addressId: '',
      addressCount: '0',
      realname: '',
      mobile: '',
      dialog: {
        visible: false,
        content: '',
        button: [],
      },
      position: '0',
      verifyInfo: {
        rmAnFlg: '',
        bankCardNo: '',
        bankName: '',
        bankLogo: '',
      },
    };
    this.addrList = [];
    this.getChangedValue = this.getChangedValue.bind(this);
    this.addAddress = this.addAddress.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.payCheck = this.payCheck.bind(this);
    this.order = this.order.bind(this);
  }

  async componentDidMount() {
    this.banks = await getBanks();

    getStorageData('id').then(id => {
      this.setState({
        id,
      });
      this.getOpenPositionData(id);
      this.getVerifyInfo(id);
    });
  }

  async getOpenPositionData(id) {
    try {
      const { params } = this.props.navigation.state;
      const { productInfo } = params;
      const { gdsId } = productInfo;

      const body = {
        '00': id,
        '03': gdsId,
        '25': this.state.direction,
      };

      const response = await request(apis.EntrustC_latestData, body);
      const {
        balance,
        latestPrice,
        buyPriceList,
        sellPriceList,
        minNum,
        maxNum,
        yesterdayBalance,
        address,
        addressId,
        size,
        realname,
        mobile,
      } = response;

      this.setState({
        yesterdayBalance,
        balance,
        latestPrice,
        buyPriceList,
        sellPriceList,
        isLoading: false,
        minPosition: Number(minNum),
        maxPosition: Number(maxNum),
        address,
        addressId,
        addressCount: size,
        realname,
        mobile,
      });
    } catch (e) {
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后再试', Toast.SHORT);
      }
    } finally {
      // this.timer = setTimeout(this.getOpenPositionData.bind(this, id), 5000);
    }
  }

  getChangedValue(price, position) {
    const { addressId } = this.state;
    const total = Number(price) * Number(position);
    this.setState({
      total,
      position,
      shouldPay: !!addressId && !!+total,
    });
  }

  async getVerifyInfo(id) {
    try {
      const response = await request(apis.UserC_searchAuth, {
        '00': id,
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

  addAddress() {
    const { addressCount, id } = this.state;
    if (+addressCount > 0) {
      this.changeAddress();
      return;
    }
    const { navigation } = this.props;
    navigation.navigate('AddAddress', {
      uId: id,
      operation: 'add',
      data: {},
      updateAddress: this.updateAddress,
    });
  }

  changeAddress() {
    const { id } = this.state;
    const { navigation } = this.props;
    navigation.navigate('Address', {
      uId: id,
      selectId: this.state.addressId,
      updateAddress: this.updateAddress,
      canSelect: true,
    });
  }

  updateAddress(addressInfo = {}, addressCount = 1) {
    const { total } = this.state;
    const { city, province, detailed, mobile, name, id } = addressInfo;
    this.setState({
      addressCount,
      addressId: id || '',
      address: `${province || ''} ${city || ''} ${detailed || ''}`,
      realname: name || '',
      mobile,
      shouldPay: !!id && !!+total,
    });
  }

  payCheck() {
    const { total } = this.state;
    let ErrorMsg;
    if (Number.isNaN(total) || total < 0) {
      ErrorMsg = '输入的价格或手数不合法';
    }
    if (ErrorMsg) {
      Toast.show(ErrorMsg, Toast.SHORT);
      return;
    }
    this.showDialog(true, '您确定要建仓吗？', [
      { name: '取消', callback: this.showDialog(false, '', []) },
      {
        name: '确认',
        callback: this.showDialog(false, '', [], this.order),
      },
    ])();
  }

  async order() {
    try {
      const { operation, productInfo } = this.props.navigation.state.params;
      const { gdsId } = productInfo;
      const { position, id, addressId } = this.state;
      // const price = this.state.price.replace(/^0+(\d+)/, '$1');

      const body = {
        '00': id,
        '03': gdsId,
        '05': position,
        '55': addressId,
      };

      const response = await request(apis.EntrustC_buy, body);
      const { time, price: positionPrice, num } = response;
      this.props.navigation.navigate('Entrust', {
        operation,
        productInfo,
        num,
        price: positionPrice,
        time,
      });
    } catch (e) {
      console.log(e.code);
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后再试', Toast.SHORT);
      }
    }
  }

  inMoney = () => {
    const { navigation } = this.props;

    const { verifyInfo, id } = this.state;
    this.showDialog(true, '余额不足，请入金', [
      { name: '取消', callback: this.showDialog(false, '', []) },
      {
        name: '前往入金',
        callback: this.showDialog(false, '', [], () => {
          const { rmAnFlg, bankCardNo, bankLogo, bankName } = verifyInfo;
          if (rmAnFlg !== 4) {
            navigation.navigate('Withdraw', {
              uId: id,
              isRealAccount: true,
              bankCardNo,
              bankName,
              bankLogo,
            });
          } else {
            this.showDialog(true, '您尚未进行过身份认证', [
              { name: '取消', callback: this.showDialog(false, '', []) },
              {
                name: '前往认证',
                callback: this.showDialog(false, '', [], () => {
                  navigation.navigate('Identity', {
                    uId: id,
                  });
                }),
              },
            ]);
          }
        }),
      },
    ])();
  };

  showDialog(isVisible, content = '', button = [], callback = () => {}) {
    return () => {
      this.setState(
        {
          dialog: {
            visible: isVisible,
            content,
            button,
          },
        },
        () => {
          callback();
        }
      );
    };
  }

  renderAddress() {
    const { addressId, mobile, realname, address } = this.state;
    if (addressId) {
      return (
        <TouchableWithoutFeedback onPress={this.changeAddress}>
          <View style={styles.adressDefaultView}>
            <Text style={styles.adressNoti}>订单配送至</Text>
            <Text style={styles.adressDetail} numberOfLines={1}>
              {address}
            </Text>
            <Text style={styles.adressDetail} numberOfLines={1}>
              {`${realname} ${mobile}`}
            </Text>
            <Text style={styles.icon} numberOfLines={1}>
              &#xe802;
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return (
      <View style={styles.adressDefaultView}>
        <Text style={styles.adressNoti}>订单配送至</Text>
        <TouchableWithoutFeedback
          style={styles.addAdressContainer}
          onPress={this.addAddress}
        >
          <View style={styles.addAdressButton}>
            <Text style={styles.addAdressText}>+ 添加收货地址</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  render() {
    const {
      shouldPay,
      total,
      isLoading,
      balance,
      buyPriceList,
      sellPriceList,
      minPosition,
      maxPosition,
      latestPrice,
      yesterdayBalance,
      dialog,
    } = this.state;
    const { navigation } = this.props;
    const { params } = navigation.state;
    const { productInfo } = params;
    if (isLoading) {
      return <View />;
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <ProductsTitle
            productName={productInfo.gdsName}
            productID={productInfo.gdsId}
          />
          <View style={{ flex: 1 }}>
            <View style={styles.openPosition}>
              <PurchaseDelivery
                latestPrice={latestPrice}
                changedValue={this.getChangedValue}
                minPosition={minPosition}
                maxPosition={maxPosition}
              />
              <View style={styles.priceContainer}>
                <View style={styles.goLongContainer}>
                  <View style={styles.realtimePrice}>
                    <Lasted5Price
                      priceStyle={styles.lasted5PricePriceStyle}
                      volumeStyle={styles.lasted5PriceVolumeStyle}
                      titleStyle={styles.openDealNum}
                      textViewStyle={styles.lasted5PriceTextView}
                      direction="GoShort"
                      dealArr={sellPriceList}
                      yesterdayBalance={yesterdayBalance}
                      isReverse
                    />
                  </View>
                </View>
                <View>
                  <View style={styles.realtimePrice}>
                    <Lasted5Price
                      priceStyle={styles.lasted5PricePriceStyle}
                      volumeStyle={styles.lasted5PriceVolumeStyle}
                      titleStyle={styles.openDealNum}
                      textViewStyle={styles.lasted5PriceTextView}
                      direction="GoLong"
                      dealArr={buyPriceList}
                      yesterdayBalance={yesterdayBalance}
                    />
                  </View>
                </View>
              </View>
            </View>
            {this.renderAddress()}
            <View style={styles.avlBalanceView}>
              <Text style={styles.avlBalanceText}>可用金额</Text>
              <View style={styles.currentBalanceView}>
                {total > Number(balance) ? (
                  <TouchableWithoutFeedback onPress={this.inMoney}>
                    <View style={styles.insufficientView}>
                      <Text style={styles.insufficient}>
                        余额不足，请入金 &gt;
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                  <View />
                )}
                <Text style={styles.currentBalanceText}>
                  &yen;{numberFormat(Number(balance).toFixed(2))}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.toolbar}>
            <View style={styles.totalView}>
              <Text style={styles.total}>
                总计：&yen;{' '}
                <Text style={styles.totalMoney}>
                  {numberFormat(`${total}`)}
                </Text>
              </Text>
            </View>
            <TouchableWithoutFeedback
              onPress={shouldPay ? this.payCheck : noop}
            >
              <View
                style={[
                  shouldPay ? styles.activePayment : styles.inactivePayment,
                  styles.paymentBtn,
                ]}
              >
                <Text style={styles.paymentText}>确认支付</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Dialog
            header="提示"
            content={dialog.content}
            visible={dialog.visible}
            button={dialog.button}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
