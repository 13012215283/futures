import React, { Component } from 'react';

import { FlatList, AsyncStorage, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import {
  FinalPaymentBlock,
  NormalBlock,
  BeingEvening,
  NoFinalPaymentBlock,
} from 'futures/components/PositionBlock';
import { Toast } from 'futures/components/Toast';
import errtips from 'futures/constants/errtips';
import { request } from 'futures/utils/request';
import wheelAsk from 'futures/utils/wheelAsk';
import noop from 'futures/utils/noop';
import EventListener from 'futures/utils/EventListener';

const PARAMS = {};
// @flow
type Props = {
  navigation: Object,
};

class Position extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      positionList: [],
      refreshing: false,
    };

    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.toEveningUp = this.toEveningUp.bind(this);
    this.toTailPayment = this.toTailPayment.bind(this);
    this.checkTrend = this.checkTrend.bind(this);
    this.askForRevenue = this.askForRevenue.bind(this);
  }

  async componentDidMount() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const stores = await AsyncStorage.multiGet(keys);
      stores.forEach(store => {
        const { 0: key } = store;
        const { 1: value } = store;
        PARAMS[key] = value;
      });
    } catch (error) {
      Toast.show(errtips[error.code], Toast.SHORT);
    }

    const event = {
      closePosition: this.getDataFromServer,
      openPosition: this.getDataFromServer,
    };

    EventListener.addEventListen(event);

    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        wheelAsk.processWhellAsk(this.askForRevenue);
        this.getDataFromServer();
      }
    );

    this.didBlurSubscription = this.props.navigation.addListener(
      'didBlur',
      () => {
        wheelAsk.clearWhellAsk();
      }
    );

    this.getDataFromServer();
    wheelAsk.processWhellAsk(this.askForRevenue);
  }

  componentWillUnmount() {
    EventListener.clearEventListen();
    wheelAsk.clearWhellAsk();
  }

  /** 请求网络接口 */
  async getDataFromServer() {
    if (!PARAMS.id) {
      return;
    }

    const body = {
      '00': PARAMS.id,
      '04': '0',
      '05': '100',
      '01': PARAMS.token,
      '02': PARAMS.deviceId,
    };

    try {
      const posData = await request('0307', body);
      this.setState({ positionList: posData.positionList, refreshing: false });
    } catch (error) {
      Toast.show(errtips[error.code], Toast.SHORT);
    }
  }

  /** 跳转到平仓页面事件 */
  toEveningUp = params => {
    const uidObj = { uid: PARAMS.id };
    const newParams = Object.assign(uidObj, params);

    this.props.navigation.navigate('EveningUp', newParams);
  };

  /** 跳转补尾款页面跳转 */
  toTailPayment = futureId => {
    const uidObj = { uid: PARAMS.id };
    const newParams = Object.assign(uidObj, { futureId });

    this.props.navigation.navigate('TailPayment', newParams);
  };

  /** 查看走势 */
  checkTrend = futureId => {
    // this.props.navigation.navigate('FuturesMarket', {
    //   productInfo: { gdsId: futureId },
    // });
    const navigateAction = NavigationActions.navigate({
      routeName: 'GoodsTab',

      params: {
        productInfo: { gdsId: futureId },
      },

      action: NavigationActions.navigate({
        routeName: 'GoodsChart',
        params: {
          productInfo: { gdsId: futureId },
        },
      }),
    });
    this.props.navigation.dispatch(navigateAction);
  };

  /** 获取盈利数据 */
  async askForRevenue() {
    const orderIdAr = this.state.positionList.map(current => current.orderId);
    if (orderIdAr.length === 0 || !PARAMS.id) {
      return;
    }

    const body = {
      '00': PARAMS.id,
      '21': orderIdAr,
    };

    try {
      const revenueAr = await request('0316', body);

      const posRevList = this.state.positionList.map(current => {
        const obj = current;
        obj.revenue = revenueAr[obj.orderId];
        return obj;
      });

      this.setState({ positionList: posRevList });
    } catch (error) {
      // ignore
    }
  }

  renderItem = ({ item }) => {
    const { status, direction } = item;

    if (status === '2') {
      return (
        <NormalBlock
          {...item}
          userInfo={PARAMS}
          toEveningUp={this.toEveningUp}
          checkTrend={this.checkTrend}
        />
      );
    }
    if (status === '10') {
      return (
        <BeingEvening
          {...item}
          checkTrend={this.checkTrend}
          userInfo={PARAMS}
        />
      );
    }

    if (status === '4' && direction === '1') {
      return (
        <FinalPaymentBlock
          {...item}
          toEveningUp={this.toEveningUp}
          toTailPayment={this.toTailPayment}
          userInfo={PARAMS}
        />
      );
    }

    return (
      <NoFinalPaymentBlock
        {...item}
        toEveningUp={this.toEveningUp}
        userInfo={PARAMS}
      />
    );
  };

  render() {
    const data = this.state.positionList;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.setState({ refreshing: true });
            this.getDataFromServer();
          }}
        />
      </View>
    );
  }
}

Position.defaultProps = {
  toEveningUp: noop,
};

Position.propTypes = {
  toEveningUp: PropTypes.func,
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.func])
  ).isRequired,
};

export default Position;
