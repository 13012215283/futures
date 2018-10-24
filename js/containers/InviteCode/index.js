import React, { Component } from 'react';
import { View, FlatList, Linking } from 'react-native';

import { request } from 'futures/utils/request';
import { navOptions, BackBtn } from 'futures/navigations';
import Dialog from 'futures/components/Dialog';

import ListItem from './ListItem';
import style from './style';

/* eslint-disable no-console */
class InviteCode extends Component {
  constructor() {
    super();

    this.state = {
      modalVisible: false,
      call: '',
      refreshing: false,
    };

    this.setModalVisible = this.setModalVisible.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.call = this.call.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    this.getDataFromServer();
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.getDataFromServer();
  }

  // 弹窗是否显示
  setModalVisible() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  async getDataFromServer() {
    try {
      const data = await request('0017', {});
      this.setState({ data });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ refreshing: false });
    }
  }

  call() {
    const { call } = this.state;
    Linking.openURL(`tel:${call}`);
  }

  renderItem({ item }) {
    return (
      <ListItem
        data={item}
        onPress={call => {
          this.setModalVisible();
          this.setState({ call });
        }}
      />
    );
  }

  render() {
    const { setModalVisible, call } = this;

    return (
      <View style={style.container}>
        <FlatList
          style={style.list}
          data={this.state.data}
          ItemSeparatorComponent={() => <View style={style.divideLine} />}
          renderItem={this.renderItem}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />
        <Dialog
          visible={this.state.modalVisible}
          header={this.state.call}
          button={[
            {
              name: '取消',
              callback() {
                setModalVisible();
              },
            },
            {
              name: '拨打',
              callback() {
                setModalVisible();
                call();
              },
            },
          ]}
        />
      </View>
    );
  }
}

export default {
  screen: InviteCode,
  navigationOptions: props =>
    navOptions('邀请码', navOptions.TYPE_RED, {
      headerLeft: <BackBtn {...props} />,
    }),
};
