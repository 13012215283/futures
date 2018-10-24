import React from 'react';
import { View, AsyncStorage, DeviceEventEmitter } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Toast } from 'futures/components/Toast';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

import { request } from 'futures/utils/request';
import errors from 'futures/constants/errors';
import Dialog from 'futures/components/Dialog';
import LoginComponent from './LoginComponent';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      telephone: '',
      password: '',
      isValid: false,
      getRandomText: `${Math.random()
        .toString(36)
        .slice(2, 6)}`,
      validCode: '',
      // 弹窗
      alertHeader: '',
      alertContent: '',
      alertVisible: false,
      isRealAccount: true,
    };
    this.submit = this.submit.bind(this);
    this.getTel = this.getTel.bind(this);
    this.getPsd = this.getPsd.bind(this);
    this.getValidCode = this.getValidCode.bind(this);
    this.generateValidCode = this.generateValidCode.bind(this);
    this.alertCallback = this.alertCallback.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.storageUserData = this.storageUserData.bind(this);
    this.checkAccountState = this.checkAccountState.bind(this);
    this.changeAccountType = this.changeAccountType.bind(this);
  }

  getTel(telephone) {
    this.setState({ telephone }, () => this.validation());
  }

  getPsd(password) {
    this.setState({ password }, () => this.validation());
  }

  getValidCode(validCode) {
    this.setState({ validCode }, () => this.validation());
  }

  async storageUserData(arr) {
    // 存储用户信息到本地
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

  validation() {
    // 校验
    const { telephone, password, validCode } = this.state;
    if (validCode.length === 4 && telephone.length > 0 && password.length > 0) {
      this.setState({ isValid: true });
    } else {
      this.setState({ isValid: false });
    }
  }

  generateValidCode() {
    // 组件自我生成的验证码
    this.setState({
      getRandomText: `${Math.random()
        .toString(36)
        .slice(2, 6)}`,
    });
  }

  async checkAccountState() {
    const body = { '00': this.uId };
    try {
      const { rmAnFlg } = await request('0007', body);
      if (!rmAnFlg || rmAnFlg === '4') {
        this.props.navigation.navigate('Identity', { uId: this.uId });
      } else {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'TabBar' })],
        });

        this.props.navigation.dispatch(resetAction);
      }
    } catch (err) {
      switch (err.code) {
        case errors.USER_NOT_EXIST:
          this.showAlert('账号不存在', '请重新输入');
          break;
        default:
          this.showAlert('网络错误', '请稍后重试');
      }
    }
  }

  async submit() {
    const {
      validCode,
      getRandomText,
      telephone,
      password,
      isRealAccount,
    } = this.state;
    if (validCode.toLowerCase() !== getRandomText) {
      Toast.show('验证码错误', Toast.SHORT);
      return;
    }
    const deviceId = DeviceInfo.getUniqueID();
    const result = {
      '08': telephone,
      '10': password,
      '11': deviceId,
      '13': isRealAccount ? '1' : '0',
    };
    try {
      const { id, token, mobile, type } = await request('0002', result);
      this.uId = id;
      const saveArray = [
        ['id', id],
        ['token', token],
        ['telephone', mobile],
        ['deviceId', deviceId],
        ['userType', type],
      ];
      this.storageUserData(saveArray);

      DeviceEventEmitter.emit('login', id);
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'TabBar' })],
      });
      this.props.navigation.dispatch(resetAction);
    } catch (err) {
      switch (err.code) {
        case errors.USER_NOT_EXIST:
          this.showAlert('提示', '账号不存在');
          break;
        case errors.PWD_NOT_EXIST:
          this.showAlert('密码错误', '请重新输入');
          break;
        case errors.VIRTUAL_NAME_FORMAT_ERROR:
          this.showAlert('提示', '虚拟用户名格式错误，请重新输入');
          break;
        case errors.USERTYPE_ERROR:
          this.showAlert('提示', '用户类型错误，请重新输入');
          break;
        default:
          this.showAlert('提示', '网络错误，请稍后重试');
      }
      this.generateValidCode();
    }
  }

  changeAccountType(accountType) {
    // 切换账户类型
    this.setState({
      isRealAccount: accountType === 1,
    });
  }

  render() {
    const {
      getRandomText,
      isValid,
      alertVisible,
      alertHeader,
      alertContent,
      isRealAccount,
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <LoginComponent
          getTel={this.getTel}
          getPsd={this.getPsd}
          getValidCode={this.getValidCode}
          onLogin={this.submit}
          isValid={isValid}
          realValidCode={getRandomText}
          changeValidationImg={this.generateValidCode}
          forgetPsdEvent={() => {
            this.props.navigation.navigate('ForgotPwd');
          }}
          goRegistEvent={() => this.props.navigation.navigate('Regist')}
          accountBtnPress={this.changeAccountType}
          isRealAccount={isRealAccount}
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

Login.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  navigation: PropTypes.object.isRequired,
};
