import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';
import { px2dp } from '../../utils/px2dp';
import { alpha } from '../../utils/color';
import { sizes, colors } from '../../components/themes';

export default class AccountToggleBar extends React.Component {
  render() {
    const {
      isLogin,
      telephone,
      uId,
      goAssetDetail,
      goLogin,
      isRealAccount,
    } = this.props;

    return (
      <View
        style={[styles.container, !isLogin ? { alignItems: 'center' } : {}]}
      >
        {!isLogin ? (
          <TouchableOpacity style={styles.loginBtnWrapper} onPress={goLogin}>
            <Text style={{ color: 'white', fontSize: sizes.f2 }}>请先登录</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.wrapper}>
            <View style={styles.profileWrapper}>
              <View style={styles.avatarWrapper}>
                <Text style={styles.iconFont}>&#xe801;</Text>
              </View>
              <View style={styles.messageWrapper}>
                <Text style={styles.textStyle}>
                  {`${telephone.slice(0, 3)}****${telephone.slice(-4)}`}
                </Text>
                <Text style={styles.textStyle}>{uId}</Text>
              </View>
            </View>
            {isRealAccount && (
              <TouchableOpacity
                style={styles.toggleBtn}
                onPress={goAssetDetail}
              >
                <Text style={styles.textStyle}>金额明细</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  }
}

AccountToggleBar.propTypes = {
  telephone: PropTypes.string, // 电话号码
  uId: PropTypes.string, // 用户uid
  isLogin: PropTypes.bool, // 用户是否登录
  goAssetDetail: PropTypes.func.isRequired, // 切换账户的函数
  goLogin: PropTypes.func.isRequired, // 跳到登录页
  isRealAccount: PropTypes.bool.isRequired, // 是否为真实账户
};
AccountToggleBar.defaultProps = {
  telephone: '',
  uId: '',
  isLogin: '',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: px2dp(160),
    backgroundColor: colors[1001],
    padding: px2dp(32),
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginBtnWrapper: {
    width: px2dp(200),
    height: px2dp(60),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: alpha(colors.white, 0.3),
    borderRadius: px2dp(30),
  },
  profileWrapper: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  avatarWrapper: {
    width: px2dp(80),
    height: px2dp(80),
    borderRadius: px2dp(40),
    borderWidth: px2dp(2),
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageWrapper: {
    marginLeft: px2dp(16),
  },
  toggleBtn: {
    width: px2dp(160),
    height: px2dp(48),
    borderRadius: px2dp(22),
    backgroundColor: alpha(colors.black, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconFont: {
    fontFamily: 'iconfont',
    color: colors.white,
    fontSize: px2dp(55),
  },
  textStyle: {
    color: colors.white,
    fontSize: sizes.f2,
  },
});
