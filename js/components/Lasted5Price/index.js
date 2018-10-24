import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import equal from 'fast-deep-equal';

import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';

// @flow
type Props = {
  textViewStyle?: Object,
  titleStyle?: Object,
  priceStyle?: Object,
  volumeStyle?: Object,
  dealArr: Array,
  direction: 'GoLong' | 'GoShort',
  yesterdayBalance: number,
  isReverse?: boolean,
};

// const noopArray = Array(5).fill({ num: 0, price: 0 });

export default class Lasted5Price extends Component<Props> {
  static compareVal(a, b) {
    let color;
    if (Number.isNaN(+a)) {
      return styles.whiteText;
    }
    if (a > b) {
      color = styles.redText;
    } else if (a === b) {
      color = styles.whiteText;
    } else {
      color = styles.greenText;
    }
    return color;
  }

  static defaultProps = {
    direction: 'GoLong',
    isReverse: false,
  };

  constructor(props) {
    super(props);
    let { dealArr } = props;
    while (dealArr.length < 5) {
      dealArr = dealArr.concat({ num: '-', price: '-' });
    }
    this.state = {
      dealArr,
    };
  }

  componentWillReceiveProps(nextProps) {
    let { dealArr } = nextProps;
    while (dealArr.length < 5) {
      dealArr = dealArr.concat({ num: '-', price: '-' });
    }
    if (!equal(this.state.dealArr, dealArr)) {
      this.setState({ dealArr });
    }
  }

  lastedDealView(price, position, direction, index) {
    const { textViewStyle, titleStyle, priceStyle, volumeStyle } = this.props;
    const { yesterdayBalance } = this.props;
    const priceColor = Lasted5Price.compareVal(
      Number(price),
      Number(yesterdayBalance)
    );
    return (
      <View style={[styles.textView, textViewStyle]} key={index}>
        <Text style={[styles.deal, titleStyle]}>{direction}</Text>
        <Text style={[styles.price, styles.goLong, priceStyle, priceColor]}>
          {Number.isNaN(Number(price)) ? '-' : Number(price)}
        </Text>
        <Text style={[styles.volume, volumeStyle]}>
          {Math.abs(position) || '-'}
        </Text>
      </View>
    );
  }

  order() {
    const { direction } = this.props;
    const { dealArr } = this.state;
    return dealArr.map((item, index) => {
      const directionText = direction === 'GoLong' ? '买' : '卖';
      return this.lastedDealView(
        item.price,
        item.num,
        `${directionText}${index + 1}`,
        index
      );
    });
  }

  reverse() {
    const { direction } = this.props;
    const { dealArr } = this.state;
    return dealArr.reverse().map((item, index) => {
      const directionText = direction === 'GoLong' ? '买' : '卖';
      return this.lastedDealView(
        item.price,
        item.num,
        `${directionText}${5 - index}`,
        index
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.isReverse ? this.reverse() : this.order()}
      </View>
    );
  }
}

const YELLOW = '#ffff00';

const styles = StyleSheet.create({
  container: {
    // paddingBottom: px2dp(20),
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20),
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: px2dp(60),
    alignItems: 'center',
  },
  deal: {
    fontSize: sizes.f2,
    color: colors['1102'],
    flex: 1,
  },
  price: {
    fontSize: sizes.f2,
    flex: 3,
  },
  goLong: {
    color: colors['1001'],
  },
  goShort: {
    color: colors['1002'],
  },
  volume: {
    fontSize: sizes.f2,
    color: colors['1102'],
    flex: 1,
  },
  redText: {
    color: colors['1001'],
  },
  yellowText: {
    color: YELLOW,
  },
  whiteText: {
    color: colors.white,
  },
  greenText: {
    color: colors['1002'],
  },
  greyText: {
    color: colors['1103'],
  },
});
