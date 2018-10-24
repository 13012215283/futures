import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';

import Button from '../../components/Button/index';
import Icon from '../../components/Icon/Icon';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';
import Footer from '../../components/Footer/Footer';
import FooterItem from '../../components/Footer/FooterItem';

import { colors, sizes } from '../../components/themes/index';
import Statement from '../../components/Statment/Statement';
import { px2dp } from '../../utils/px2dp';
import noop from '../../utils/noop';

export default class Regist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  render() {
    const {
      iconUrl,
      getVocalValidCode,
      getValidCodeEvent,
      getPsd,
      getTel,
      getValidCode,
      getInviteCode,
      /* goToInvitePage, */
      isValid,
      onRegist,
      goRegistProtocol,
      goServiceProtocal,
      goLoginPage,
      onReadBtnPress,
      isRead,
      counter,
      isSend,
      isSendVocal,
      vocalCounter,
    } = this.props;
    const { isVisible } = this.state;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <Icon imgUrl={iconUrl} />
          <KeyboardAvoidingView behavior="padding">
            <ScrollView keyboardShouldPersistTaps="always">
              <Form>
                <Input
                  label="账号"
                  placeholder="请输入手机号"
                  keyboardType="numeric"
                  onChangeText={getTel}
                />
                <Input
                  placeholder="请输入验证码"
                  label="验证码"
                  onChangeText={getValidCode}
                >
                  <Button
                    text={!isSend ? '获取验证码' : `${counter}s后重发`}
                    type="primary"
                    subStatus={!isSend ? 'enable' : 'disable'}
                    containerStyle={styles.codeButtonContainer}
                    textStyle={styles.codeButtonText}
                    disabled={isSend}
                    onPress={getValidCodeEvent}
                  />
                </Input>
                <View style={styles.tipContainer}>
                  {isSendVocal ? (
                    <View style={styles.tipContainer}>
                      <Text style={[styles.tipText, { color: colors[1102] }]}>
                        {vocalCounter}s后再重新获取语音验证码
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.tipContainer}>
                      <View>
                        <Text style={styles.tipText}>收不到验证码？试试</Text>
                      </View>
                      <TouchableOpacity onPress={getVocalValidCode}>
                        <Text style={[styles.tipText, { color: colors[1004] }]}>
                          语音验证码
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <Input
                  placeholder="请设置密码"
                  label="密码"
                  secureTextEntry={!isVisible}
                  onChangeText={getPsd}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ isVisible: !this.state.isVisible })
                    }
                  >
                    <Text
                      style={{
                        fontSize: px2dp(44),
                        color: !isVisible ? colors[1004] : colors[1102],
                        fontFamily: 'iconfont',
                      }}
                    >
                      {isVisible ? (
                        <Text>&#xe7fa;</Text>
                      ) : (
                        <Text>&#xe7f9;</Text>
                      )}
                    </Text>
                  </TouchableOpacity>
                </Input>
                <Input
                  placeholder="请输入邀请码"
                  label="邀请码"
                  onChangeText={getInviteCode}
                >
                  {/*                  <Text
                    style={{ fontSize: sizes.f1, color: colors[1004] }}
                    onPress={goToInvitePage}
                  >
                    如何获得？
                  </Text> */}
                </Input>
              </Form>
              <Button
                text="注册"
                type="primary"
                subStatus={isValid ? 'enable' : 'disable'}
                onPress={onRegist}
                disabled={isValid ? undefined : true}
                containerStyle={{ marginTop: px2dp(64) }}
              />
              <Statement isRead={isRead} onPress={onReadBtnPress}>
                我已阅读
                <Text style={styles.blue} onPress={goRegistProtocol}>
                  《投资人注册协议》
                </Text>
                和
                <Text style={styles.blue} onPress={goServiceProtocal}>
                  《平台服务协议》
                </Text>
              </Statement>
            </ScrollView>
          </KeyboardAvoidingView>
          <Footer>
            <FooterItem text="已有账号？点击登录" onPress={goLoginPage} />
          </Footer>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Regist.propTypes = {
  iconUrl: PropTypes.string, // icon图标url
  getVocalValidCode: PropTypes.func, // 语音验证码
  getValidCodeEvent: PropTypes.func, // 获取验证码事件
  isValid: PropTypes.bool, // 是否填充，用来设置注册按钮的状态
  getPsd: PropTypes.func,
  getTel: PropTypes.func,
  getValidCode: PropTypes.func,
  getInviteCode: PropTypes.func,
  // goToInvitePage: PropTypes.func, // 去邀请码页
  onRegist: PropTypes.func, // 注册按钮事件
  goRegistProtocol: PropTypes.func, // 投资人注册协议
  goServiceProtocal: PropTypes.func, // 平台服务协议
  isRead: PropTypes.bool, // 是否已经阅读协议
  onReadBtnPress: PropTypes.func, // 点击阅读协议按钮事件
  goLoginPage: PropTypes.func, // 去往登录页
  counter: PropTypes.number.isRequired, // 验证码计时器
  isSend: PropTypes.bool.isRequired, // 发送验证码事件是否请求成功
  isSendVocal: PropTypes.bool.isRequired, // 是否发送语音验证码
  vocalCounter: PropTypes.number.isRequired, // 语音验证码倒计时
};

Regist.defaultProps = {
  iconUrl: '',
  isValid: false,
  getVocalValidCode: noop,
  getValidCodeEvent: noop,
  getPsd: noop,
  getTel: noop,
  getValidCode: noop,
  getInviteCode: noop,
  onRegist: noop,
  // goToInvitePage: noop,
  goRegistProtocol: noop,
  goServiceProtocal: noop,
  goLoginPage: noop,
  onReadBtnPress: noop,
  isRead: true,
};

const styles = StyleSheet.create({
  codeButtonContainer: {
    width: px2dp(150),
    height: px2dp(60),
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  codeButtonText: {
    fontSize: px2dp(24),
    paddingLeft: 0,
    paddingRight: 0,
  },
  tipContainer: {
    marginTop: px2dp(12),
    marginBottom: px2dp(16),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tipText: {
    textAlign: 'right',
    fontSize: sizes.f0,
    color: colors[1103],
  },
  blue: {
    color: colors[1004],
    textDecorationLine: 'underline',
  },
});
