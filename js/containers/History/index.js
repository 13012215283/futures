import React, { Component } from 'react';
import { FlatList, AsyncStorage, View, Text } from 'react-native';

import { Toast } from 'futures/components/Toast';
import errtips from 'futures/constants/errtips';
import { DealHistory, WithDrawHistory } from 'futures/components/HistoryBlock';
import { request } from 'futures/utils/request';
import { px2dp } from 'futures/utils/px2dp';

const PARAMS = {};

// @flow
type Props = {
  navigation: Object,
};

export default class History extends Component<Props> {
  constructor(props) {
    super(props);

    this.pageIndex = 0;
    this.pageSize = 5;
    this.historyList = [];

    this.state = {
      historyList: [],
      refreshing: false,
      hasMoreData: false,
    };

    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.loadMore = this.loadMore.bind(this);
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
      throw error;
    }

    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.getDataFromServer();
      }
    );

    this.getDataFromServer();
  }

  componentWillUnmount() {
    this.didFocusSubscription.remove();
  }

  /** 请求网络接口 */
  async getDataFromServer() {
    if (!PARAMS.id) {
      return;
    }

    const body = {
      '00': PARAMS.id,
      '04': String(this.pageIndex),
      '05': String(this.pageSize),
      '01': PARAMS.token,
      '02': PARAMS.deviceId,
    };

    try {
      const posData = await request('0310', body);
      const { historyList } = posData;
      this.historyList = this.historyList.concat(historyList);

      this.setState({
        historyList: this.historyList,
        refreshing: false,
        hasMoreData: historyList.length === this.pageSize,
        isEndReached: false,
      });
      this.pageIndex += this.pageSize;
    } catch (error) {
      Toast.show(errtips[error.code], Toast.SHORT);
    }
  }

  loadMore() {
    this.setState({
      isEndReached: true,
    });
    if (!this.state.hasMoreData) {
      return;
    }
    this.getDataFromServer();
  }

  renderItem = ({ item }) => {
    const { status } = item;

    if (status === '1' || status === '7') {
      return <WithDrawHistory {...item} />;
    }
    return <DealHistory {...item} />;
  };

  renderFooter() {
    let showFooter = '';
    const rowCount = this.state.historyList.length;

    if (rowCount < this.pageSize || !this.state.isEndReached) {
      showFooter = '';
    } else if (this.state.hasMoreData) {
      showFooter = '正在加载中';
    } else {
      showFooter = '—别拉了，宝宝也是有底线的—';
    }

    return (
      <Text style={{ height: px2dp(50), textAlign: 'center' }}>
        {showFooter}
      </Text>
    );
  }

  render() {
    const data = this.state.historyList;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          refreshing={this.state.refreshing}
          list
          onRefresh={() => {
            this.pageIndex = 0;
            this.historyList = [];
            this.setState({ refreshing: true });
            this.getDataFromServer();
          }}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}
