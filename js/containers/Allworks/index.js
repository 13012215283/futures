import React from 'react';
import { TabNavigator, TabBarTop } from 'react-navigation';
import PropTypes from 'prop-types';
import Position from '../Position';
import Consignation from '../Consignation';
import Delivery from '../Delivery';
import History from '../History';

import { styles, activeTintColor, inactiveTintColor } from './style';

const NavigatorConfig = {
  tabBarOptions: {
    style: styles.tabBarStyle,
    labelStyle: styles.labelStyle,
    indicatorStyle: styles.indicatorStyle,
    activeTintColor,
    inactiveTintColor,
  },
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
};

const RouterConfig = {
  持仓: {
    screen: Position,
    navigationOptions: {
      tabBarOnPress: params => {
        params.jumpToIndex(params.scene.index);
      },
    },
  },
  委托: {
    screen: Consignation,
    navigationOptions: {
      tabBarOnPress: params => {
        params.jumpToIndex(params.scene.index);
      },
    },
  },
  交割: {
    screen: Delivery,
    navigationOptions: {
      tabBarOnPress: params => {
        params.jumpToIndex(params.scene.index);
      },
    },
  },
  历史记录: {
    screen: History,
    navigationOptions: {
      tabBarOnPress: params => {
        params.jumpToIndex(params.scene.index);
      },
    },
  },
};

const Allworks = TabNavigator(RouterConfig, NavigatorConfig);

class AllworksTabs extends React.Component {
  render() {
    return <Allworks navigation={this.props.navigation} />;
  }
}

AllworksTabs.router = Allworks.router;

AllworksTabs.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.func])
  ).isRequired,
};

export default AllworksTabs;
