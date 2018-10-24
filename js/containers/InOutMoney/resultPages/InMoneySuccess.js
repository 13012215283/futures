// 入金成功
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';
import Button from 'futures/components/Button';
import { BankRow } from '../BankComponent';

const Row = ({ text, title }) => (
  <View style={styles.row}>
    <Text style={{ fontSize: sizes.f2, color: colors[1102] }}>{title}</Text>
    <Text
      style={{ fontSize: sizes.f2, color: colors[1101], fontWeight: 'bold' }}
    >
      {text}
    </Text>
  </View>
);

export default class InMoneySuccess extends React.Component {
  render() {
    const {
      bankName,
      cardId,
      inMoneyValue,
      avaliableMoney,
      time,
      bankLogo,
    } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          <Text
            style={{
              color: colors[1001],
              fontFamily: 'iconfont',
            }}
          >
            &#xe6d6;
          </Text>
          <Text> 恭喜你，入金成功!</Text>
        </Text>
        <View style={styles.infoWrapper}>
          <View
            style={{
              height: px2dp(100),
              justifyContent: 'center',
              borderBottomColor: colors[1104],
              borderBottomWidth: 1,
            }}
          >
            <BankRow
              cardId={cardId.slice(-4)}
              bankName={bankName}
              bankLogo={bankLogo}
            />
          </View>
          <View style={{ marginTop: px2dp(16) }}>
            <Row title="入金时间" text={time} />
            <Row title="入金金额" text={`￥${inMoneyValue}`} />
            <Row title="当前可用金额" text={`￥ ${avaliableMoney}`} />
          </View>
        </View>
        <Button
          text="完 成"
          type="primary"
          subStatus="enable"
          containerStyle={{
            marginLeft: 0,
            marginRight: 0,
            marginTop: px2dp(64),
          }}
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

InMoneySuccess.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  navigation: PropTypes.object.isRequired,
};

Row.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: px2dp(32),
    backgroundColor: colors[1105],
  },
  title: {
    fontSize: sizes.f5,
    color: colors[1101],
    textAlign: 'center',
  },
  infoWrapper: {
    width: px2dp(686),
    height: px2dp(397),
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
    marginTop: px2dp(60),
    backgroundColor: colors.white,
  },
  bankWrapper: {
    height: px2dp(100),
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors[1104],
  },
  row: {
    flexDirection: 'row',
    height: px2dp(88),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
