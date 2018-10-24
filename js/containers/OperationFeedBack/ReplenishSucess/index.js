import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import Button from 'futures/components/Button';
import noop from 'futures/utils/noop';

import FeedBackHead from '../FeedBackHead';
import style from './style';

export default class ReplenishSucess extends Component {
  static defaultProps = {
    returnPosition: noop,
    checkDelyProgress: noop,
  };

  constructor(props) {
    super(props);

    this.returnPosition = this.returnPosition.bind(this);
    this.checkDelyProgress = this.checkDelyProgress.bind(this);
  }

  /** 返回持仓页面按钮点击事件 */
  returnPosition() {
    this.props.returnPosition();
  }

  /** 查看交割进度 */
  checkDelyProgress() {
    this.props.checkDelyProgress();
  }

  render() {
    return (
      <FeedBackHead title="补款成功">
        <View style={style.body}>
          <Text style={style.tip}>恭喜您支付成功！</Text>
          <Text style={style.tip}>平台会尽快审核您的支付详情</Text>
          <Text style={style.tip}>请随时关注您的审核进度</Text>
        </View>
        <View style={style.btnArea}>
          <Button
            type="primary"
            text="返回持仓"
            subStatus="enable"
            containerStyle={[style.btn, style.bgWhite]}
            textStyle={style.redFont}
            onPress={this.returnPosition}
          />
          <Button
            type="primary"
            text="查看交割进度"
            subStatus="enable"
            containerStyle={style.btn}
            onPress={this.checkDelyProgress}
          />
        </View>
      </FeedBackHead>
    );
  }
}

ReplenishSucess.propTypes = {
  returnPosition: PropTypes.func,
  checkDelyProgress: PropTypes.func,
};
