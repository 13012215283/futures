import React, { Component } from 'react';
import { ScrollView, DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';

import { EveningUpSucess } from 'futures/containers/OperationFeedBack';
import Dialog from 'futures/components/Dialog';
import { Toast } from 'futures/components/Toast';
import { request } from 'futures/utils/request';
import errtips from 'futures/constants/errtips';

import WaitingSure from './WaitingSure';

import style from './WaitingSure/style';

export default class EveningUp extends Component {
  constructor(props) {
    super(props);

    this.closeData = this.props.navigation.state.params;

    this.state = {
      opeSucess: false,
      showDilog: false,
      num: this.closeData.num,
      minPriceChangeUnit: '',
      originalPrice: '',
      openPrice: '',
    };

    this.ifEveningUp = this.ifEveningUp.bind(this);
    this.cancelEveningUp = this.cancelEveningUp.bind(this);
    this.sureEveningUp = this.sureEveningUp.bind(this);
    this.checkEveningUp = this.checkEveningUp.bind(this);
    this.getCloseInfo = this.getCloseInfo.bind(this);
  }

  componentDidMount() {
    this.getCloseInfo();
  }

  /** 获取平仓信息 */
  async getCloseInfo() {
    const { orderId, uid } = this.closeData;

    const body = {
      '00': uid,
      '21': orderId,
    };

    try {
      const response = await request('0317', body);
      const {
        num,
        price,
        minPriceChangeUnit,
        originalPrice,
        openPrice,
      } = response;
      this.setState({ num, originalPrice, minPriceChangeUnit, openPrice });

      this.WaitingSure.setCloseNum(num);
      this.WaitingSure.setClosePrice(price);
    } catch (error) {
      Toast.show(errtips[error.code] || '无法获取最新平仓数据!', Toast.SHORT);
    }
  }

  /** 是否平仓操作 */
  ifEveningUp() {
    const closeNum = this.WaitingSure.getCloseNum();
    const closePrice = this.WaitingSure.getClosePrice();
    const { originalPrice, minPriceChangeUnit } = this.state;
    const reminder = Math.abs(
      (closePrice - originalPrice) % minPriceChangeUnit
    );
    if (Number.isNaN(+closePrice) || closePrice <= 0) {
      Toast.show('平仓价格必须是合法的数字', Toast.SHORT);
      return;
    }

    if (Number.isNaN(+closeNum) || closeNum <= 0) {
      Toast.show('平仓手数必须是合法的数字', Toast.SHORT);
      return;
    }

    if (+closeNum > +this.closeData.num) {
      Toast.show('平仓手数不能大于当前手数', Toast.SHORT);
      return;
    }

    if (reminder !== 0) {
      Toast.show(
        `建仓价格不符，该品种最小价格变动单位为${minPriceChangeUnit}`,
        Toast.SHORT
      );
      return;
    }

    this.setState({
      showDilog: true,
    });
  }

  /** 取消平仓操作 */
  cancelEveningUp = () => {
    this.setState({
      showDilog: false,
    });
  };

  /** 确定要平仓操作 */
  async sureEveningUp() {
    const { uid, orderId } = this.closeData;
    const closeNum = this.WaitingSure.getCloseNum();
    const closePrice = this.WaitingSure.getClosePrice();

    const body = {
      '00': uid,
      '21': orderId,
      '05': closeNum,
      '24': closePrice,
    };

    try {
      const posData = await request('0303', body);
      if (posData) {
        this.closeData.price = closePrice;
        this.closeData.num = closeNum;

        this.setState({
          opeSucess: true,
        });

        DeviceEventEmitter.emit('consigPosition');
      }
    } catch (error) {
      const { minPriceChangeUnit } = this.state;
      if (error.code === 'OPENINGPRICE_ERROR_MIN') {
        Toast.show(
          `建仓价格不符，该品种最小价格变动单位为${minPriceChangeUnit}`,
          Toast.SHORT
        );
        return;
      }
      Toast.show(errtips[error.code] || '网络异常请稍后重试', Toast.SHORT);
    }
  }

  /** 查看平仓 */
  checkEveningUp = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {
      opeSucess,
      showDilog,
      originalPrice,
      minPriceChangeUnit,
      openPrice,
    } = this.state;

    if (!opeSucess) {
      const { num } = this.state;

      this.closeData.num = num;
      return (
        <ScrollView contentContainerStyle={style.container}>
          <WaitingSure
            ifEveningUp={this.ifEveningUp}
            {...this.closeData}
            originalPrice={originalPrice}
            minPriceChangeUnit={minPriceChangeUnit}
            openPrice={openPrice}
            ref={waiting => {
              this.WaitingSure = waiting;
            }}
          />
          <Dialog
            content="您确定将此持仓平仓吗？"
            header="提示"
            visible={showDilog}
            button={[
              {
                name: '取消',
                callback: this.cancelEveningUp,
              },
              {
                name: '确认',
                callback: this.sureEveningUp,
              },
            ]}
          />
        </ScrollView>
      );
    }

    return (
      <EveningUpSucess
        checkEveningUp={this.checkEveningUp}
        {...this.closeData}
      />
    );
  }
}

EveningUp.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.object).isRequired,
};
