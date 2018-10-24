import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  DeviceEventEmitter,
} from 'react-native';
import equal from 'fast-deep-equal';
// import BottomBar from 'futures/containers/FuturesMarket/BottomBar';
import { apis, errtips } from 'futures/constants';
import { request } from 'futures/utils/request';
import { numberFormat } from 'futures/utils/numberFormat';
import ScreenCtrl from 'futures/components/ScreenCtrl';
import { Toast } from 'futures/components/Toast';
import Tabs from 'futures/components/Tabs';
import CandleStickChart from 'futures/components/CandleStickChart';
import Lasted5Price from 'futures/components/Lasted5Price';
import styles from './styles';

// @flow
type Props = {
  navigation: Object,
  screenProps: Object,
};
type States = {
  isStar: boolean,
};

export default class FuturesMarket extends Component<Props, States> {
  static compareVal(a, b) {
    let color;
    if (a > b) {
      color = styles.redText;
    } else if (a === b) {
      color = styles.whiteText;
    } else {
      color = styles.greenText;
    }
    return color;
  }

  static lastedData(title, textParams, index) {
    return (
      <View style={styles.textView} key={index}>
        <Text style={styles.dataTitle}>{title}</Text>
        <Text style={[styles.lastedData, textParams.style]}>
          {textParams.text}
        </Text>
      </View>
    );
  }

  constructor(props) {
    super(props);
    const { productInfo } = props.screenProps.params;

    const { gdsId } = productInfo;

    this.tendencyChat = <CandleStickChart id={gdsId} type="tendency" />;
    this.dailyChat = <CandleStickChart id={gdsId} type="daily" />;
    this.weeklyChat = <CandleStickChart id={gdsId} type="weekly" />;

    this.state = {
      dealDetail: {},
      goLongArr: [],
      goShortArr: [],
      isLoading: true,
      productInfo,
      isFocused: false,
    };
    this.getFutureMarketData = this.getFutureMarketData.bind(this);
    this.fullScreen = this.fullScreen.bind(this);
  }

  componentDidMount() {
    this.didBlurSubscription = this.props.navigation.addListener(
      'didBlur',
      payload => {
        // eslint-disable-next-line
        console.debug('didBlur', payload);
        DeviceEventEmitter.emit('showBtn', false);
        this.setState({
          isFocused: false,
        });
      }
    );

    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.setState({
          isFocused: true,
        });
        DeviceEventEmitter.emit('showBtn', true);
        // eslint-disable-next-line
        console.debug('willFocus', payload);
      }
    );

    this.getFutureMarketData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !equal(this.state, nextState);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.didBlurSubscription.remove();
    this.willFocusSubscription.remove();
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

  fullScreen() {
    const { navigation } = this.props;
    ScreenCtrl.getOrientation(orientation => {
      if (orientation === ScreenCtrl.LANDSCAPE) {
        ScreenCtrl.rotateScreen(ScreenCtrl.PORTRAIT);
      } else {
        ScreenCtrl.rotateScreen(ScreenCtrl.LANDSCAPE);
      }
      navigation.navigate('FullScreenMarket', {
        productInfo: this.state.productInfo,
      });
    });
  }

  render() {
    const {
      dealDetail,
      goLongArr,
      goShortArr,
      isLoading,
      productInfo,
      isFocused,
    } = this.state;
    if (isLoading) {
      return <View />;
    }

    // const { navigation } = this.props;
    // eslint-disable-next-line
    const { gdsId } = productInfo;
    const {
      buyNum,
      sellNum,
      yesterdayBalance,
      holdingNum,
      lowDealPrice,
      maxDealPrice,
      todayOpenPrice,
      uptodatePrice,
      upOrDownPrice,
      upOrDownScope,
    } = dealDetail;

    const lastedDataArr = [
      {
        title: '最新',
        value: {
          style: FuturesMarket.compareVal(uptodatePrice, yesterdayBalance),
          text: uptodatePrice || 0,
        },
      },
      {
        title: '今开',
        value: {
          style: FuturesMarket.compareVal(todayOpenPrice, yesterdayBalance),
          text: todayOpenPrice || 0,
        },
      },
      {
        title: '涨跌',
        value: {
          style: FuturesMarket.compareVal(Number(upOrDownPrice), 0),
          text: numberFormat(Math.abs(upOrDownPrice)) || 0,
        },
      },
      {
        title: '涨幅',
        value: {
          style: FuturesMarket.compareVal(Number(upOrDownScope), 0),
          text: `${(upOrDownScope * 100).toFixed(2)}%` || 0,
        },
      },
      {
        title: '最高',
        value: {
          style: FuturesMarket.compareVal(
            Number(maxDealPrice),
            Number(yesterdayBalance)
          ),
          text: maxDealPrice || 0,
        },
      },
      {
        title: '最低',
        value: {
          style: FuturesMarket.compareVal(
            Number(lowDealPrice),
            Number(yesterdayBalance)
          ),
          text: lowDealPrice || 0,
        },
      },
      {
        title: '持仓',
        value: {
          style: styles.yellowText,
          text: holdingNum || 0,
        },
      },
      {
        title: '昨收',
        value: {
          style: styles.whiteText,
          text: yesterdayBalance || 0,
        },
      },
      {
        title: '买量',
        value: {
          style: styles.yellowText,
          text: buyNum || 0,
        },
      },
      {
        title: '卖量',
        value: {
          style: styles.yellowText,
          text: sellNum || 0,
        },
      },
    ];

    return (
      <View style={styles.viewContainer}>
        <View style={styles.lastedDataView}>
          {lastedDataArr.map((item, index) =>
            FuturesMarket.lastedData(item.title, item.value, index)
          )}
        </View>
        <View style={styles.market}>
          <Tabs
            tabNames={['走势', '日线', '周线']}
            containerStyle={styles.tabContainer}
            selectedTextStyle={styles.selectedTextStyle}
            defaultTextStyle={styles.defaultTextStyle}
            swipeShield={0}
          >
            {isFocused && this.tendencyChat}
            {isFocused && this.dailyChat}
            {isFocused && this.weeklyChat}
          </Tabs>
          <TouchableWithoutFeedback onPressIn={this.fullScreen}>
            <View style={styles.fsBtnView}>
              <Text style={styles.fsBtnText}>&#xe7ff;</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.realtimeDealView}>
          <View style={styles.dealContainer}>
            <View style={styles.thead}>
              <Text style={styles.th} />
              <Text style={styles.priceTh}>价格</Text>
              <Text style={styles.th}>手数</Text>
            </View>
            <Lasted5Price
              textViewStyle={styles.textViewStyle}
              titleStyle={styles.titleStyle}
              priceStyle={styles.priceStyle}
              volumeStyle={styles.volumeStyle}
              dealArr={goLongArr}
              direction="GoLong"
              yesterdayBalance={yesterdayBalance}
            />
          </View>
          <View style={styles.dealContainer}>
            <View style={styles.thead}>
              <Text style={styles.th} />
              <Text style={styles.priceTh}>价格</Text>
              <Text style={styles.th}>手数</Text>
            </View>
            <Lasted5Price
              textViewStyle={styles.textViewStyle}
              titleStyle={styles.titleStyle}
              priceStyle={styles.priceStyle}
              volumeStyle={styles.volumeStyle}
              dealArr={goShortArr}
              direction="GoShort"
              yesterdayBalance={yesterdayBalance}
            />
          </View>
        </View>
        {/* <BottomBar
          navigation={navigation}
          yesterdayBalance={yesterdayBalance}
        /> */}
      </View>
    );
  }
}
