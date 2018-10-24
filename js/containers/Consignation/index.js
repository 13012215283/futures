import React, { Component } from 'react';
import { View, FlatList, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { DisTraded, WithDrawTrade } from 'futures/components/ConsignateBlock';
import Dialog from 'futures/components/Dialog';
import { Toast } from 'futures/components/Toast';
import { apis, errors } from 'futures/constants';
import EventListener from 'futures/utils/EventListener';
import { request } from '../../utils/request';
import { px2dp } from '../../utils/px2dp';

import style from './style';

/* eslint-disable no-console */

// @flow
type Props = {
  navigation: object,
};

const PARAMS = {};

export default class Consignation extends Component<Props> {
  static devider() {
    return <View style={{ height: px2dp(20) }} />;
  }

  constructor(props) {
    super(props);

    this.pageIndex = 0;
    this.pageSize = 100;
    this.entrustList = [];

    this.state = {
      data: [],
      modalVisible: false,
      orderId: '',
      refreshing: false,
    };

    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.revoke = this.revoke.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.setOrderId = this.setOrderId.bind(this);
    this.goMarket = this.goMarket.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  async componentDidMount() {
    try {
      PARAMS.id = await AsyncStorage.getItem('id');
      if (PARAMS.id) {
        this.getDataFromServer();
      }
    } catch (error) {
      console.error(error);
    }

    /** 注册事件 */
    const event = {
      systemCancelEntrust: this.getDataFromServer,
      userCancelEntrust: this.getDataFromServer,
      closePosition: this.getDataFromServer,
      openPosition: this.getDataFromServer,
    };

    EventListener.addEventListen(event);

    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.getDataFromServer();
      }
    );
  }

  componentWillUnmount() {
    this.didFocusSubscription.remove();
    EventListener.clearEventListen();
  }

  onRefresh() {
    this.pageIndex = 0;
    this.entrustList = [];

    this.setState({
      refreshing: true,
    });

    this.getDataFromServer();
  }

  async getDataFromServer() {
    this.pageIndex = 0;
    this.entrustList = [];

    try {
      const { id } = PARAMS;

      const body = {
        '00': id,
        '04': this.pageIndex,
        '05': this.pageSize,
      };

      const data = await request('0308', body);
      this.entrustList = this.entrustList.concat(data.entrustList);
      this.setState({
        data: this.entrustList,
        refreshing: false,
      });

      this.pageIndex += this.pageSize;
    } catch (error) {
      this.setState({
        refreshing: false,
      });
      console.error(error);
    }
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  setOrderId(orderId) {
    this.setModalVisible(true);
    this.setState({ orderId });
  }

  async revoke() {
    try {
      const id = await AsyncStorage.getItem('id');
      const { orderId } = this.state;

      const body = {
        '00': id,
        '21': orderId,
      };

      const data = await request(apis.EntrustC_cancelEntrust, body);
      console.log(data);
      Toast.show('撤单成功', Toast.SHORT);
      this.entrustList = this.entrustList.filter(v => v.orderId !== orderId);

      this.setState({ data: this.entrustList });
    } catch (e) {
      switch (e.code) {
        case errors.PARAM_INCOM:
          Toast.show('参数不全', Toast.SHORT);
          break;
        case errors.ENTRUST_DEALED:
          Toast.show('委托已经成交，不能进行撤单', Toast.SHORT);
          break;
        default:
          Toast.show('网络错误, 请稍后重试', Toast.SHORT);
      }
    }
  }

  goMarket(futureId) {
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
  }

  renderItem = ({ item }) => {
    // 委托两种状态：0 :委托未成交 1：委托已撤单
    if (item.status === '0') {
      return (
        <DisTraded
          {...item}
          revoke={this.setOrderId}
          goMarket={this.goMarket}
        />
      );
    }

    return <WithDrawTrade {...item} />;
  };

  render() {
    const { setModalVisible, revoke } = this;
    const { orderId } = this.state;

    return (
      <View style={style.container}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          ItemSeparatorComponent={Consignation.devider}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />
        <Dialog
          visible={this.state.modalVisible}
          content="您确定要撤掉此单吗？"
          button={[
            {
              name: '取消',
              callback: () => {
                setModalVisible(false);
              },
            },
            {
              name: '确认',
              callback: () => {
                setModalVisible(false);
                revoke(orderId);
              },
            },
          ]}
        />
      </View>
    );
  }
}
