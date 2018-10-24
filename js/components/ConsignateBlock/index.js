import React from 'react';
import PropTypes from 'prop-types';

import {
  BtnArea,
  OptionBtn,
  StatusBtn,
  BothSideContainer,
  TextLine,
} from 'futures/components/TradeBlock';

import BaseBlock from './BaseBlock';

const { TextNormal } = TextLine;
const { OptionRedBtn, OptionGrayBtn } = OptionBtn;

/**
 * 持仓列表块儿
 * @property futureId 期货代码
 * @property futureName 期货名称
 */
const DisTraded = props => (
  <BaseBlock {...props}>
    <StatusBtn status="unsettled" />
    <BothSideContainer>
      <TextNormal title="委托时间" value={props.time} />
    </BothSideContainer>
    <BtnArea>
      <OptionGrayBtn
        text="查看走势"
        onPress={() => props.goMarket(props.futureId)}
      />
      <OptionRedBtn
        text="撤 单"
        onPress={() => {
          props.revoke(props.orderId);
        }}
      />
    </BtnArea>
  </BaseBlock>
);

const WithDrawTrade = props => (
  <BaseBlock {...props}>
    <StatusBtn status="revoke" />
    <BothSideContainer>
      <TextNormal title="撤单时间" value={props.time} />
    </BothSideContainer>
  </BaseBlock>
);

module.exports = { DisTraded, WithDrawTrade };

DisTraded.propTypes = {
  time: PropTypes.string.isRequired,
  revoke: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
  futureId: PropTypes.string.isRequired,
  goMarket: PropTypes.func.isRequired,
};

WithDrawTrade.propTypes = {
  time: PropTypes.string.isRequired,
};
