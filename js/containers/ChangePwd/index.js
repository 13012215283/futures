import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Toast } from 'futures/components/Toast';

import { navOptions, BackBtn } from 'futures/navigations';
import Button from 'futures/components/Button';
import { request } from 'futures/utils/request';
import { apis, errtips } from 'futures/constants';

import Item from './Item';
import style from './style';

/* eslint-disable no-console */
class ChangePwd extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      oldPwd: '',
      newPwd: '',
      isvalid: false,
      confirmPwd: '',
    };

    this.checkBtnValid = this.checkBtnValid.bind(this);
    this.confirmUpdate = this.confirmUpdate.bind(this);
  }

  async confirmUpdate() {
    if (!this.checkPwd()) {
      return;
    }

    try {
      const id = await AsyncStorage.getItem('id');
      const { oldPwd, newPwd } = this.state;
      const body = {
        '00': id,
        '10': oldPwd,
        11: newPwd,
      };

      await request(apis.UserC_rePwd, body);
      Toast.show('修改密码成功', Toast.SHORT);
      this.props.navigation.goBack();
    } catch (e) {
      Toast.show(errtips[e.code], Toast.SHORT);
    }
  }

  checkBtnValid() {
    const { oldPwd, newPwd, confirmPwd } = this.state;
    const isvalid = oldPwd && newPwd && confirmPwd;

    this.setState({ isvalid });
  }

  checkPwd() {
    const { newPwd, confirmPwd } = this.state;
    // 密码长度为8-16位，只接受数字和字母
    const pattern = /^[0-9A-Za-z]{8,16}$/;
    if (!pattern.test(newPwd) || !pattern.test(confirmPwd)) {
      Toast.show('密码必须是8-16位，并且只接受数字和字母', Toast.SHORT);
      return false;
    }
    if (newPwd !== confirmPwd) {
      Toast.show('两次输入密码不一致', Toast.SHORT);
      return false;
    }
    return true;
  }

  render() {
    const { isvalid } = this.state;

    return (
      <View style={style.container}>
        <Item
          label="请输入原密码"
          onChangeText={value =>
            this.setState({ oldPwd: value }, () => this.checkBtnValid())
          }
        />
        <Item
          label="请输入新密码"
          onChangeText={value =>
            this.setState({ newPwd: value }, () => this.checkBtnValid())
          }
        />
        <Item
          label="请再次输入新密码"
          onChangeText={value =>
            this.setState({ confirmPwd: value }, () => this.checkBtnValid())
          }
        />
        <Text style={style.info}>
          密码长度为8-16个字符，最好是数字、字母组合
        </Text>
        <View style={style.btnPosition}>
          <Button
            type="primary"
            subStatus={isvalid ? 'enable' : 'disable'}
            text="确认修改"
            onPress={this.confirmUpdate}
            disabled={!isvalid}
          />
        </View>
      </View>
    );
  }
}

export default {
  screen: ChangePwd,
  navigationOptions: props =>
    navOptions('修改密码', navOptions.TYPE_RED, {
      headerLeft: <BackBtn {...props} />,
    }),
};
