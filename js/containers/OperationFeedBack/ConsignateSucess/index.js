import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Button from 'futures/components/Button';
import {
  BlockHeader,
  LabBtn,
  BothSideContainer,
} from 'futures/components/TradeBlock';

import FeedBackHead from '../FeedBackHead';
import style from './style';

export default class ConsignateSucess extends Component {
  render() {
    return (
      <FeedBackHead title="委托成功">
        <View style={style.body}>
          <BlockHeader
            headtitle="Apple iPhone X(A1865)256GB 深空灰色按钮"
            headerStyle={style.headerStyle}
            headerFont={style.headerFont}
          >
            <LabBtn text="01588" />
          </BlockHeader>
          <BothSideContainer containerStyle={style.containerStyle}>
            <Text>平仓时间</Text>
            <Text>2017-12-05 15:38:00</Text>
          </BothSideContainer>
          <BothSideContainer containerStyle={style.containerStyle}>
            <Text>平仓价格</Text>
            <Text>9214.00</Text>
          </BothSideContainer>
          <BothSideContainer containerStyle={style.containerStyle}>
            <Text>平仓手数</Text>
            <Text>10手</Text>
          </BothSideContainer>
          <BothSideContainer containerStyle={style.containerStyle}>
            <Text>盈亏</Text>
            <Text>-123225.00</Text>
          </BothSideContainer>
        </View>
        <Button
          type="primary"
          text="查看委托"
          subStatus="enable"
          containerStyle={style.sureBtn}
        />
      </FeedBackHead>
    );
  }
}
