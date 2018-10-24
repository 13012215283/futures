import React, { Component } from 'react';
import { View } from 'react-native';
import Button from 'futures/components/Button';
import { navOptions, BackBtn } from 'futures/navigations';
import Input from 'futures/components/AddressInput';
import { colors } from 'futures/components/themes';
import {
  testPhone,
  testIDCards,
  testBankCard,
} from 'futures/utils/informValidTest';
import Dialog from 'futures/components/Dialog';
import { px2sp } from 'futures/utils/px2sp';
import { errtips, routes } from 'futures/constants';
import { request } from 'futures/utils/request';
import { Toast } from 'futures/components/Toast';

// @flow
type Props = {
  navigation: object,
};

class SetWithdrawPwd extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const title = {
      setting: '设置出金密码',
      forget: '忘记出金密码',
    };
    const { params } = navigation.state;
    return navOptions(title[params.operation], navOptions.TYPE_RED, {
      headerLeft: <BackBtn navigation={navigation} />,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      name: '',
      idCard: '',
      bankCard: '',
      mobile: '',
    };

    this.uId = this.props.navigation.state.params.uId;
    this.renderBtn = this.renderBtn.bind(this);
    this.checkDataValid = this.checkDataValid.bind(this);
    this.checkValid = this.checkValid.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  /** 检验按钮是否可用 */
  checkValid(value) {
    this.setState(value, () => {
      const { name, bankCard, mobile, idCard } = this.state;
      const isValid = name && bankCard && mobile && idCard;

      this.setState({ isValid });
    });
  }

  /** 检验数据是否通过校验 */
  checkDataValid() {
    const { name, mobile, idCard, bankCard } = this.state;
    /* eslint-disable next-line */
    const namePattern = /^([a-zA-Z0-9\u4e00-\u9fa5]{1,10})$/;
    let warnText = '';

    if (!namePattern.test(name)) {
      warnText = '请输入正确的姓名!';
    }

    if (!testIDCards(idCard)) {
      warnText = '请输入正确的身份证号!';
    }

    if (!testBankCard(bankCard)) {
      warnText = '请输入正确的银行卡号!';
    }

    if (!testPhone(mobile)) {
      warnText = '请输入正确的手机号码!';
    }

    if (warnText) {
      this.setState({
        dialogText: warnText,
        dialogVisible: true,
      });
      return false;
    }

    return true;
  }

  async nextStep() {
    if (!this.checkDataValid()) return;

    const { operation } = this.props.navigation.state.params;
    const { name, bankCard, mobile, idCard } = this.state;

    try {
      const body = {
        '00': this.uId,
        '15': name,
        '16': idCard,
        '18': bankCard,
        '09': mobile,
      };
      await request('0037', body);
      this.props.navigation.navigate(routes.WritePwd, {
        uId: this.uId,
        operation,
      });
    } catch (e) {
      if (e.code in errtips) {
        this.setState({
          dialogText: errtips[e.code],
          dialogVisible: true,
        });
      } else {
        Toast.show('未知错误，请稍后重试', Toast.SHORT);
      }
    }
  }

  /** 渲染按钮 */
  renderBtn() {
    return (
      <Button
        type="primary"
        subStatus={this.state.isValid ? 'enable' : 'disable'}
        text="下一步"
        disabled={!this.state.isValid}
        onPress={this.nextStep}
        containerStyle={{
          marginLeft: 0,
          marginRight: 0,
          borderRadius: 0,
        }}
      />
    );
  }

  /** 渲染弹窗 */
  renderDialog() {
    const that = this;
    return (
      <Dialog
        visible={this.state.dialogVisible}
        content={this.state.dialogText}
        button={[
          {
            name: '确定',
            callback() {
              that.setState({ dialogVisible: false });
            },
          },
        ]}
      />
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: px2sp(20),
          backgroundColor: colors[1105],
        }}
      >
        <Input
          label="真实姓名"
          value={this.state.name}
          onChangeText={name => this.checkValid({ name })}
          placeholder="请输入真实姓名"
          placeholderTextColor={colors[1103]}
        />
        <Input
          label="身份证号"
          value={this.state.idCard}
          onChangeText={idCard => this.checkValid({ idCard })}
          placeholder="请输入身份证号"
          placeholderTextColor={colors[1103]}
        />
        <Input
          label="银行卡号"
          value={this.state.bankCard}
          onChangeText={bankCard => this.checkValid({ bankCard })}
          placeholder="请输入银行卡号"
          placeholderTextColor={colors[1103]}
        />
        <Input
          label="手机号"
          value={this.state.mobile}
          onChangeText={mobile => this.checkValid({ mobile })}
          placeholder="请输入预留手机号"
          placeholderTextColor={colors[1103]}
        />
        {this.renderDialog()}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}
        >
          {this.renderBtn()}
        </View>
      </View>
    );
  }
}

export default SetWithdrawPwd;
