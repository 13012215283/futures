import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';

/* eslint-disable global-require */
const imageMap = {
  inMoneyIcon: require('./images/rujin_icon.png'),
  outMoneyIcon: require('./images/chujin_icon.png'),
};

/* 入金、出金中显示银行的组件 */
function BankBar({ bankName, isInMoney, cardId, bankLogo }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.iconWrapper}
        source={imageMap[isInMoney ? 'inMoneyIcon' : 'outMoneyIcon']}
      />
      <View style={styles.infoWrapper}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            style={styles.bankWrapper}
            source={{
              uri: bankLogo,
            }}
          />
          <Text style={styles.title}> {bankName}</Text>
        </View>
        <Text style={styles.normalText}>尾号{cardId.slice(-4)}</Text>
      </View>
    </View>
  );
}

function BankRow({ bankName, cardId, bankLogo }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Image
        style={styles.bankWrapper}
        source={{
          uri: bankLogo,
        }}
      />
      <Text style={{ fontSize: sizes.f2, color: colors[1101] }}>
        {` ${bankName}`} (尾号{cardId})
      </Text>
    </View>
  );
}

BankBar.propTypes = {
  bankName: PropTypes.string.isRequired, // 银行名
  isInMoney: PropTypes.bool.isRequired, // 是否为入金
  cardId: PropTypes.string.isRequired, // 尾号
  bankLogo: PropTypes.string.isRequired, // 银行图标
};

BankRow.propTypes = {
  bankName: PropTypes.string.isRequired, // 银行名
  cardId: PropTypes.string.isRequired, // 尾号
  bankLogo: PropTypes.string.isRequired, // 银行图标
};

export { BankBar, BankRow };

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: px2dp(144),
    padding: px2dp(30),
    marginTop: px2dp(32),
    backgroundColor: colors.white,
    flexDirection: 'row',
  },
  iconWrapper: {
    width: px2dp(90),
    height: px2dp(90),
    borderRadius: px2dp(8),
  },
  bankWrapper: {
    width: px2dp(32),
    height: px2dp(32),
  },
  infoWrapper: {
    marginLeft: px2dp(32),
    height: px2dp(90),
  },
  title: {
    fontSize: sizes.f3,
    color: colors[1101],
    fontWeight: 'bold',
  },
  normalText: {
    fontSize: sizes.f2,
    color: colors[1102],
  },
});
