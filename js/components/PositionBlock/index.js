import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { BtnArea, OptionBtn, WarnTip } from 'futures/components/TradeBlock';
import noop from 'futures/utils/noop';

import BaseBlock from './BaseBlock';

const { OptionRedBtn, OptionGrayBtn } = OptionBtn;

/**
 * 持仓列表块儿
 * @property futureId 期货代码
 * @property futureName 期货名称
 */
const FinalPaymentBlock = props => (
  <BaseBlock {...props}>
    <WarnTip tip={props.desc} />
    <BtnArea>
      <OptionGrayBtn text="平 仓" onPress={() => props.toEveningUp(props)} />
      <OptionRedBtn
        text="补尾款"
        onPress={() => props.toTailPayment(props.futureId)}
      />
    </BtnArea>
  </BaseBlock>
);

const NoFinalPaymentBlock = props => (
  <BaseBlock {...props}>
    <WarnTip tip={props.desc} />
    <BtnArea>
      <OptionGrayBtn text="平 仓" onPress={() => props.toEveningUp(props)} />
    </BtnArea>
  </BaseBlock>
);

const NormalBlock = props => (
  <BaseBlock {...props}>
    <View />
    <BtnArea>
      <OptionGrayBtn
        text="查看走势"
        onPress={() => props.checkTrend(props.futureId)}
      />
      <OptionGrayBtn text="平 仓" onPress={() => props.toEveningUp(props)} />
    </BtnArea>
  </BaseBlock>
);

const BeingEvening = props => (
  <BaseBlock {...props}>
    <View tip="该持仓正在进行平仓，如需了解详情，请在委托中查看" />
    <BtnArea>
      <OptionGrayBtn
        text="查看走势"
        onPress={() => props.checkTrend(props.futureId)}
      />
    </BtnArea>
  </BaseBlock>
);

module.exports = {
  FinalPaymentBlock,
  NormalBlock,
  BeingEvening,
  NoFinalPaymentBlock,
};

FinalPaymentBlock.defaultProps = {
  toTailPayment: noop,
  toEveningUp: noop,
};

FinalPaymentBlock.propTypes = {
  desc: PropTypes.string.isRequired,
  toEveningUp: PropTypes.func,
  toTailPayment: PropTypes.func,
  futureId: PropTypes.string.isRequired,
};

NoFinalPaymentBlock.defaultProps = {
  toEveningUp: noop,
};

NoFinalPaymentBlock.propTypes = {
  desc: PropTypes.string.isRequired,
  toEveningUp: PropTypes.func,
  futureId: PropTypes.string.isRequired,
};

NormalBlock.propTypes = {
  setProfitAndLoss: PropTypes.func,
  checkTrend: PropTypes.func,
  toEveningUp: PropTypes.func,
  futureId: PropTypes.string.isRequired,
};

NormalBlock.defaultProps = {
  setProfitAndLoss: noop,
  checkTrend: noop,
  toEveningUp: noop,
};

BeingEvening.propTypes = {
  setProfitAndLoss: PropTypes.func,
  checkTrend: PropTypes.func,
  futureId: PropTypes.string.isRequired,
};

BeingEvening.defaultProps = {
  setProfitAndLoss: noop,
  checkTrend: noop,
};
