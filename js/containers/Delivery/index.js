import React, { Component } from 'react';
import { View, FlatList, AsyncStorage, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import { Toast } from 'futures/components/Toast';
import { Delivering, Delivered } from 'futures/components/DeliveryBlock';
import { errors } from 'futures/constants';
import style from './style';
import { request } from '../../utils/request';
import { px2dp } from '../../utils/px2dp';

/* eslint-disable no-console */
const PARAMS = {};
export default class Delivery extends Component {
  static devider() {
    return <View style={{ height: px2dp(20) }} />;
  }
  constructor(props) {
    super(props);

    this.pageIndex = 0;
    this.pageSize = 100;
    this.deliveryList = [];
    this.state = {
      data: [],
      refreshing: false,
    };

    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  async componentDidMount() {
    try {
      PARAMS.id = await AsyncStorage.getItem('id');
      if (PARAMS.id) this.getDataFromServer();
    } catch (error) {
      console.error(error);
    }
  }

  onRefresh() {
    this.setState({
      refreshing: true,
    });
    this.pageIndex = 0;
    this.deliveryList = [];
    this.getDataFromServer();
  }

  async getDataFromServer() {
    try {
      const { id } = PARAMS;

      const body = {
        '00': id,
        '04': this.pageIndex,
        '05': this.pageSize,
      };

      const data = await request('0309', body);
      this.deliveryList = this.deliveryList.concat(data.deliveryList);
      this.setState({
        data: this.deliveryList,
      });

      this.pageIndex += this.pageSize;
    } catch (e) {
      switch (e.code) {
        case errors.PARAM_INCOM:
          Toast.show('参数不全', Toast.SHORT);
          break;
        default:
          Toast.show('网络错误', Toast.SHORT);
      }
      console.error(e);
    } finally {
      this.setState({
        refreshing: false,
      });
    }
  }

  /** 查看交割 */
  checkDelyProgress(item) {
    console.log(item);
    const { id } = PARAMS;
    return () => {
      console.log(item);
      const { navigation } = this.props;
      const { orderId, futureId, futureName } = item;
      navigation.navigate('DeliverySchedule', {
        productName: futureName,
        productCode: futureId,
        uId: id,
        deliveryId: orderId,
      });
    };
  }

  renderItem = ({ item }) => {
    if (item.status === 6) {
      return (
        <TouchableOpacity onPress={this.checkDelyProgress(item)}>
          <Delivered {...item} />;
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this.checkDelyProgress(item)}>
        <Delivering {...item} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={style.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={item => item.orderId}
          renderItem={this.renderItem}
          ItemSeparatorComponent={Delivery.devider}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />
      </View>
    );
  }
}

Delivery.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.func])
  ).isRequired,
};
