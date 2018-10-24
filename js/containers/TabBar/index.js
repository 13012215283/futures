import React from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  StyleSheet,
  AsyncStorage,
  DeviceEventEmitter,
} from 'react-native';

import {
  TabNavigator,
  TabBarBottom,
  NavigationActions,
} from 'react-navigation';

import { navOptions } from 'futures/navigations';
import { Toast } from 'futures/components/Toast';
import Index from 'futures/containers/Index';
import IndexNav from 'futures/containers/Index/IndexNav';
import MyAccountIndex from 'futures/containers/MyAccountIndex';
import Allworks from 'futures/containers/Allworks';
import MyAccountNav from 'futures/containers/MyAccountIndex/MyAccountNav';
import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';

// @flow

const RouterConfig = {
  Index: {
    screen: Index,
    navigationOptions: props => ({
      title: '大厅',
      header: <IndexNav {...props} />,
      tabBarIcon(params: Object) {
        return (
          <Text
            style={[
              styles.labelIcon,
              params.focused ? styles.iconActived : styles.iconInactived,
            ]}
          >
            &#xe61f;
          </Text>
        );
      },
    }),
  },
  Allworks: {
    screen: Allworks,
    navigationOptions: () =>
      navOptions('交易中心', 'red', {
        tabBarIcon(params: Object) {
          return (
            <Text
              style={[
                styles.labelIcon,
                params.focused ? styles.iconActived : styles.iconInactived,
              ]}
            >
              &#xe642;
            </Text>
          );
        },
        tabBarOnPress: (params: Object) => {
          AsyncStorage.getAllKeys((err, keys) => {
            if (keys.length === 0) {
              DeviceEventEmitter.emit('tradeLogin');
            } else {
              params.jumpToIndex(params.scene.index);
            }
          });
        },
      }),
  },
  MyAccountIndex: {
    screen: MyAccountIndex,
    navigationOptions: props => ({
      title: '我的',
      header: <MyAccountNav {...props} />,
      tabBarIcon(params: Object) {
        return (
          <Text
            style={[
              styles.labelIcon,
              params.focused ? styles.iconActived : styles.iconInactived,
            ]}
          >
            &#xe78d;
          </Text>
        );
      },
    }),
  },
};

const NavigatorConfig = {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: colors['1001'],
    activeBackgroundColor: colors.white,
    inactiveTintColor: colors['1101'],
    inactiveBackgroundColor: colors.white,
    style: {
      backgroundColor: colors.white,
      height: px2dp(88),
    },
    labelStyle: {
      fontSize: sizes.f0,
    },
  },
  backBehavior: 'none',
};

const TabBarNav = TabNavigator(RouterConfig, NavigatorConfig);

class TabBar extends React.Component {
  constructor() {
    super();
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentWillMount() {
    // BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress() {
    const { dispatch, state } = this.props.navigation;

    if (state.routeName !== 'TabBar') {
      dispatch(NavigationActions.back());
      return true;
    }

    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      return false;
    }

    this.lastBackPressed = Date.now();
    Toast.show('再按一次退出应用', Toast.SHORT);
    return true;
  }

  render() {
    return <TabBarNav navigation={this.props.navigation} />;
  }
}

TabBar.router = TabBarNav.router;

TabBar.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.func])
  ).isRequired,
};

const styles = StyleSheet.create({
  labelIcon: {
    fontSize: px2dp(48),
    fontFamily: 'iconfont',
  },
  iconActived: {
    color: colors['1001'],
  },
  iconInactived: {
    color: colors['1102'],
  },
});

export default TabBar;
