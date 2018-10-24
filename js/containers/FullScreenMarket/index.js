import React, { Component } from 'react';
import {
  View,
  Text,
  BackHandler,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import equal from 'fast-deep-equal';

import { apis, errtips } from 'futures/constants';
import { request } from 'futures/utils/request';
import { numberFormat, twoDecimal } from 'futures/utils/numberFormat';
import { Toast } from 'futures/components/Toast';
import ScreenCtrl from 'futures/components/ScreenCtrl';
import CandleStickChart from 'futures/components/CandleStickChart';
import Lasted5Price from 'futures/components/Lasted5Price';
import styles from './styles';

// @flow
type Props = {
  navigation: Object,
};

export default class FullScreenMarket extends Component<Props> {
  static exitFullScreen() {
    ScreenCtrl.getOrientation(() => {
      ScreenCtrl.rotateScreen(ScreenCtrl.PORTRAIT);
    });
  }

  constructor(props) {
    super(props);
    const { productInfo } = props.navigation.state.params;
    this.state = {
      kChartType: 'tendency',
      dealDetail: [],
      goLongArr: [],
      goShortArr: [],
      isLoading: true,
      productInfo,
    };

    this.getFutureMarketData = this.getFutureMarketData.bind(this);
    this.goBackFullScreen = this.goBackFullScreen.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      FullScreenMarket.exitFullScreen
    );
  }

  componentDidMount() {
    this.getFutureMarketData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !equal(this.state, nextState);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    BackHandler.removeEventListener(
      'hardwareBackPress',
      FullScreenMarket.exitFullScreen
    );
  }

  async getFutureMarketData() {
    try {
      const { productInfo } = this.state;
      const { gdsId } = productInfo;

      const body = {
        '03': gdsId,
      };

      const response = await request(apis.GdsC_gdsTradeDetail, body);
      const { gds, gdsin, gdsout } = response;
      const dealDetail = Object.assign({}, gds, {
        todayOpenPrice: gds.openingPrice,
        lowDealPrice: gds.minDealPrice,
      });

      this.setState({
        dealDetail,
        goLongArr: gdsin,
        goShortArr: gdsout,
        isLoading: false,
      });
    } catch (e) {
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后重试', Toast.SHORT);
      }
    } finally {
      this.timer = setTimeout(this.getFutureMarketData, 5000);
    }
  }

  changeWebView(type) {
    return () => {
      this.setState({
        kChartType: type,
      });
    };
  }

  goBackFullScreen() {
    const { navigation } = this.props;
    FullScreenMarket.exitFullScreen();
    navigation.goBack();
  }

  render() {
    const {
      kChartType,
      isLoading,
      productInfo,
      dealDetail,
      goLongArr,
      goShortArr,
    } = this.state;

    if (isLoading) {
      return <View />;
    }

    const { gdsId, gdsDesc } = productInfo;
    const {
      buyNum,
      sellNum,
      yesterdayBalance,
      holdingNum,
      lowDealPrice,
      maxDealPrice,
      todayOpenPrice,
      uptodatePrice,
      upOrDownScope,
      upOrDownPrice,
    } = dealDetail;

    const priceOptions = [
      {
        title: '最高',
        value: twoDecimal(maxDealPrice || 0),
        textStyle: Lasted5Price.compareVal(
          Number(maxDealPrice),
          Number(yesterdayBalance)
        ),
      },
      {
        title: '持仓',
        value: holdingNum || 0,
        textStyle: styles.volumeTextColor,
      },
      {
        title: '买量',
        value: buyNum || 0,
        textStyle: styles.volumeTextColor,
      },
      {
        title: '最低',
        value: twoDecimal(lowDealPrice || 0),
        textStyle: Lasted5Price.compareVal(
          Number(lowDealPrice),
          Number(yesterdayBalance)
        ),
      },
      {
        title: '昨收',
        value: twoDecimal(yesterdayBalance || 0),
        textStyle: styles.whiteTextColor,
      },
      {
        title: '卖量',
        value: sellNum || 0,
        textStyle: styles.volumeTextColor,
      },
    ];

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.header}>
          <View style={styles.productInfoContainer}>
            <View style={styles.productInfo}>
              <View style={styles.headerProductTextCenter}>
                <Text style={styles.productName}>{gdsDesc}</Text>
              </View>
              <View style={styles.headerProductSubTextCenter}>
                <Text style={styles.productId}>{gdsId}</Text>
              </View>
            </View>
            <View style={styles.lastedPriceContainer}>
              <View style={styles.lastedPriceView}>
                <Text style={styles.priceTitle}>最新</Text>
                <Text
                  style={[
                    styles.lastedPrice,
                    Lasted5Price.compareVal(
                      Number(uptodatePrice),
                      Number(yesterdayBalance)
                    ),
                  ]}
                >
                  {twoDecimal(uptodatePrice) || 0}
                </Text>
              </View>
              <View style={styles.lastedPriceSubContainer}>
                <Text style={styles.priceItem}>
                  今开&nbsp;&nbsp;<Text
                    style={Lasted5Price.compareVal(
                      Number(todayOpenPrice),
                      Number(yesterdayBalance)
                    )}
                  >
                    {twoDecimal(todayOpenPrice) || 0}
                  </Text>
                </Text>
                <Text style={styles.priceItem}>
                  涨跌&nbsp;&nbsp;<Text
                    style={Lasted5Price.compareVal(Number(upOrDownPrice), 0)}
                  >
                    {numberFormat(Math.abs(upOrDownPrice)) || 0}
                  </Text>
                </Text>
                <Text style={styles.priceItem}>
                  涨幅&nbsp;&nbsp;<Text
                    style={Lasted5Price.compareVal(Number(upOrDownScope), 0)}
                  >
                    {`${(upOrDownScope * 100).toFixed(2)}%` || 0}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.realtimeDeal}>
            {priceOptions.map(option => (
              <View style={styles.productPriceItem} key={option.title}>
                <Text style={styles.productPriceItemTitle}>{option.title}</Text>
                <Text style={[styles.productPriceText, option.textStyle]}>
                  {option.value}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.tabsContainer}>
          <View style={styles.tabsView}>
            {[
              { field: 'tendency', text: '分时' },
              { field: 'daily', text: '日线' },
              { field: 'weekly', text: '周线' },
            ].map(item => (
              <TouchableWithoutFeedback
                key={item.field}
                onPressIn={this.changeWebView(item.field)}
              >
                <View style={styles.tabView}>
                  <Text
                    style={
                      kChartType === item.field
                        ? styles.activeTabText
                        : styles.tabText
                    }
                  >
                    {item.text}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
          <TouchableWithoutFeedback onPressIn={this.goBackFullScreen}>
            <View style={styles.goBackView}>
              <Text style={styles.goBackIcon}>&#xe807;</Text>
              <Text style={styles.goBackText}>返回</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.productChart}>
          <View style={styles.chartView}>
            <CandleStickChart id={gdsId} type={kChartType} />
          </View>
          <View style={styles.lastedDealView}>
            <View style={styles.goShortDealView}>
              <Lasted5Price
                dealArr={goShortArr}
                direction="GoShort"
                textViewStyle={styles.dealTextView}
                titleStyle={styles.dealTitleStyle}
                priceStyle={styles.dealPriceStyle}
                volumeStyle={styles.dealVolumeStyle}
                yesterdayBalance={yesterdayBalance}
                isReverse
              />
            </View>
            <View style={styles.goLongDealView}>
              <Lasted5Price
                dealArr={goLongArr}
                direction="GoLong"
                textViewStyle={styles.dealTextView}
                titleStyle={styles.dealTitleStyle}
                priceStyle={styles.dealPriceStyle}
                volumeStyle={styles.dealVolumeStyle}
                yesterdayBalance={yesterdayBalance}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
