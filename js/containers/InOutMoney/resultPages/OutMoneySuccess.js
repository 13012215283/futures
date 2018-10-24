// 入金成功
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';
import Button from 'futures/components/Button';

export default class OutMoneySuccess extends React.Component {
  render() {
    const { uId } = this.props.navigation.state.params;
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
          <Text> 提交成功!</Text>
        </Text>
        <View style={styles.infoWrapper}>
          <Text style={{ fontSize: sizes.f3 }}>已完成出金申请</Text>
          <Text style={{ fontSize: sizes.f3 }}>可在“出金进度”中查看</Text>
        </View>
        <View style={styles.btnGroup}>
          <Button
            type="primary"
            subStatus="enable"
            text="返回"
            containerStyle={[
              styles.btnWrapper,
              {
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors[1001],
              },
            ]}
            textStyle={{ color: colors[1001] }}
            onPress={() => this.props.navigation.navigate('MyAccountIndex')}
          />
          <Button
            type="primary"
            subStatus="enable"
            text="查看出金进度"
            containerStyle={styles.btnWrapper}
            onPress={() =>
              this.props.navigation.navigate('OutMoneyProgress', { uId })
            }
          />
        </View>
      </View>
    );
  }
}

OutMoneySuccess.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  navigation: PropTypes.object.isRequired,
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
    height: px2dp(205),
    backgroundColor: colors.white,
    marginTop: px2dp(62),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGroup: {
    flex: 1,
    flexDirection: 'row',
  },
  btnWrapper: {
    width: px2dp(280),
    height: px2dp(96),
    marginLeft: px2dp(32),
    marginRight: px2dp(32),
  },
});
