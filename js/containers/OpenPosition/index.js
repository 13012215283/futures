import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  // ScrollView,
  Keyboard,
} from 'react-native';
import equal from 'fast-deep-equal';

import { numberFormat } from 'futures/utils/numberFormat';
import { request } from 'futures/utils/request';
import { getStorageData } from 'futures/utils/getStorageData';
import { apis, errtips } from 'futures/constants';
import { noop } from 'futures/utils/noop';
import { navOptions } from 'futures/navigations';
import { Toast } from 'futures/components/Toast';
import BackBtn from 'futures/navigations/BackBtn';
import Dialog from 'futures/components/Dialog';
import Lasted5Price from 'futures/components/Lasted5Price';
import getBanks from 'futures/utils/getBanks';

import ProductsTitle from './ProductsTitle';
import Purchase from './Purchase';
import { compute } from './ComputeAmount';
import styles from './index.style';

// @flow
type Props = {
  navigation: Object,
};
/* eslint-disable no-console */
export default class OpenPosition extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const title = {
      GoLong: '建仓买入',
      GoShort: '建仓卖出',
    };
    const { params } = navigation.state;
    return navOptions(title[params.operation], navOptions.TYPE_RED, {
      headerLeft: <BackBtn navigation={navigation} />,
    });
  };

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    const { operation, productInfo } = params;
    let direction;
    if (operation === 'GoLong') {
      direction = '1';
    } else if (operation === 'GoShort') {
      direction = '2';
    }

    this.allowPrice = [];
    this.getAllowPriceFlg = true;
    this.state = {
      direction,
      margin: 0,
      position: 1,
      commission: 0,
      total: 0,
      gdsId: productInfo.gdsId,
      balance: '0',
      latestPrice: '0',
      minPosition: '1',
      maxPosition: '100',
      minPriceChangeUnit: '0.1',
      originalPrice: '',
      openPrice: '',
      buyPriceList: [],
      sellPriceList: [],
      shouldPay: false,
      dialog: {
        visible: false,
        content: '',
        button: [],
      },
      isLoading: true,
      id: '',
      price: '',
      verifyInfo: {
        rmAnFlg: '',
        bankCardNo: '',
        bankName: '',
        bankLogo: '',
      },
    };
    this.getChangedValue = this.getChangedValue.bind(this);
    this.getOpenPositionData = this.getOpenPositionData.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.order = this.order.bind(this);
    this.payCheck = this.payCheck.bind(this);
    this.inMoney = this.inMoney.bind(this);
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

  shouldComponentUpdate(nextProps, nextState) {
    return !equal(this.state, nextState);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  async getOpenPositionData(id) {
    try {
      const body = {
        '00': id,
        '03': this.state.gdsId,
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
        minPriceChangeUnit,
        originalPrice,
        openPrice,
      } = response;
      if (this.getAllowPriceFlg) {
        this.getAllowPrice(openPrice, minPriceChangeUnit);
      }
      this.setState({
        balance,
        latestPrice,
        buyPriceList,
        sellPriceList,
        isLoading: false,
        minPosition: Number(minNum),
        maxPosition: Number(maxNum),
        minPriceChangeUnit,
        originalPrice,
        openPrice,
      });
    } catch (e) {
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后再试', Toast.SHORT);
      }
    } finally {
      this.timer = setTimeout(this.getOpenPositionData.bind(this, id), 5000);
    }
  }

  getAllowPrice(openPrice, minPriceChangeUnit) {
    const parseMPC = Number(minPriceChangeUnit);
    const min = Number(openPrice) * 0.9;
    const max = Number(openPrice) * 1.1;

    let tmpNum = Number(openPrice);
    const maxArr = [];
    const minArr = [];
    for (; tmpNum <= max; tmpNum += parseMPC) {
      maxArr.push(tmpNum);
    }
    tmpNum = Number(openPrice) - parseMPC;
    for (; tmpNum >= min; tmpNum -= parseMPC) {
      minArr.push(tmpNum);
    }
    this.allowPrice = minArr.reverse().concat(maxArr);
    this.getAllowPriceFlg = false;
  }

  getChangedValue(price, position) {
    const { margin, commission } = compute(price, position);
    this.setState(
      {
        price,
        margin,
        position,
        commission,
        total: (Number(margin) + Number(commission)).toFixed(2),
      },
      () => {
        this.payBtnStatus();
      }
    );
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

  payBtnStatus() {
    const { position, price, total, balance } = this.state;
    this.setState({
      shouldPay: !!position && !!price && total <= Number(balance),
    });
  }

  payCheck() {
    const {
      total,
      minPosition,
      maxPosition,
      minPriceChangeUnit,
      originalPrice,
      position,
    } = this.state;
    const price = this.state.price.replace(/^0+(\d+)/, '$1');
    const numTotal = Number(total);
    const reminder = Math.abs((price - originalPrice) % minPriceChangeUnit);
    let ErrorMsg;
    console.log(this.allowPrice);
    if (Number.isNaN(Number(price))) {
      ErrorMsg = '建仓价格不合法';
    }
    if (Number.isNaN(Number(position))) {
      ErrorMsg = '建仓手数不合法';
    }
    if (position > maxPosition || position < minPosition) {
      ErrorMsg = '建仓手数不能超出可建仓范围';
    }

    if (numTotal <= 0) {
      ErrorMsg = '建仓总价格为零';
    }
    if (reminder !== 0) {
      ErrorMsg = `建仓价格不符，该品种最小价格变动单位为${minPriceChangeUnit}`;
    }

    if (
      Number(price) < this.allowPrice[0] ||
      Number(price) > this.allowPrice[this.allowPrice.length - 1]
    ) {
      ErrorMsg = '价格超出涨跌停板';
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

      const { gdsId, position, direction, id } = this.state;
      const price = this.state.price.replace(/^0+(\d+)/, '$1');

      const body = {
        '00': id,
        '03': gdsId,
        '24': price,
        '05': position,
        '25': direction,
      };

      const response = await request(apis.EntrustC_addEntrust, body);
      const { time, price: positionPrice, num } = response;
      this.props.navigation.navigate('Entrust', {
        operation,
        productInfo,
        num,
        price: positionPrice,
        time,
      });
    } catch (e) {
      const { minPriceChangeUnit } = this.state;
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else if (e.code === 'OPENINGPRICE_ERROR_MIN') {
        Toast.show(
          `建仓价格不符，该品种最小价格变动单位为${minPriceChangeUnit}`,
          Toast.SHORT
        );
      } else {
        Toast.show('未知错误，请稍后再试', Toast.SHORT);
      }
    }
  }

  inMoney() {
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
  }

  showDialog(isVisible, content = '', button = [], callback = () => {}) {
    console.log(isVisible);
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

  render() {
    const { navigation } = this.props;
    const { params } = navigation.state;
    const { productInfo, yesterdayBalance } = params;

    const {
      latestPrice,
      balance,
      shouldPay,
      buyPriceList,
      sellPriceList,
      total,
      margin,
      commission,
      dialog,
      isLoading,
      minPosition,
      maxPosition,
      minPriceChangeUnit,
      originalPrice,
      openPrice,
    } = this.state;

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
              <Purchase
                latestPrice={latestPrice}
                openPrice={openPrice}
                changedValue={this.getChangedValue}
                minPosition={minPosition}
                maxPosition={maxPosition}
                minPriceChangeUnit={minPriceChangeUnit}
                originalPrice={originalPrice}
                allowPrices={this.allowPrice}
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
              <Text style={styles.costTips}>
                保证金&yen;{numberFormat(`${margin}`)} + 交易手续费&yen;{numberFormat(
                  `${commission}`
                )}
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
