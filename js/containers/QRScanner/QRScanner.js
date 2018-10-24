import React from 'react';

import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

import PropTypes from 'prop-types';
import { px2dp } from 'futures/utils/px2dp';
import QRScannerView from 'futures/components/QRScanner';
import { sizes, colors } from 'futures/components/themes';
import Dialog from 'futures/components/Dialog';
import { request } from 'futures/utils/request';

export default class DefaultScreen extends React.Component {
  static renderTitleBar() {
    return <View />;
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpenTorchMode: false,
      isScanning: true,
      /* Dialog */
      isShowDialog: false,
      dialogContext: '',
    };

    this.resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'ConfirmLogin' })],
    });

    this.barcodeReceived = this.barcodeReceived.bind(this);
    this.toggleTorch = this.toggleTorch.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  async getUserInfo() {
    // 从本地中获取user信息
    try {
      const userInfo = await AsyncStorage.multiGet(['id', 'token', 'deviceId']);
      /* eslint-disable prefer-destructuring */
      this.uId = userInfo[0][1];
      this.token = userInfo[1][1];
      this.deviceId = userInfo[2][1];
    } catch (err) {
      // eslint-disable-next-line
      console.log(err.code);
    }
  }

  resetNavigation(params) {
    this.resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'ConfirmLogin', params }),
      ],
    });
  }

  barcodeReceived(code) {
    if (this.state.isScanning) {
      if (code.data) {
        // 跳转登录确认页
        this.sendQRCode(code.data);
      } else {
        this.setState({
          isShowDialog: true,
        });
      }
    }
  }

  openDialog(text = '系统错误，请稍后再试') {
    this.setState({
      dialogContext: text,
      isShowDialog: true,
    });
  }

  async sendQRCode(code) {
    const errSet = {
      USER_NOT_EXIST: '用户不存在',
      TOKEN_INVALID: '用户不在线',
      QRCODE_INVALID: '二维码失效',
    };
    try {
      const body = {
        '00': this.uId,
        '01': this.token,
        '02': this.deviceId,
        '32': code,
      };
      this.resetNavigation(body);
      await request('0024', body);
      this.props.navigation.dispatch(this.resetAction);
    } catch (err) {
      this.openDialog(errSet[err.code]);
    }
  }

  toggleTorch() {
    // 打开手电筒
    this.setState(prevState => ({
      isOpenTorchMode: !prevState.isOpenTorchMode,
    }));
  }

  renderMenu() {
    return (
      <TouchableOpacity
        style={{
          height: px2dp(88),
          alignItems: 'center',
          justifyContent: 'center',
          bottom: px2dp(32),
        }}
        onPress={this.toggleTorch}
      >
        <Text
          style={{
            color: colors.white,
            fontSize: sizes.f3,
          }}
        >
          {this.state.isOpenTorchMode ? '关闭' : '轻触照亮'}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { isShowDialog, dialogContext, isOpenTorchMode } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <QRScannerView
          onScanResultReceived={this.barcodeReceived}
          renderTopBarView={DefaultScreen.renderTitleBar}
          renderBottomMenuView={this.renderMenu}
          rectWidth={px2dp(441)}
          rectHeight={px2dp(441)}
          hintText="将取景框对准二维码进行扫描"
          hintTextPosition={px2dp(20)}
          isOpenTorchMode={isOpenTorchMode}
        />
        <Dialog
          content={dialogContext}
          header="提示"
          visible={isShowDialog}
          button={[
            {
              name: '确认',
              callback: () => {
                this.setState({ isShowDialog: false, isScanning: false });
                this.props.navigation.goBack();
              },
            },
          ]}
        />
      </View>
    );
  }
}

DefaultScreen.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  navigation: PropTypes.object.isRequired,
};
