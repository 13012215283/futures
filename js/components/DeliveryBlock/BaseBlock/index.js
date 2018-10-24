import React, { Component } from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';

import {
  BlockHeader,
  BothSideContainer,
  InforBlock,
  InforItem,
  TextLine,
} from 'futures/components/TradeBlock';

import { px2dp } from 'futures/utils/px2dp';
import { colors } from 'futures/components/themes';
import { twoDecimal } from 'futures/utils/numberFormat';
import style from './style';

const { TextNormal, TextBold } = TextLine;

const TRADE_TYPE = {
  1: { text: '买入', color: colors[1001] },
  2: { text: '卖出', color: colors[1002] },
};

export default class BaseBlock extends Component<Props> {
  static defaultProps = {
    children: <View />,
  };

  render() {
    const { orderId, direction, num, price, time } = this.props;

    return (
      <View style={style.positionBlock}>
        <BlockHeader headtitle={`交割号：${orderId}`}>
          {this.props.children[0]}
        </BlockHeader>
        <InforBlock>
          <InforItem
            title="方向"
            value={TRADE_TYPE[direction].text}
            textStyle={{ color: TRADE_TYPE[direction].color }}
          />
          <InforItem
            selfStyle={{ width: px2dp(148) }}
            title="手数"
            value={`${num}手`}
          />
        </InforBlock>
        <BothSideContainer>
          <TextNormal title="交割时间" value={time} />
        </BothSideContainer>
        <BothSideContainer>
          <TextNormal title="交割号" value={orderId} />
          <TextBold
            title={TRADE_TYPE[direction].text}
            value={twoDecimal(price)}
          />
        </BothSideContainer>
      </View>
    );
  }
}

BaseBlock.propTypes = {
  futureName: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  num: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  deliveryPrice: PropTypes.string.isRequired,
  deposit: PropTypes.string.isRequired,
  poundage: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  children: PropTypes.element,
};
