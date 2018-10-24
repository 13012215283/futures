import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import {
  BlockHeader,
  InforBlock,
  InforItem,
} from 'futures/components/TradeBlock';

import { px2dp } from 'futures/utils/px2dp';
import { direcRender } from 'futures/components/themes';
import { twoDecimal } from 'futures/utils/numberFormat';
import style from './style';

const { direcType } = direcRender;

/**
 * 持仓列表块儿
 * @property futureId 期货代码
 * @property futureName 期货名称
 */

export default class PositionBlock extends Component {
  static defaultProps = {
    children: <View />,
    futureId: '',
    futureName: '',
    direction: '',
    num: '',
    price: '',
    revenue: '',
  };

  render() {
    const { futureId, futureName, direction, num, price, revenue } = this.props;
    return (
      <View style={style.positionBlock}>
        <BlockHeader headtitle={futureName} />
        <InforBlock>
          <InforItem title="代码" value={futureId} />
          <InforItem
            title="方向"
            value={direcType[direction || '1'].direction}
            textStyle={direcType[direction || '1'].color}
          />
          <InforItem
            selfStyle={{ width: px2dp(148) }}
            title="手数"
            value={`${num}手`}
          />
          <InforItem title="价格" value={twoDecimal(price)} />
          <InforItem
            title="盈亏"
            value={twoDecimal(revenue)}
            textStyle={Number(revenue) > 0 ? style.redTex : style.greenText}
          />
        </InforBlock>
        {this.props.children[0]}
        {this.props.children[1]}
      </View>
    );
  }
}

PositionBlock.propTypes = {
  futureId: PropTypes.string,
  futureName: PropTypes.string,
  direction: PropTypes.string,
  num: PropTypes.string,
  price: PropTypes.string,
  children: PropTypes.element,
  revenue: PropTypes.string,
};
