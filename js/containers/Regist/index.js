import React from 'react';
import { View, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info';

import { request } from 'futures/utils/request';
import errors from 'futures/constants/errors';
import Dialog from 'futures/components/Dialog';
import RegistComponent from './RegistComponent';

const deviceId = DeviceInfo.getUniqueID();

export default class Regist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountInput: '',
      password: '',
      inviteCode: '',
      validCode: '',
      isValid: false,
      isRead: true,
      isPwdValid: false, // 密码是否合法
      // 验证码
      isSendValidCode: false,
      counter: 60,
      vocalCounter: 60,
      isSendVocalCode: false,
      isTelephoneValid: false,
    };

    this.getTel = this.getTel.bind(this);
    this.getPsd = this.getPsd.bind(this);
    this.getValidCode = this.getValidCode.bind(this);
    this.getInviteCode = this.getInviteCode.bind(this);
    this.getValidCodeEvent = this.getValidCodeEvent.bind(this);
    this.onReadBtnPress = this.onReadBtnPress.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.alertCallback = this.alertCallback.bind(this);
    this.checkValidCode = this.checkValidCode.bind(this);
    this.checkPwdValid = this.checkPwdValid.bind(this);
  }

  onReadBtnPress() {
    this.setState({
      isRead: !this.state.isRead,
    });
  }

  getTel(accountInput) {
    this.setState({ accountInput }, () => this.validation());
  }

  getPsd(password) {
    this.setState({ password }, () => {
      this.checkPwdValid();
      this.validation();
    });
  }

  getInviteCode(inviteCode) {
    this.setState({ inviteCode });
  }

  getValidCode(validCode) {
    this.setState({ validCode }, () => this.validation());
  }

  async getValidCodeEvent(codeType) {
    // 获取验证码点击事件
    if (!this.state.isTelephoneValid) {
      this.showAlert(undefined, '请输入正确的手机号');
      return;
    }
    const { accountInput } = this.state;
    const result = {
      '09': accountInput,
      '13': '1',
      '02': deviceId,
      '36': codeType,
    };
    // 请求：获取验证码,发短信
    try {
      await request('0004', result);
      if (codeType === 1) {
        this.textCodeInterval();
      } else {
        this.vocalCodeInterval();
      }
    } catch (err) {
      switch (err.code) {
        case errors.USER_EXIST:
          this.showAlert('用户已存在', '请您重新登录');
          break;
        case errors.SENDCODE_OVER_TIMES:
          this.showAlert('发送次数超过限制', '请您稍后再试');
          break;
        case errors.INVALIDCODE_OVER_TIMES:
          this.showAlert('失效次数超过限制', '请您稍后再试');
          break;
        default:
          this.showAlert('网络错误', '请稍后重试');
      }
    }
  }

  textCodeInterval() {
    this.setState({
      isSendValidCode: true,
    });
    // 获取验证码点击事件
    let { counter } = this.state;
    this.timer = setInterval(() => {
      if (counter < 1) {
        this.setState({ isSendValidCode: false, counter: 60 });
        clearInterval(this.timer);
      } else {
        counter -= 1;
        this.setState({
          counter,
        });
      }
    }, 1000);
  }

  vocalCodeInterval() {
    this.setState({
      isSendVocalCode: true,
    });
    // 获取验证码点击事件
    let { vocalCounter } = this.state;
    this.vocalTimer = setInterval(() => {
      if (vocalCounter < 1) {
        this.setState({ isSendVocalCode: false, vocalCounter: 60 });
        clearInterval(this.vocalTimer);
      } else {
        vocalCounter -= 1;
        this.setState({
          vocalCounter,
        });
      }
    }, 1000);
  }

  async checkValidCode() {
    const { isPwdValid } = this.state;
    if (!isPwdValid) {
      this.showAlert(undefined, '密码为8~16位字母数字组合');
      return;
    }
    // 请求: 校验验证码
    try {
      const result = {
        '09': this.state.accountInput,
        '14': this.state.validCode,
        '13': '1',
        '02': deviceId,
      };
      await request('0015', result);
      this.registEvent();
    } catch (err) {
      switch (err.code) {
        case errors.CODES_OVERDUE:
          this.showAlert('验证码失效', '请重新发送');
          break;
        case errors.USER_EXIST:
          this.showAlert('用户已存在', '请登录');
          break;
        case errors.CODES_ERROR:
          this.showAlert('验证码错误', '请重试');
          break;
        default:
          this.showAlert('网络错误', '请稍后重试');
      }
    }
  }

  async saveDataToLocal(arr) {
    try {
      await AsyncStorage.multiSet(arr);
    } catch (err) {
      this.showAlert(undefined, '数据存储失败');
    }
  }

  alertCallback() {
    // Dialog组件按钮的回调
    this.setState({
      alertVisible: false,
    });
  }

  showAlert(title, content) {
    // 显示弹窗内容
    this.setState({
      alertHeader: title,
      alertContent: content,
      alertVisible: true,
    });
  }

  checkPwdValid() {
    const { password } = this.state;
    const pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    if (pattern.test(password)) {
      this.setState({
        isPwdValid: true,
      });
      return;
    }
    this.setState({
      isPwdValid: false,
    });
  }

  validation() {
    // 校验
    const { accountInput, password, isRead, validCode } = this.state;
    // 验证账号是否为手机号码
    const pattern = /^1[34578]\d{9}$/;
    if (pattern.test(accountInput)) {
      this.setState({ isTelephoneValid: true });
    } else {
      this.setState({ isTelephoneValid: false });
      return;
    }

    if (
      pattern.test(accountInput) &&
      password.length > 0 &&
      isRead &&
      validCode.length === 6
    ) {
      this.setState({ isValid: true });
    } else {
      this.setState({ isValid: false });
    }
  }

  async registEvent() {
    try {
      const { accountInput, password, inviteCode } = this.state;
      const result = {
        '09': accountInput,
        '10': password,
        '12': inviteCode,
        '02': deviceId,
        '01': '',
      };
      const { id, token } = await request('0000', result);
      const saveArray = [
        ['id', id],
        ['token', token],
        ['deviceId', deviceId],
        ['telephone', accountInput],
      ];
      this.saveDataToLocal(saveArray);
      this.showAlert(
        '注册成功',
        `您已注册成功，真实账户名为：${id}，模拟账户名为：analog${id}，模拟账户的初始密码与真实账户密码相同，请牢记您的密码`
      );
      this.props.navigation.navigate('Identity', { source: 'Regist', uId: id });
    } catch (err) {
      switch (err.code) {
        case errors.USER_EXIST:
          this.showAlert(' 用户已存在', '请登录');
          break;
        case errors.INVITECODE_ERROR:
          this.showAlert('邀请码错误', '请重试');
          break;
        default:
          this.showAlert('网络错误', '请稍后重试');
      }
    }
  }

  render() {
    const {
      isValid,
      isRead,
      isSendValidCode,
      counter,
      alertVisible,
      alertHeader,
      alertContent,
      vocalCounter,
      isSendVocalCode,
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <RegistComponent
          getTel={this.getTel}
          getPsd={this.getPsd}
          getValidCode={this.getValidCode}
          getValidCodeEvent={() => this.getValidCodeEvent(1)}
          getInviteCode={this.getInviteCode}
          onRegist={this.checkValidCode}
          goLoginPage={() => this.props.navigation.navigate('Login')}
          goToInvitePage={() => this.props.navigation.navigate('InviteCode')}
          onReadBtnPress={this.onReadBtnPress}
          isValid={isValid}
          isRead={isRead}
          isSend={isSendValidCode}
          counter={counter}
          vocalCounter={vocalCounter}
          isSendVocal={isSendVocalCode}
          getVocalValidCode={() => this.getValidCodeEvent(2)}
        />
        <Dialog
          content={alertContent}
          header={alertHeader}
          button={[{ name: '确定', callback: this.alertCallback }]}
          visible={alertVisible}
        />
      </View>
    );
  }
}

Regist.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  navigation: PropTypes.object.isRequired,
};
