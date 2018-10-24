import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { navOptions, BackBtn } from 'futures/navigations';
import Password from 'futures/components/PasswordInput';
import { colors } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';
import Button from 'futures/components/Button';
import Dialog from 'futures/components/Dialog';
import { request } from 'futures/utils/request';
import { errtips } from 'futures/constants';
import { Toast } from 'futures/components/Toast';

// @flow
type Props = {
  navigation: object,
};

class WritePwd extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const { operation } = navigation.state.params;
    const title = {
      setting: '设置出金密码',
      forget: '忘记出金密码',
    };
    return navOptions(title[operation], navOptions.TYPE_RED, {
      headerLeft: <BackBtn navigation={navigation} />,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
    };
    this.uId = this.props.navigation.state.params.uId;
    this.submit = this.submit.bind(this);
    this.checkValid = this.checkValid.bind(this);
    this.checkDataValid = this.checkDataValid.bind(this);
  }

  async submit() {
    if (!this.checkDataValid()) return;
    const body = {
      '00': this.uId,
      '10': this.state.initialPwd,
    };
    try {
      await request('0035', body);
      this.props.navigation.pop(2);
    } catch (e) {
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后重试');
      }
    }
  }

  checkValid() {
    const { initialPwd, confirmPwd } = this.state;
    const isValid = initialPwd && confirmPwd;

    this.setState({ isValid });
  }

  /** 只接受6位数字密码 */
  checkDataValid() {
    const pwdPattern = /^\d{6}$/;
    const { initialPwd, confirmPwd } = this.state;
    if (!pwdPattern.test(initialPwd) || !pwdPattern.test(confirmPwd)) {
      this.setState({
        dialogText: '出金密码只能为6位数字',
        dialogVisible: true,
      });
      return false;
    } else if (initialPwd !== confirmPwd) {
      this.setState({
        dialogText: '两次输入密码不一致',
        dialogVisible: true,
      });
      return false;
    }
    return true;
  }

  render() {
    const labels = {
      setting: ['请设置出金密码', '请确认出金密码'],
      forget: ['请输入新的出金密码', '请确认新的出金密码'],
    };
    const that = this;
    const { operation } = this.props.navigation.state.params;

    return (
      <View style={style.container}>
        <View style={style.pwdContainer}>
          <Password
            title={labels[operation][0]}
            onEnd={initialPwd => {
              this.checkValid({ initialPwd });
            }}
            onChange={initialPwd => {
              this.setState({
                initialPwd,
              });
            }}
          />
          <Password
            title={labels[operation][1]}
            onEnd={confirmPwd => {
              this.checkValid({ confirmPwd });
            }}
            onChange={confirmPwd => {
              this.setState({
                confirmPwd,
              });
            }}
          />
        </View>
        <Dialog
          content={this.state.dialogText}
          visible={this.state.dialogVisible}
          button={[
            {
              name: '确定',
              callback() {
                that.setState({ dialogVisible: false });
              },
            },
          ]}
        />
        <View style={style.btnPosition}>
          <Button
            type="primary"
            subStatus={this.state.isValid ? 'enable' : 'disable'}
            text="提交"
            disabled={!this.state.isValid}
            onPress={this.submit}
            containerStyle={style.btnStyle}
          />
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[1105],
    marginTop: px2dp(20),
  },
  pwdContainer: {
    backgroundColor: colors.white,
    paddingBottom: px2dp(104),
  },
  btnPosition: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  btnStyle: {
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0,
  },
});

export default WritePwd;
