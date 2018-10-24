import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Button from '../../components/Button/index';
import { px2dp } from '../../utils/px2dp';

export default class RealUserBtnGroup extends React.Component {
  render() {
    const { isRealAccount, btnOnPress } = this.props;
    return (
      <View style={styles.container}>
        <Button
          type="primary"
          text="真实账户"
          subStatus="enable"
          textStyle={styles.textStyle}
          containerStyle={[
            styles.btnWrapper,
            !isRealAccount && styles.unSelectedBtnStyle,
          ]}
          onPress={() => btnOnPress(1)}
        />
        <Button
          type="primary"
          text="模拟账户"
          subStatus="enable"
          textStyle={styles.textStyle}
          containerStyle={[
            styles.btnWrapper,
            isRealAccount && styles.unSelectedBtnStyle,
          ]}
          onPress={() => btnOnPress(0)}
        />
      </View>
    );
  }
}

RealUserBtnGroup.propTypes = {
  isRealAccount: PropTypes.bool,
  btnOnPress: PropTypes.func.isRequired,
};

RealUserBtnGroup.defaultProps = {
  isRealAccount: true,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnWrapper: {
    width: px2dp(160),
    height: px2dp(48),
    borderRadius: px2dp(24),
    marginRight: px2dp(32),
    marginLeft: 0,
  },
  textStyle: {
    fontSize: px2dp(28),
  },
  unSelectedBtnStyle: {
    opacity: 0.5,
  },
});
