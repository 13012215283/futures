import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import {
  BlockHeader,
  LabBtn,
  BothSideContainer,
  TextLine,
  WarnTip,
} from 'futures/components/TradeBlock';
import Button from 'futures/components/Button';
import Stepper from 'futures/components/Stepper';
import noop from 'futures/utils/noop';
import { direcRender } from 'futures/components/themes';
import { numberFormat, twoDecimal } from 'futures/utils/numberFormat';

import style from './style';

const { direcStyle } = direcRender;
const { TextNormal } = TextLine;

class WaitingSure extends Component {
  static defaultProps = {
    ifEveningUp: noop,
    futureName: '',
    futureId: '',
    orderId: '',
    direction: '',
    time: '',
    price: '',
    num: '',
    originalPrice: '',
    minPriceChangeUnit: '',
    openPrice: '',
  };

  constructor(props) {
    super(props);

    this.ifEveningUp = this.ifEveningUp.bind(this);
    this.getCloseNum = this.getCloseNum.bind(this);
    this.getClosePrice = this.getClosePrice.bind(this);
    this.setClosePrice = this.setClosePrice.bind(this);
    this.setCloseNum = this.setCloseNum.bind(this);
  }

  /** 获取平仓价格 */
  getClosePrice() {
    return this.closePrice.getValue();
  }

  /** 获取平仓手数 */
  getCloseNum() {
    return this.closeNum.getValue();
  }

  /** 设置平仓价格 */
  setClosePrice(price) {
    this.closePrice.setValue(price);
  }

  /** 设置平仓手数 */
  setCloseNum(num) {
    this.closeNum.setValue(num);
  }

  /** 是否平仓点击事件 */
  ifEveningUp() {
    this.props.ifEveningUp();
  }

  render() {
    const {
      futureName,
      futureId,
      orderId,
      time,
      num,
      price,
      originalPrice,
      minPriceChangeUnit,
      openPrice,
    } = this.props;
    /** 方向反向 */
    const reverseDirection = this.props.direction === '1' ? '2' : '1';
    return (
      <View>
        <View style={style.totalList}>
          <BlockHeader
            headtitle={futureName}
            headerStyle={style.headerStyle}
            headerFont={style.headerFont}
          >
            <LabBtn text={futureId} />
          </BlockHeader>
          <BothSideContainer containerStyle={style.containerStyle}>
            <Text>权益号</Text>
            <Text>{orderId.split('!=end=!').join('')}</Text>
          </BothSideContainer>
          <BothSideContainer containerStyle={style.containerStyle}>
            <Text>建仓方向</Text>
            <Text style={direcStyle[reverseDirection].color}>
              {direcStyle[reverseDirection].text}
            </Text>
          </BothSideContainer>
          <BothSideContainer containerStyle={style.containerStyle}>
            <Text>建仓时间</Text>
            <Text>{time}</Text>
          </BothSideContainer>
          <View style={style.inputOperation}>
            <BothSideContainer containerStyle={style.containerStyle}>
              <Text>平仓价格</Text>
              <Stepper
                max={openPrice * 1.1}
                min={openPrice * 0.9}
                step={minPriceChangeUnit}
                value={price}
                originalValue={originalPrice}
                ref={closePrice => {
                  this.closePrice = closePrice;
                }}
              />
            </BothSideContainer>
            <BothSideContainer containerStyle={style.containerStyle}>
              <View />
              <TextNormal
                title="建仓均价"
                value={numberFormat(twoDecimal(price))}
                valueStyle={style.redText}
              />
            </BothSideContainer>
            <BothSideContainer containerStyle={style.containerStyle}>
              <Text>平仓手数</Text>
              <Stepper
                step={1}
                min={1}
                max={num}
                value={num}
                ref={c => {
                  this.closeNum = c;
                }}
              />
            </BothSideContainer>
            <BothSideContainer containerStyle={style.containerStyle}>
              <View />
              <TextNormal title="当前可平仓手数为" value={num} />
            </BothSideContainer>
          </View>
        </View>
        <WarnTip
          tip="注：平仓后会生成与当前持仓建仓方向相反的仓单，待生成的委托仓单成交后此仓单平仓成功并按照相应的成交价格收取交易手续费"
          noStyle
        />
        <Button
          type="primary"
          text="确认平仓"
          subStatus="enable"
          containerStyle={style.sureBtn}
          onPress={this.ifEveningUp}
        />
      </View>
    );
  }
}

WaitingSure.propTypes = {
  ifEveningUp: PropTypes.func,
  futureName: PropTypes.string,
  futureId: PropTypes.string,
  orderId: PropTypes.string,
  direction: PropTypes.string,
  time: PropTypes.string,
  price: PropTypes.string,
  num: PropTypes.string,
  originalPrice: PropTypes.string,
  minPriceChangeUnit: PropTypes.string,
  openPrice: PropTypes.string,
};

export default WaitingSure;
