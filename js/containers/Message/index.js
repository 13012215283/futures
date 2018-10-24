import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';

import MessageItem from 'futures/components/MessageItem';
import { Toast } from 'futures/components/Toast';
import { errtips } from 'futures/constants';
import { navOptions, BackBtn } from 'futures/navigations';
import { request } from 'futures/utils/request';
import { px2dp } from 'futures/utils/px2dp';

import style from './style';

// @flow
type Props = {
  navigation: object,
};
class Message extends Component<Props> {
  static divider() {
    return <View style={style.divider} />;
  }

  static renderItem({ item }) {
    return <MessageItem data={item} />;
  }

  constructor(props) {
    super(props);
    this.uId = this.props.navigation.state.params.uId;
    this.pageIndex = 0;
    this.pageSize = 10;
    this.message = [];
    this.state = {
      refreshing: false,
      message: this.message,
      hasMoreData: false,
    };

    this.renderItem = Message.renderItem.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.getDataFromServer();
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.pageIndex = 0;
    this.message = [];
    this.getDataFromServer();
  }

  async getDataFromServer() {
    try {
      const body = {
        '00': this.uId,
        '04': String(this.pageIndex),
        '05': String(this.pageSize),
      };
      const data = await request('0038', body);
      this.message = this.message.concat(data.rows);
      this.setState({
        message: this.message,
        refreshing: false,
        isEndReached: false,
        hasMoreData: data.rows.length === this.pageSize,
      });

      this.pageIndex += this.pageSize;
    } catch (e) {
      this.setState({
        refreshing: false,
      });

      Toast.show(errtips[e.code], Toast.SHORT);
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

  renderFooter() {
    let showFooter = '';
    const rowCount = this.state.message.length;

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
    return (
      <View style={style.body}>
        {this.state.message.length ? (
          <FlatList
            data={this.state.message}
            ItemSeparatorComponent={Message.divider}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter}
          />
        ) : (
          <Text style={{ textAlign: 'center' }}>暂无消息</Text>
        )}
      </View>
    );
  }
}

export default {
  screen: Message,
  navigationOptions: ({ navigation }) =>
    navOptions('消息', navOptions.TYPE_RED, {
      headerLeft: <BackBtn navigation={navigation} />,
    }),
};
