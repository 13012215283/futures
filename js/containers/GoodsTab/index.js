import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import { apis, errtips } from 'futures/constants';
import { request } from 'futures/utils/request';
import { Toast } from 'futures/components/Toast';

import GoodsDetail from 'futures/containers/GoodsDetail';
import GoodsParams from 'futures/containers/GoodsParams';
import FuturesMarket from 'futures/containers/FuturesMarket';
import BottomBar from 'futures/containers/FuturesMarket/BottomBar';

const RouteConfig = {
  GoodsDetail: {
    screen: GoodsDetail,
  },

  GoodsParams: {
    screen: GoodsParams,
  },

  GoodsChart: {
    screen: FuturesMarket,
  },
};

const NavigatorConfig = {
  initialRouteName: 'GoodsDetail',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarVisible: false,
  backBehavior: 'none',
  tabBarComponent: BottomBar,
  tabBarPosition: 'bottom',
  // swipeEnabled: false,
  // animationEnabled: false,
};

const GoodsTabNav = TabNavigator(RouteConfig, NavigatorConfig);

// @flow
type Props = {
  navigation: Object,
};

export default class GoodsTab extends Component<Props> {
  constructor() {
    super();
    this.state = {
      delivery: '',
      deliveryDate: '',
    };
  }
  componentDidMount() {
    this.getGoodsDetail();
  }

  async getGoodsDetail() {
    try {
      const { params } = this.props.navigation.state;
      const { productInfo } = params;
      const { gdsId } = productInfo;
      const body = {
        '03': gdsId,
      };

      const response = await request(apis.GdsC_gdsDetail, body);
      const { delivery, deliveryDate } = response;
      this.setState({
        delivery,
        deliveryDate,
      });
    } catch (e) {
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后重试', Toast.SHORT);
      }
    }
  }
  render() {
    const { params } = this.props.navigation.state;
    const { delivery, deliveryDate } = this.state;
    return (
      <GoodsTabNav
        navigation={this.props.navigation}
        screenProps={{ params, delivery, deliveryDate }}
      />
    );
  }
}
GoodsTab.router = GoodsTabNav.router;
