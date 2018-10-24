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

class EditPwd extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      dialogText: '',
      dialogVisible: false,
      oldPwd: '',
      newPwd: '',
      confirmPwd: '',
    };
    this.uId = this.props.navigation.state.params.uId;
    this.submit = this.submit.bind(this);
    this.checkValid = this.checkValid.bind(this);
    this.checkDataValid = this.checkDataValid.bind(this);
  }

  checkValid() {
    const { oldPwd, newPwd, confirmPwd } = this.state;
    const isValid = oldPwd && confirmPwd && newPwd;

    this.setState({ isValid });
  }

  /** 只接受6位数字密码 */
  checkDataValid() {
    const pwdPattern = /^\d{6}$/;
    const { oldPwd, newPwd, confirmPwd } = this.state;
    if (
      !pwdPattern.test(oldPwd) ||
      !pwdPattern.test(newPwd) ||
      !pwdPattern.test(confirmPwd)
    ) {
      this.setState({
        dialogText: '出金密码只能为6位数字',
        dialogVisible: true,
      });
      return false;
    } else if (confirmPwd !== newPwd) {
      this.setState({
        dialogText: '两次输入密码不一致',
        dialogVisible: true,
      });
      return false;
    } else if (oldPwd === newPwd) {
      this.setState({
        dialogText: '新密码与原密码相同，请重新设置',
        dialogVisible: true,
      });
      return false;
    }
    return true;
  }

  async submit() {
    if (!this.checkDataValid()) return;

    const { newPwd, oldPwd } = this.state;
    const body = {
      '00': this.uId,
      10: oldPwd,
      11: newPwd,
    };

    try {
      await request('0036', body);
      this.props.navigation.pop();
    } catch (error) {
      if (error.code in errtips) {
        Toast.show(errtips[error.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后重试');
      }
    }
  }

  render() {
    const that = this;

    return (
      <View style={style.container}>
        <View style={style.pwdContainer}>
          <Password
            title="请输入原出金密码"
            onEnd={oldPwd => {
              this.checkValid({ oldPwd });
            }}
            // value={this.state.oldPwd}
            onChange={oldPwd => {
              this.setState({
                oldPwd,
              });
            }}
          />
          <Password
            title="请输入新的出金密码"
            // value={this.state.newPwd}
            onEnd={newPwd => {
              this.checkValid({ newPwd });
            }}
            onChange={newPwd => {
              this.setState({
                newPwd,
              });
            }}
          />
          <Password
            title="请确认新的出金密码"
            // value={this.state.confirmPwd}
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

export default {
  screen: EditPwd,
  navigationOptions: ({ navigation }) =>
    navOptions('修改出金密码', navOptions.TYPE_RED, {
      headerLeft: <BackBtn navigation={navigation} />,
    }),
};
