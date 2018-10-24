import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import Button from 'futures/components/Button';
import Dialog from 'futures/components/Dialog';
import { request } from 'futures/utils/request';
import AddressItem from 'futures/components/AddressItem';
import { Toast } from 'futures/components/Toast';
import { errtips } from 'futures/constants';
import noop from 'futures/utils/noop';

import { px2dp } from 'futures/utils/px2dp';
import style from './style';

// @flow
type Props = {
  navigation: object,
};

class Address extends Component<Props> {
  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;
    this.uId = params.uId;
    this.pageIndex = 0;
    this.pageSize = 10;
    this.addressList = [];

    this.state = {
      modalVisible: false,
      refreshing: false,
      id: '',
      hasMoreData: false,
      data: [],
      isEndReached: false,
      selectId: params.selectId || '',
    };

    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.setDefault = this.setDefault.bind(this);
    this.renderDialog = this.renderDialog.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.onPressItem = this.onPressItem.bind(this);
  }

  async componentDidMount() {
    try {
      if (this.uId) {
        await this.getDataFromServer();
      }
    } catch (e) {
      Toast.show(errtips[e.code], Toast.SHORT);
    }
  }

  onEdit(data) {
    const { uId } = this;
    this.props.navigation.navigate('AddAddress', {
      operation: 'edit',
      data,
      uId,
      updateList: this.onRefresh,
    });
  }

  onDelete(id) {
    this.setState({
      modalVisible: true,
      id,
    });
  }

  onRefresh() {
    this.pageIndex = 0;
    this.addressList = [];

    this.setState({
      refreshing: true,
    });

    this.getDataFromServer();
  }

  onPressItem(data) {
    this.setState(
      {
        selectId: data.id,
        seleceAdd: data,
      },
      () => {
        this.props.navigation.state.params.updateAddress(this.state.seleceAdd);
        this.props.navigation.goBack();
      }
    );
  }

  async getDataFromServer() {
    try {
      const body = {
        '00': this.uId,
        '04': String(this.pageIndex),
        '05': String(this.pageSize),
      };

      const data = await request('0029', body);
      this.addressList = this.addressList.concat(data.rows);
      this.setState({
        data: this.addressList,
        refreshing: false,
        hasMoreData: data.rows.length === this.pageSize,
        isEndReached: false,
      });

      this.pageIndex += this.pageSize;
    } catch (e) {
      this.setState({
        refreshing: false,
      });
      Toast.show(errtips[e.code], Toast.SHORT);
    }
  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
    });
  }

  async setDefault(id) {
    const body = {
      '00': this.uId,
      '55': id,
    };

    try {
      await request('0033', body);
      this.addressList = this.state.data.map(
        v =>
          v.id === id
            ? Object.assign({}, v, { defaultAddress: '1' })
            : Object.assign({}, v, { defaultAddress: '0' })
      );
      this.setState({
        data: this.addressList,
      });
    } catch (e) {
      Toast.show(errtips[e.code], Toast.SHORT);
    }
  }

  async confirmDelete() {
    const { id, selectId, data } = this.state;
    const body = {
      '00': this.uId,
      '55': this.state.id,
    };

    try {
      await request('0032', body);
      this.addressList = data.filter(v => v.id !== id);
      this.setState({
        data: this.addressList,
      });
      Toast.show('删除成功', Toast.SHORT);

      if (id === selectId) {
        this.setState({
          selectId: '',
          seleceAdd: {},
        });
        this.props.navigation.state.params.updateAddress(
          this.state.seleceAdd,
          this.addressList.length
        );
      }
    } catch (e) {
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

  renderDialog() {
    const { setModalVisible, confirmDelete } = this;
    return (
      <Dialog
        visible={this.state.modalVisible}
        content="确认删除该地址吗？"
        button={[
          {
            name: '取消',
            callback() {
              setModalVisible(false);
            },
          },
          {
            name: '确定',
            callback(id) {
              setModalVisible(false);
              confirmDelete(id);
            },
          },
        ]}
      />
    );
  }

  renderItem({ item }) {
    const { canSelect } = this.props.navigation.state.params;
    const onPress = canSelect ? this.onPressItem : noop;
    return (
      <AddressItem
        {...this.props}
        data={item}
        onDelete={this.onDelete}
        onEdit={this.onEdit}
        setDefault={this.setDefault}
        onPressItem={onPress}
        selectId={this.state.selectId}
      />
    );
  }

  renderButton() {
    const { uId, onRefresh } = this;
    return (
      <View style={style.btnPosition}>
        <Button
          type="primary"
          subStatus="enable"
          text="+ 新建地址"
          containerStyle={style.btnContaier}
          onPress={() => {
            this.props.navigation.navigate('AddAddress', {
              operation: 'add',
              uId,
              updateList: onRefresh,
            });
          }}
        />
      </View>
    );
  }

  renderFooter() {
    let showFooter = '';
    const rowCount = this.state.data.length;
    if (rowCount < this.pageSize || !this.state.isEndReached) {
      showFooter = '';
    } else if (this.state.hasMoreData) {
      showFooter = '正在加载中';
    } else {
      showFooter = '—别拉了，宝宝也是有底线的—';
    }

    return (
      <Text
        style={{
          height: px2dp(50),
          textAlign: 'center',
        }}
      >
        {showFooter}
      </Text>
    );
  }

  render() {
    return (
      <View style={style.container}>
        <FlatList
          data={this.state.data}
          ItemSeparatorComponent={() => <View style={style.divideLine} />}
          renderItem={this.renderItem}
          style={style.list}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.3}
        />
        {this.renderDialog()}
        {this.renderButton()}
      </View>
    );
  }
}

export default Address;
