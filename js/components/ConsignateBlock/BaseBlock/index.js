import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import {
  BlockHeader,
  InforBlock,
  InforItem,
  // TextLine,
  // BothSideContainer,
} from 'futures/components/TradeBlock';
import { twoDecimal } from 'futures/utils/numberFormat';
import { px2dp } from 'futures/utils/px2dp';
import { colors } from 'futures/components/themes';
import style from './style';

// const { TextNormal } = TextLine;

// 方向：1买入 2卖出
const TRADE_TYPE = {
  '1': { text: '买入', color: colors[1001] },
  '2': { text: '卖出', color: colors[1002] },
};

export default class BaseBlock extends Component<Props> {
  static defaultProps = {
    children: <View />,
  };

  render() {
    const {
      direction,
      futureId,
      futureName,
      num,
      price,
      // orderId,
      // status,
    } = this.props;

    return (
      <View style={style.positionBlock}>
        <BlockHeader headtitle={futureName}>
          {this.props.children[0]}
        </BlockHeader>
        <InforBlock>
          <InforItem title="代码" value={futureId} />
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
          <InforItem title="价格" value={twoDecimal(price)} />
        </InforBlock>
        {this.props.children[1]}
        {/* <BothSideContainer>
          <TextNormal title="权益号" value={orderId} />
        </BothSideContainer> */}
        {this.props.children[2]}
      </View>
    );
  }
}

BaseBlock.propTypes = {
  futureId: PropTypes.string.isRequired,
  futureName: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  num: PropTypes.string.isRequired,
  loss: PropTypes.string.isRequired,
  profit: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
};
