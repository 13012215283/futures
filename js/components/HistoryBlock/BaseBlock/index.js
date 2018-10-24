import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import {
  BlockHeader,
  InforBlock,
  InforItem,
} from 'futures/components/TradeBlock';

import { px2dp } from 'futures/utils/px2dp';
import style from './style';

export default class BaseBlock extends Component {
  static defaultProps = {
    children: <View />,
    futureName: '',
    futureId: '',
    num: '',
  };

  render() {
    const { futureId, num, futureName } = this.props;

    return (
      <View style={style.positionBlock}>
        <BlockHeader headtitle={futureName}>
          {this.props.children[0]}
        </BlockHeader>
        <InforBlock>
          <InforItem title="代码" value={futureId} />
          {this.props.children[1]}
          <InforItem
            selfStyle={{ width: px2dp(148) }}
            title="手数"
            value={`${num}手`}
          />
          {this.props.children[2]}
        </InforBlock>
        {this.props.children[3]}
        {this.props.children[4]}
      </View>
    );
  }
}

BaseBlock.propTypes = {
  futureId: PropTypes.string,
  num: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
  futureName: PropTypes.string,
};
