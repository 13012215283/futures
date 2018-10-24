import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Toast } from 'futures/components/Toast';
import { request } from 'futures/utils/request';
import { charge } from 'futures/utils/charge';
import InputMoney from './InputMoney';

export default class MyAccountIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      avaliableMoney: '0',
    };
    const { uId } = this.props.navigation.state.params;
    this.uId = uId;
    this.submit = this.submit.bind(this);
    this.goInMoneySuccess = this.goInMoneySuccess.bind(this);
  }

  componentDidMount() {
    this.getAvaliableRemain();
  }

  async getAvaliableRemain() {
    // 请求：获取当前可用余额
    const body = {
      '00': this.props.navigation.state.params.uId,
    };
    try {
      const { availableValue } = await request('0018', body);
      this.setState({
        avaliableMoney: availableValue,
      });
    } catch (e) {
      switch (e.code) {
        case 'USER_NOT_EXIST':
          Toast.show('用户不存在', Toast.SHORT);
          break;
        default:
          Toast.show('获取可用余额错误', Toast.SHORT);
      }
    }
  }
  submit(value) {
    const { avaliableMoney } = this.state;
    charge(value, '描述信息文案', this.uId, '0', (res, error) => {
      if (error) {
        Toast.show(error, Toast.SHORT);
      } else {
        // 成功跳转
        this.goInMoneySuccess(value, avaliableMoney);
        this.props.navigation.state.params.inMoneySuccess(value);
      }
    });
  }

  goInMoneySuccess(value, avaliableMoney) {
    const {
      bankName,
      bankCardNo,
      bankLogo,
    } = this.props.navigation.state.params;
    this.props.navigation.navigate('InMoneySuccess', {
      bankLogo,
      bankName,
      cardId: bankCardNo,
      inMoneyValue: value,
      avaliableMoney,
      time: '2017-01-01 01:01:00', // TODO:原生？自己本地的？
    });
  }

  render() {
    const { inputValue, avaliableMoney } = this.state;
    const {
      bankName,
      bankCardNo,
      bankLogo,
    } = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1 }}>
        <InputMoney
          bankName={bankName}
          navigation={this.props.navigation}
          avaliableMoney={avaliableMoney}
          cardId={bankCardNo}
          onBtnPress={this.submit}
          inputValue={inputValue}
          bankLogo={bankLogo}
        />
      </View>
    );
  }
}

MyAccountIndex.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  navigation: PropTypes.object.isRequired,
};
