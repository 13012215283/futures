import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import {
  BothSideContainer,
  InforItem,
  TextLine,
  StatusBtn,
} from 'futures/components/TradeBlock';
import { twoDecimal, numberFormat } from 'futures/utils/numberFormat';
import { direcRender } from 'futures/components/themes';

import BaseBlock from './BaseBlock';

const { TextNormal, TextBold } = TextLine;
const { direcType } = direcRender;

function showClosePosnPrice(params) {
  let time = '成交时间';
  if (params.status === '0' || params.status === '10') {
    time = '委托时间';
  }

  if (
    params.status === '3' ||
    params.status === '8' ||
    params.status === '10'
  ) {
    return (
      <View>
        <BothSideContainer>
          <TextNormal title={time} value={params.time} />
          <TextBold title="平仓价" value={twoDecimal(params.closePrice || 0)} />
        </BothSideContainer>
        <BothSideContainer>
          <View />
          <TextBold
            title={direcType[params.direction].direction}
            value={twoDecimal(params.price)}
          />
        </BothSideContainer>
      </View>
    );
  }
  return (
    <View>
      <BothSideContainer>
        <TextNormal title={time} value={params.time} />
        <TextBold
          title={direcType[params.direction].direction}
          value={twoDecimal(params.price)}
        />
      </BothSideContainer>
    </View>
  );
}

const WithDrawHistory = props => (
  <BaseBlock {...props}>
    <StatusBtn status="revoke" />
    <InforItem
      title="方向"
      value={direcType[props.direction].text}
      textStyle={direcType[props.direction].color}
    />
    <InforItem title="价格" value={numberFormat(twoDecimal(props.price))} />
    <BothSideContainer>
      <TextNormal title="撤单时间" value={props.time} />
    </BothSideContainer>
  </BaseBlock>
);

const DealHistory = props => (
  <BaseBlock {...props}>
    <View />
    <InforItem
      title="方向"
      value={direcType[props.direction].text}
      textStyle={direcType[props.direction].color}
    />
    <View style={{ flexDirection: 'row' }}>
      <InforItem title="手续费" value={twoDecimal(props.poundage)} />
      {(props.status === '3' || props.status === '8') && (
        <InforItem title="盈亏" value={props.revenue || '0.00'} />
      )}
    </View>
    {showClosePosnPrice(props)}
  </BaseBlock>
);

module.exports = { WithDrawHistory, DealHistory };

WithDrawHistory.propTypes = {
  price: PropTypes.string,
  time: PropTypes.string,
  orderId: PropTypes.string,
  direction: PropTypes.string,
};

WithDrawHistory.defaultProps = {
  price: '',
  time: '',
  orderId: '',
  direction: '',
};

DealHistory.propTypes = {
  price: PropTypes.string,
  direction: PropTypes.string,
  revenue: PropTypes.string,
  time: PropTypes.string,
  poundage: PropTypes.string,
  orderId: PropTypes.string,
  closePrice: PropTypes.string,
  status: PropTypes.string,
};

DealHistory.defaultProps = {
  price: '',
  direction: '',
  revenue: '',
  time: '',
  poundage: '',
  orderId: '',
  closePrice: '',
  status: '',
};
