import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../../components/Icon/Icon';
import Form from '../../components/Form/Form';
import Footer from '../../components/Footer/Footer';
import FooterItem from '../../components/Footer/FooterItem';
import Input from '../../components/Form/Input';
import Button from '../../components/Button/index';
import { colors } from '../../components/themes/index';
import { px2dp } from '../../utils/px2dp';
import noop from '../../utils/noop';
import RandomValidationComponent from '../../components/RandomValidation';
import RealUserBtnGroup from './RealUserBtnGroup';

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  render() {
    const {
      iconUrl,
      changeValidationImg,
      getTel,
      getPsd,
      getValidCode,
      isValid,
      onLogin,
      forgetPsdEvent,
      goRegistEvent,
      realValidCode,
      isRealAccount,
      accountBtnPress,
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
          <RealUserBtnGroup
            btnOnPress={accountBtnPress}
            isRealAccount={isRealAccount}
          />
          <KeyboardAvoidingView behavior="padding">
            <ScrollView keyboardShouldPersistTaps="always">
              <Form>
                <Input
                  label="账号"
                  placeholder="请输入手机号或ID"
                  keyboardType="numeric"
                  onChangeText={text => {
                    getTel(text);
                  }}
                />
                <Input
                  label="密码"
                  placeholder="请输入密码"
                  onChangeText={text => {
                    getPsd(text);
                  }}
                  secureTextEntry={!isVisible}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ isVisible: !this.state.isVisible })
                    }
                  >
                    <Text
                      style={{
                        fontSize: px2dp(44),
                        color: isVisible ? colors[1004] : colors[1102],
                        fontFamily: 'iconfont',
                      }}
                    >
                      {!isVisible ? (
                        <Text>&#xe7fa;</Text>
                      ) : (
                        <Text>&#xe7f9;</Text>
                      )}
                    </Text>
                  </TouchableOpacity>
                </Input>
                <Input
                  label="验证码"
                  placeholder="请输入验证码"
                  onChangeText={text => {
                    getValidCode(text);
                  }}
                >
                  <TouchableOpacity onPress={changeValidationImg}>
                    <RandomValidationComponent randomString={realValidCode} />
                  </TouchableOpacity>
                  <Text onPress={changeValidationImg}>换一张？</Text>
                </Input>
              </Form>
              <Button
                text="登录"
                type="primary"
                subStatus={isValid ? 'enable' : 'disable'}
                onPress={onLogin}
                disabled={isValid ? undefined : true}
              />
            </ScrollView>
            <View style={{ height: 60 }} />
          </KeyboardAvoidingView>
          <Footer>
            <FooterItem text="忘记密码" onPress={forgetPsdEvent} />
            <FooterItem text="|" type="separating" />
            <FooterItem text="注册账户" onPress={goRegistEvent} />
          </Footer>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

LoginComponent.propTypes = {
  iconUrl: PropTypes.string, // icon图片地址
  changeValidationImg: PropTypes.func, // 更改验证码函数
  realValidCode: PropTypes.string.isRequired, // 生成的随机验证码
  getTel: PropTypes.func, // 获得帐号的回调函数
  getPsd: PropTypes.func,
  getValidCode: PropTypes.func,
  isValid: PropTypes.bool, // 表单是否填充，用于更改登录按钮的状态
  onLogin: PropTypes.func, // 登录事件
  forgetPsdEvent: PropTypes.func, // 忘记密码
  goRegistEvent: PropTypes.func, // 注册账户
  isRealAccount: PropTypes.bool,
  accountBtnPress: PropTypes.func.isRequired,
};

LoginComponent.defaultProps = {
  iconUrl: '',
  isValid: false,
  getTel: noop,
  getPsd: noop,
  changeValidationImg: noop,
  getValidCode: noop,
  onLogin: noop,
  forgetPsdEvent: noop,
  goRegistEvent: noop,
  isRealAccount: true,
};
