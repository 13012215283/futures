import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { numberFormat, twoDecimal } from 'futures/utils/numberFormat';

import Button from 'futures/components/Button';
import {
  BlockHeader,
  LabBtn,
  BothSideContainer,
} from 'futures/components/TradeBlock';
import noop from 'futures/utils/noop';

import FeedBackHead from '../FeedBackHead';
import style from './style';

export default class EveningUpSucess extends Component {
  static defaultProps = {
    checkEveningUp: noop,
    futureName: '',
    time: '',
    price: '',
    num: '',
    futureId: '',
  };

  constructor(props) {
    super(props);

    this.checkEveningUp = this.checkEveningUp.bind(this);
  }

  checkEveningUp = () => {
    this.props.checkEveningUp();
  };

  render() {
    const { futureName, time, price, num, futureId } = this.props;

    return (
      <FeedBackHead title="委托平仓成功">
        <View style={style.body}>
          <BlockHeader
            headtitle={futureName}
            headerStyle={style.headerStyle}
            headerFont={style.headerFont}
          >
            <LabBtn text={futureId} />
          </BlockHeader>
          <BothSideContainer containerStyle={style.containerStyle}>
            <Text>委托平仓时间</Text>
            <Text>{time}</Text>
          </BothSideContainer>
          <BothSideContainer containerStyle={style.containerStyle}>
            <Text>委托平仓价格</Text>
            <Text>{numberFormat(twoDecimal(price))}</Text>
          </BothSideContainer>
          <BothSideContainer containerStyle={style.containerStyle}>
            <Text>委托平仓手数</Text>
            <Text>{num}手</Text>
          </BothSideContainer>
        </View>
        <Button
          type="primary"
          text="查看平仓"
          subStatus="enable"
          containerStyle={style.sureBtn}
          onPress={this.checkEveningUp}
        />
      </FeedBackHead>
    );
  }
}

EveningUpSucess.propTypes = {
  checkEveningUp: PropTypes.func,
  futureName: PropTypes.string,
  time: PropTypes.string,
  price: PropTypes.string,
  num: PropTypes.string,
  futureId: PropTypes.string,
};
