import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  DeviceEventEmitter,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
// import { Toast } from 'futures/components/Toast';
import Dialog from 'futures/components/Dialog';

import { px2dp } from '../../utils/px2dp';
import { colors } from '../../components/themes';
import GoBack from '../../navigations/BackBtn';
import ProductNavBtn from './ProductNavBtn';

// @flow
type Props = {
  navigation: Object,
};
export default class ProductNav extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isGoodsDetail: props.navigation.state.routeName === 'GoodsDetail',
      isGoodsParams: props.navigation.state.routeName === 'GoodsParams',
      isGoodsChart: props.navigation.state.routeName === 'GoodsChart',
      dialog: {
        content: '',
        visible: false,
      },
    };
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('NavigationStateChange', routeName => {
      this.updateState(routeName);
    });
  }

  onPress(route) {
    return () => {
      this.props.navigation.navigate(route);
    };
  }

  updateState(routeName) {
    this.setState({
      isGoodsDetail: routeName === 'GoodsDetail',
      isGoodsParams: routeName === 'GoodsParams',
      isGoodsChart: routeName === 'GoodsChart',
    });
  }

  positonOpress() {
    return () => {
      AsyncStorage.getAllKeys((err, keys) => {
        if (keys.length === 0) {
          // Toast.show('您还没有登录 , 请登陆！', Toast.SHORT);
          this.setState({
            dialog: {
              visible: true,
              content: '请先登录',
            },
          });
        } else {
          this.jumpToPosition();
        }
      });
    };
  }

  jumpToPosition() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'TabBar',
          action: NavigationActions.navigate({ routeName: '持仓' }),
        }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  showDialog = (isVisible, callback = () => {}) => () => {
    this.setState(
      {
        dialog: {
          visible: isVisible,
          content: isVisible ? '请先登录' : '',
        },
      },
      () => {
        callback();
      }
    );
  };

  render() {
    const { dialog } = this.state;

    return (
      <View style={styles.header}>
        <GoBack
          viewStyle={styles.goBackView}
          navigation={this.props.navigation}
        />
        <View style={styles.naviHeader}>
          <View style={styles.tabTtileContainer}>
            <ProductNavBtn
              headerTitle="商品"
              onPress={this.onPress('GoodsDetail')}
            />
            {this.state.isGoodsDetail ? (
              <View style={styles.bottomLine} />
            ) : null}
          </View>

          <View style={styles.tabTtileContainer}>
            <ProductNavBtn
              headerTitle="参数"
              onPress={this.onPress('GoodsParams')}
            />
            {this.state.isGoodsParams ? (
              <View style={styles.bottomLine} />
            ) : null}
          </View>

          <View style={styles.tabTtileContainer}>
            <ProductNavBtn
              headerTitle="电子盘"
              onPress={this.onPress('GoodsChart')}
            />
            {this.state.isGoodsChart ? (
              <View style={styles.bottomLine} />
            ) : null}
          </View>
        </View>

        {this.state.isGoodsChart ? (
          <TouchableWithoutFeedback onPress={this.positonOpress()}>
            <Text
              style={{
                fontFamily: 'iconfont',
                fontSize: px2dp(44),
                color: colors.white,
              }}
            >
              &#xe806;
            </Text>
          </TouchableWithoutFeedback>
        ) : (
          <View style={{ width: px2dp(44) }} />
        )}

        <Dialog
          header="提示"
          content={dialog.content}
          visible={dialog.visible}
          button={[
            { name: '取消', callback: this.showDialog(false) },
            {
              name: '确认',
              callback: this.showDialog(false, () => {
                this.props.navigation.navigate('Login');
              }),
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'ios' ? 20 + px2dp(88) : px2dp(88),
    backgroundColor: colors['1001'],
    paddingRight: px2dp(32),
    paddingTop: Platform.OS === 'ios' ? 20 + px2dp(16) : px2dp(16),
    paddingBottom: px2dp(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  naviHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  tabTtileContainer: {
    alignItems: 'center',
  },

  bottomLine: {
    height: px2dp(4),
    width: px2dp(88),
    backgroundColor: colors.white,
  },

  headerTitle: {
    height: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    width: '100%',
    backgroundColor: '#fff100',
  },
});
