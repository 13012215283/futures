import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Toast } from 'futures/components/Toast';
import { request } from 'futures/utils/request';
import Dialog from 'futures/components/Dialog';
import InputMoney from './InputMoney';

export default class OutMoney extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      avaliableMoney: '0',
      isShowDialog: false,
      isShowAlert: false,
    };
    const { uId } = this.props.navigation.state.params;
    this.uId = uId;
    this.withDrawValue = 0; // 出金金额
    this.submit = this.submit.bind(this);
    this.withDraw = this.withDraw.bind(this);
  }

  componentDidMount() {
    this.getAvaliableRemain();
  }

  async getAvaliableRemain() {
    // 请求：获取当前可用余额
    const body = {
      '00': this.uId,
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
    if (value - this.state.avaliableMoney > 0) {
      this.setState({
        isShowAlert: true,
      });
      return;
    }
    this.setState({
      isShowDialog: true,
    });
    this.withDrawValue = value;
  }

  async withDraw() {
    try {
      const body = { '00': this.uId, '26': this.withDrawValue };
      await request('0013', body);
      this.setState({
        isShowDialog: false,
      });
      Toast.show('出金成功', Toast.SHORT);
      this.props.navigation.navigate('OutMoneySuccess', { uId: this.uId });
    } catch (err) {
      const errorTips = {
        BALANCE_IS_INSUFFICIENT: '可用金不足',
        AMOUNT_ERROR: '金额错误',
        PARAM_INCOM: '参数不全',
      };
      Toast.show(errorTips[err.code] || '出金失败,请稍后再试', Toast.SHORT);
    }
  }

  render() {
    const {
      inputValue,
      isShowDialog,
      avaliableMoney,
      isShowAlert,
    } = this.state;

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
        <Dialog
          visible={isShowDialog}
          content="您的账户可用资金如果过低将会有爆仓的风险，建议您谨慎操作，尽量预留足够的可用金额，避免不必要的损失，您确定要出金吗？"
          button={[
            {
              name: '容我三思',
              callback: () => {
                this.setState({ isShowDialog: false });
              },
            },
            {
              name: '果断出金',
              callback: this.withDraw,
            },
          ]}
        />
        <Dialog
          visible={isShowAlert}
          content="出金金额不能高于可用金额"
          button={[
            {
              name: '我知道了',
              callback: () => {
                this.setState({ isShowAlert: false });
              },
            },
          ]}
        />
      </View>
    );
  }
}

OutMoney.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  navigation: PropTypes.object.isRequired,
};
