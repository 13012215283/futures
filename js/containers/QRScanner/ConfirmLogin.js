import React from 'react';

import { View, Text, StyleSheet, Image } from 'react-native';

import PropTypes from 'prop-types';
import { px2dp } from 'futures/utils/px2dp';
import { sizes, colors } from 'futures/components/themes';
import Button from 'futures/components/Button';
import Dialog from 'futures/components/Dialog';
import { request } from 'futures/utils/request';

export default class ConfirmLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* Dialog */
      isShowDialog: false,
      dialogContext: '',
    };
  }

  async confirmLogin(isLogin) {
    try {
      const body = this.props.navigation.state.params;
      body['34'] = isLogin;
      await request('0025', body);
      this.props.navigation.navigate('TabBar');
    } catch (err) {
      const errSet = {
        USER_NOT_EXIST: '用户不存在',
        TOKEN_INVALID: '用户不在线',
        QRCODE_INVALID: '二维码失效',
      };
      this.setState({
        dialogContext: errSet[err.code] || '系统错误',
        isShowDialog: true,
      });
    }
  }

  render() {
    const { dialogContext, isShowDialog } = this.state;
    /* eslint-disable global-require */
    return (
      <View style={styles.container}>
        <Image
          style={styles.mobileIcon}
          source={require('./imgs/img_sign_app.png')}
        />
        <Image
          style={styles.rightIcon}
          source={require('./imgs/img_right.png')}
        />
        <Image
          style={styles.pcIcon}
          source={require('./imgs/img_sign_pc.png')}
        />
        <View style={styles.infoWrapper}>
          <Text
            style={{
              fontSize: sizes.f5,
              color: colors[1101],
            }}
          >
            登录确认
          </Text>
          <Text
            style={{
              fontSize: sizes.f2,
            }}
          >
            请不要扫描来源不明的二维码
          </Text>
        </View>
        <View style={styles.btnWrapper}>
          <Button
            text="确认登陆"
            type="primary"
            subStatus="enable"
            containerStyle={styles.btn}
            onPress={() => this.confirmLogin(1)}
          />
          <Button
            text="取消"
            type="primary"
            subStatus="disable"
            containerStyle={{ marginTop: px2dp(30) }}
            onPress={() => this.confirmLogin(1)}
          />
        </View>
        <Dialog
          content={dialogContext}
          header="提示"
          visible={isShowDialog}
          button={[
            {
              name: '确认',
              callback: () => {
                this.setState({
                  isShowDialog: false,
                });
                this.props.navigation.navigate('TabBar');
              },
            },
          ]}
        />
      </View>
    );
  }
}

ConfirmLogin.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[1105],
  },
  mobileIcon: {
    position: 'absolute',
    top: px2dp(136),
    left: px2dp(81),
    width: px2dp(104),
    height: px2dp(188),
  },
  rightIcon: {
    position: 'absolute',
    top: px2dp(204),
    left: px2dp(286),
    width: px2dp(64),
    height: px2dp(64),
  },
  pcIcon: {
    position: 'absolute',
    top: px2dp(136),
    left: px2dp(451),
    width: px2dp(218),
    height: px2dp(188),
  },
  infoWrapper: {
    position: 'absolute',
    top: px2dp(348),
    width: '100%',
    height: px2dp(200),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnWrapper: {
    position: 'absolute',
    width: '100%',
    top: px2dp(676),
  },
  btn: {
    marginTop: 0,
  },
});
