import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  AsyncStorage,
  Linking,
} from 'react-native';

import Dialog from 'futures/components/Dialog';
import { Toast } from 'futures/components/Toast';
import { px2dp } from 'futures/utils/px2dp';
import { apis, errtips } from 'futures/constants';
import { request } from 'futures/utils/request';
import { colors, sizes } from 'futures/components/themes';

// @flow
type Props = {
  navigation: Object,
  yesterdayBalance: string,
  screenProps: Object,
};
type States = {
  isStar: boolean,
};

export default class BottomBar extends Component<Props, States> {
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      isStar: false,
      productInfo: params.productInfo,
      token: '',
      id: '',
      dialog: {
        content: '',
        visible: false,
        button: null,
      },
    };
  }

  componentDidMount() {
    this.getLocalData();
    // getStorageData('token').then(token => {
    //   this.setState({
    //     token,
    //   });
    // });
  }

  getLocalData = async () => {
    const storage = await AsyncStorage.multiGet(['token', 'id']);
    this.setState(
      {
        token: storage[0][1],
        id: storage[1][1],
      },
      () => {
        this.isStar();
      }
    );
  };

  isStar = async () => {
    try {
      const { id, productInfo, token } = this.state;

      // 没有登录
      if (!token || !id) {
        return;
      }

      const body = {
        '00': id,
        '03': productInfo.gdsId,
      };
      const isStar = await request(apis.GdsC_collection, body);
      const starArr = [false, true];
      this.setState({
        isStar: starArr[isStar],
      });
    } catch (e) {
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后再试', Toast.SHORT);
      }
    }
  };

  service = () => {
    this.setState({
      dialog: {
        visible: true,
        content: () => (
          <Text>
            <Text>可以拨打客服热线</Text>
            <TouchableWithoutFeedback onPress={this.callService}>
              <Text
                style={{
                  color: colors['1004'],
                  textDecorationLine: 'underline',
                }}
              >
                022-58313111
              </Text>
            </TouchableWithoutFeedback>
            <Text>咨询产品信息详情</Text>
          </Text>
        ),
        button: [{ name: '我知道了', callback: this.showDialog(false) }],
      },
    });
  };

  callService = () => {
    Linking.openURL('tel:022-58313111');
  };

  star = async () => {
    const { token, isStar } = this.state;
    if (!token) {
      this.setState({
        dialog: {
          visible: true,
          content: '请先登录',
        },
      });
      return;
    }
    try {
      const { id, productInfo } = this.state;
      const body = {
        '00': id,
      };
      let starApi;
      if (isStar) {
        body['35'] = [productInfo.gdsId];
        starApi = apis.UserC_delFromFavorites;
      } else {
        body['03'] = productInfo.gdsId;
        starApi = apis.UserC_addToFavorites;
      }
      await request(starApi, body);
      this.setState(
        {
          isStar: !isStar,
        },
        () => {
          if (this.state.isStar) {
            Toast.show('收藏成功', Toast.SHORT);
          } else {
            Toast.show('取消收藏成功', Toast.SHORT);
          }
        }
      );
    } catch (e) {
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else if (isStar) {
        Toast.show('取消收藏出错，请稍后再试', Toast.SHORT);
      } else if (!isStar) {
        Toast.show('收藏出错，请稍后再试', Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后再试', Toast.SHORT);
      }
    }
  };

  goToOpenPosn = operation => {
    const { token } = this.state;

    if (!token) {
      return () => {
        this.setState({
          dialog: {
            visible: true,
            content: '请先登录',
          },
        });
      };
    }

    return () => {
      const { productInfo } = this.state;
      const { yesterdayBalance, screenProps } = this.props;
      const { delivery } = screenProps;
      if (delivery === '0') {
        this.props.navigation.navigate('OpenPosition', {
          operation,
          productInfo,
          yesterdayBalance,
        });
      } else {
        this.props.navigation.navigate('OpenPositionDelivery', {
          operation,
          productInfo,
          yesterdayBalance,
          delivery,
        });
      }
    };
  };

  handleStar() {
    if (this.state.isStar) {
      return <Text style={[styles.iconFont, styles.starred]}>&#xe80e;</Text>;
    }
    return <Text style={styles.iconFont}>&#xe7fd;</Text>;
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
    const { screenProps } = this.props;
    const { deliveryDate, delivery } = screenProps;
    return (
      <View style={styles.container}>
        <View style={styles.servicesContainer}>
          <TouchableWithoutFeedback onPress={this.service}>
            <View style={styles.servicesView}>
              <Text style={styles.iconFont}>&#xe7fe;</Text>
              <Text style={styles.servicesText}>客服</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.star}>
            <View>
              {this.handleStar()}
              <Text style={styles.servicesText}>收藏</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {delivery === '0' ? (
          <TouchableWithoutFeedback onPress={this.goToOpenPosn('GoShort')}>
            <View style={[styles.openPositionBtn, styles.goShort]}>
              <Text style={styles.openPositionText}>卖出</Text>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View style={[styles.openPositionBtn, styles.disableBtn]}>
            <Text style={styles.openPositionText}>卖出</Text>
          </View>
        )}

        <TouchableWithoutFeedback onPress={this.goToOpenPosn('GoLong')}>
          <View style={[styles.openPositionBtn, styles.goLong]}>
            <Text style={styles.openPositionText}>买入</Text>
            <Text style={styles.clearing}>{deliveryDate}</Text>
          </View>
        </TouchableWithoutFeedback>
        <Dialog
          header="提示"
          content={dialog.content}
          visible={dialog.visible}
          button={
            dialog.button
              ? dialog.button
              : [
                  { name: '取消', callback: this.showDialog(false) },
                  {
                    name: '确认',
                    callback: this.showDialog(false, () => {
                      this.props.navigation.navigate('Login');
                    }),
                  },
                ]
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    height: px2dp(98),
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  servicesContainer: {
    flexDirection: 'row',
    width: px2dp(310),
    justifyContent: 'center',
  },
  servicesView: {
    marginRight: px2dp(78),
  },
  iconFont: {
    fontFamily: 'iconfont',
    fontSize: px2dp(44),
    color: colors['1102'],
  },
  starred: {
    color: colors['1003'],
  },
  servicesText: {
    fontSize: sizes.f0,
    color: colors['1102'],
    marginTop: px2dp(8),
  },
  openPositionBtn: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goShort: {
    backgroundColor: colors['1002'],
  },
  goLong: {
    backgroundColor: colors['1001'],
  },
  openPositionText: {
    fontSize: sizes.f3,
    color: colors.white,
  },
  clearing: {
    color: colors.white,
    fontSize: sizes.f0,
  },
  disableBtn: {
    backgroundColor: colors['1103'],
  },
});
