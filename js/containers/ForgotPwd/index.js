import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import Button from 'futures/components/Button';
import { Toast } from 'futures/components/Toast';
import { apis, errtips } from 'futures/constants';
import { request } from 'futures/utils/request';
import InputItem from './InputItem';
import styles from './index.style';

// @flow
type Props = {
  navigation: Object,
};

export default class ForgotPwd extends Component<Props> {
  constructor() {
    super();
    this.state = {
      codeIsDisabled: false,
      text: '获取验证码',
      voiceCodeIsDisabled: false,
      voiceText: '',
      isShowPwd: true,
      mobile: '',
      captcha: '',
      pwd: '',
    };

    this.getCaptcha = this.getCaptcha.bind(this);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.voiceTimer) {
      clearInterval(this.voiceTimer);
    }
  }

  getCaptcha = async sendType => {
    try {
      if (sendType === '1') {
        this.countDown();
      } else if (sendType === '2') {
        this.voiceCountDown();
      }

      const mobile = this.mobileInput.getValue();
      const deviceId = DeviceInfo.getUniqueID();

      const body = {
        '09': mobile,
        '13': '2',
        '02': deviceId,
        '36': sendType,
      };

      await request(apis.UserC_sendCodes, body);

      Toast.show('验证码发送成功，请注意查收', Toast.SHORT);
    } catch (e) {
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后再试', Toast.SHORT);
      }
    }
  };

  countDown() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    let second = 60;
    this.timer = setInterval(() => {
      if (second > 0) {
        this.setState({
          text: `${second}s后重新发送`,
          codeIsDisabled: true,
        });
        second -= 1;
      } else {
        clearInterval(this.timer);
        this.setState({
          text: '获取验证码',
          codeIsDisabled: false,
        });
        second = 60;
      }
    }, 1000);
  }

  voiceCountDown() {
    if (this.voiceTimer) {
      clearInterval(this.voiceTimer);
    }

    let second = 60;
    this.voiceTimer = setInterval(() => {
      if (second > 0) {
        this.setState({
          voiceText: `电话接通中，请稍后...${second}s后重新发送`,
          voiceCodeIsDisabled: true,
        });
        second -= 1;
      } else {
        clearInterval(this.voiceTimer);
        this.setState({
          voiceText: '',
          voiceCodeIsDisabled: false,
        });
        second = 60;
      }
    }, 1000);
  }

  changeInputText({ mobile, captcha, pwd }) {
    this.setState({
      mobile,
      captcha,
      pwd,
    });
  }

  captcha() {
    const { codeIsDisabled } = this.state;
    return (
      <TouchableHighlight
        style={[
          styles.captcha,
          codeIsDisabled ? styles.disabledSubmitBtn : styles.submitBtn,
        ]}
        // activeOpacity={0.7}
        onPress={() => {
          this.getCaptcha('1');
        }}
        underlayColor="rgba(232,59,59,0.7)"
        disabled={codeIsDisabled}
      >
        <Text style={styles.captchaText}>{this.state.text}</Text>
      </TouchableHighlight>
    );
  }

  voiceCaptcha() {
    const { voiceCodeIsDisabled, voiceText } = this.state;
    if (voiceCodeIsDisabled) {
      return (
        <View style={styles.voiceCodeWrapper}>
          <Text style={styles.voiceCode}>{voiceText}</Text>
        </View>
      );
    }
    return (
      <View style={styles.voiceCodeWrapper}>
        <Text style={styles.voiceCode}>收不到验证码?试试&nbsp;</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            this.getCaptcha('2');
          }}
        >
          <View>
            <Text style={[styles.voiceCode, styles.voiceCodeBtn]}>
              语音验证码
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  toggleShowPwd = () => {
    this.setState({
      isShowPwd: !this.state.isShowPwd,
    });
  };

  checkCaptcha = async () => {
    try {
      const mobile = this.mobileInput.getValue();
      const captcha = this.captchaInput.getValue();
      const deviceId = DeviceInfo.getUniqueID();

      const body = {
        '09': mobile,
        '14': captcha,
        '13': '2',
        '02': deviceId,
      };
      await request(apis.UserC_validCodes, body);
    } catch (e) {
      throw e;
    }
  };

  submit = async () => {
    try {
      const { mobile, captcha, pwd } = this.state;
      const deviceId = DeviceInfo.getUniqueID();

      if (!mobile) {
        Toast.show('手机号码不能为空！', Toast.SHORT);
        return;
      }

      if (!captcha) {
        Toast.show('验证码不能为空', Toast.SHORT);
        return;
      }

      if (!pwd) {
        Toast.show('密码不能为空', Toast.SHORT);
        return;
      }

      this.checkCaptcha();

      const body = {
        '09': mobile,
        '11': pwd,
        '02': deviceId,
      };
      const { id, token } = await request(apis.UserC_forgetPwd, body);
      const saveArray = [
        ['id', id],
        ['token', token],
        ['telephone', mobile],
        ['deviceId', deviceId],
      ];
      Toast.show('密码修改成功', Toast.SHORT);
      AsyncStorage.multiSet(saveArray)
        .then(() => {
          this.props.navigation.navigate('TabBar');
        })
        .catch(() => {
          Toast.show('跳转登录失败，请手动登录', Toast.SHORT);
        });
    } catch (e) {
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后再试', Toast.SHORT);
      }
    }
  };

  render() {
    const { isShowPwd, mobile, captcha, pwd } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.icon}>
          <Text>占位</Text>
        </View>
        <InputItem
          leftText="账 号"
          inputParams={{ placeholder: '请输入手机号' }}
          ref={mobileInput => {
            this.mobileInput = mobileInput;
          }}
          onChange={() => {
            this.changeInputText({
              mobile: this.mobileInput.getValue(),
              captcha,
              pwd,
            });
          }}
        />
        <InputItem
          leftText="验证码"
          inputParams={{ placeholder: '请输入验证码' }}
          style={styles.inputItem}
          rightComponent={this.captcha()}
          ref={captchaInput => {
            this.captchaInput = captchaInput;
          }}
          onChange={() => {
            this.changeInputText({
              mobile,
              captcha: this.captchaInput.getValue(),
              pwd,
            });
          }}
        />
        {this.voiceCaptcha()}
        <InputItem
          ref={pwdInput => {
            this.pwdInput = pwdInput;
          }}
          onChange={() => {
            this.changeInputText({
              mobile,
              captcha,
              pwd: this.pwdInput.getValue(),
            });
          }}
          leftText="密 码"
          inputParams={{
            placeholder: '请输入新密码',
            secureTextEntry: this.state.isShowPwd,
          }}
          rightComponent={
            <TouchableWithoutFeedback onPress={this.toggleShowPwd}>
              <View>
                {isShowPwd ? (
                  <Text style={styles.showPwd}>&#xe7fa;</Text>
                ) : (
                  <Text style={styles.showPwd}>&#xe7f9;</Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          }
        />
        <View style={styles.btnView}>
          <Button
            type="primary"
            text="提交"
            subStatus=""
            onPress={this.submit}
            containerStyle={
              mobile && captcha && pwd
                ? styles.submitBtn
                : styles.disabledSubmitBtn
            }
          />
        </View>
      </View>
    );
  }
}
