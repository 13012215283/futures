import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PieChart from 'react-native-pie-chart';

import PropTypes from 'prop-types';
import { alpha } from 'futures/utils/color';

import { px2dp } from '../../utils/px2dp';
import { sizes, colors } from '../../components/themes';
import { twoDecimal } from '../../utils/numberFormat';

const Button = ({ name, onPress, containerStyle }) => (
  <TouchableOpacity
    style={[styles.btnWrapper, containerStyle]}
    onPress={onPress}
  >
    <Text style={styles.btnText}>{name}</Text>
  </TouchableOpacity>
);
Button.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  /* eslint-disable react/forbid-prop-types */
  containerStyle: PropTypes.object,
};
Button.defaultProps = {
  containerStyle: {},
};

const colorScale = ['#F7A35C', '#7CB5EC'];
export default class DetailPanel extends React.Component {
  static isArrayAllZero(arr) {
    // 判断数组中的数是否全部为0
    for (let i = 0; i < arr.length; i += 1) {
      if (parseInt(arr[i], 10) !== 0) return false;
    }
    return true;
  }

  static elementsToNumber(arr) {
    return arr.map(a => Number(a));
  }

  static propTypes = {
    // deposits: PropTypes.func.isRequired, // 入金
    // withdraw: PropTypes.func.isRequired, // 出金
    pureAmount: PropTypes.string.isRequired, // 净值
    usedAmount: PropTypes.string.isRequired, // 已用金额
    avaliableAmount: PropTypes.string.isRequired, // 可用
    totalAmount: PropTypes.string.isRequired, // 总盈亏
    isLogin: PropTypes.bool.isRequired, // 用户是否登陆
    isRealAccount: PropTypes.bool.isRequired,
    btnEvents: PropTypes.arrayOf(PropTypes.func.isRequired).isRequired,
  };

  render() {
    const {
      pureAmount,
      usedAmount,
      avaliableAmount,
      totalAmount,
      isLogin,
      isRealAccount,
      btnEvents,
    } = this.props;

    const amountData = [usedAmount, avaliableAmount];
    const legendData = isLogin ? amountData : [0, 0];
    const chartData = DetailPanel.isArrayAllZero(amountData)
      ? [1, 1]
      : DetailPanel.elementsToNumber(amountData);
    const lengendSet = [
      { name: '已 用', color: '#F7A35C' },
      { name: '可 用', color: '#7CB5EC' },
    ];
    const literalWords = [
      { name: '净 值', value: pureAmount },
      { name: '总盈亏', value: totalAmount },
    ];
    return (
      <View style={styles.box}>
        <View style={styles.constainer}>
          <Text style={styles.title}>可用金额</Text>
          <View style={styles.moneyWrapper}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={{ marginRight: px2dp(24) }}>
                <Text style={{ color: colors[1101], fontSize: sizes.f6 }}>
                  ¥
                </Text>
              </View>
              <View>
                <Text style={{ color: colors[1101], fontSize: sizes.f5 }}>
                  {isLogin ? avaliableAmount : 0}
                </Text>
              </View>
            </View>
            <View />
            {isRealAccount ? (
              <View style={styles.btnGroupWrapper}>
                <Button name="出金" onPress={btnEvents[1]} />
                <Button name="入金" onPress={btnEvents[0]} />
              </View>
            ) : (
              <View style={styles.btnGroupWrapper}>
                <Button
                  name="资金明细"
                  onPress={btnEvents[0]}
                  containerStyle={{ width: px2dp(180) }}
                />
                <Button name="重置" onPress={btnEvents[1]} />
              </View>
            )}
          </View>
          <View style={styles.pieChartContainer}>
            <View style={{ flex: 1 }}>
              <PieChart
                chart_wh={px2dp(256)}
                series={chartData}
                sliceColor={colorScale}
                doughnut
                coverRadius={0.58}
                coverFill="#FFF"
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
            >
              {legendData.map((data, index) => (
                <LegendRow
                  title={lengendSet[index].name}
                  color={lengendSet[index].color}
                  value={data}
                  index={index}
                  key={lengendSet[index].name}
                />
              ))}
            </View>
          </View>
        </View>
        <View style={styles.lineContainer}>
          {literalWords.map((v, k) => (
            <View
              key={v.name}
              style={{
                flexDirection: 'row',
                width: '50%',
                marginRight: px2dp(10),
                justifyContent: 'space-between',
              }}
            >
              <LiteralWord title={v.name} value={twoDecimal(v.value)} />
              {k === literalWords.length - 1 ? null : (
                <View style={styles.line} />
              )}
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const LegendRow = ({ title, value, color, index }) => {
  const transColor = v => {
    if (Number(v) === 0) return colors[1101];
    return colors[Number(v) > 0 ? 1001 : 1002];
  };

  const transText = v => {
    if (Number(v) === 0) return v;
    return index === 3 ? (Number(v) > 0 ? '+' : '') + v : v;
  };

  return (
    <View style={styles.legendRow}>
      <View style={[styles.square, { backgroundColor: color }]} />
      <View style={{ width: px2dp(90), marginRight: px2dp(43) }}>
        <Text style={{ fontSize: sizes.f2 }}>{title}</Text>
      </View>
      <View style={{}}>
        <Text
          style={{
            fontSize: sizes.f2,
            color: index === 3 ? transColor(value) : colors[1101],
          }}
        >
          {transText(twoDecimal(value))}
        </Text>
      </View>
    </View>
  );
};
LegendRow.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const LiteralWord = ({ title, value }) => (
  <View style={styles.LiteralWord}>
    <Text style={styles.literalKey}>{title}</Text>
    <Text style={styles.literalValue}>{value}</Text>
  </View>
);
LiteralWord.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.white,
  },
  constainer: {
    marginTop: px2dp(19),
    paddingTop: px2dp(32),
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
  },
  moneyWrapper: {
    borderBottomWidth: px2dp(1),
    borderBottomColor: colors[1105],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: px2dp(32),
  },
  btnGroupWrapper: {
    flexDirection: 'row',
  },
  btnWrapper: {
    width: px2dp(140),
    height: px2dp(60),
    borderWidth: px2dp(1),
    borderColor: colors[1001],
    borderRadius: px2dp(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: px2dp(16),
  },
  btnText: {
    fontSize: sizes.f3,
    color: colors[1001],
  },
  title: {
    color: colors[1102],
    fontSize: sizes.f2,
  },
  /* 圆环 */
  pieChartContainer: {
    padding: px2dp(32),
    flexDirection: 'row',
  },
  pieWrapper: {
    width: px2dp(342),
    height: px2dp(256),
  },
  square: {
    width: px2dp(16),
    height: px2dp(16),
    marginRight: px2dp(16),
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: px2dp(15),
  },
  lineContainer: {
    height: px2dp(80),
    borderColor: alpha('#11aaac', 0.5),
    borderLeftWidth: px2dp(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  /* 文字组件 */
  LiteralWord: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  line: {
    width: StyleSheet.hairlineWidth,
    height: px2dp(40),
    backgroundColor: colors[1105],
  },
  literalKey: {
    textAlign: 'center',
    fontSize: sizes.f2,
    color: colors[1102],
    marginRight: px2dp(30),
  },
  literalValue: {
    textAlign: 'center',
    fontSize: sizes.f2,
    color: colors[1101],
  },
});
