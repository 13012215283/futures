import { StyleSheet } from 'react-native';
import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  icon: {
    width: px2dp(140),
    height: px2dp(140),
    borderRadius: px2dp(8),
    backgroundColor: 'rgba(232,59,59,0.2)',
    marginTop: px2dp(32),
    marginBottom: px2dp(64),
    alignSelf: 'center',
  },
  inputItem: {
    marginTop: px2dp(20),
  },
  captcha: {
    height: px2dp(60),
    backgroundColor: colors['1001'],
    borderRadius: px2dp(4),
    justifyContent: 'center',
    marginBottom: px2dp(16),
    padding: px2dp(16),
  },
  captchaText: {
    fontSize: sizes.f1,
    color: colors.white,
    textAlign: 'center',
    includeFontPadding: false,
  },
  voiceCodeWrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: px2dp(64),
    marginTop: px2dp(12),
  },
  voiceCode: {
    fontSize: sizes.f0,
    textAlign: 'right',
  },
  voiceCodeBtn: {
    color: colors['1004'],
  },
  btnView: {
    marginTop: px2dp(32 * 7),
  },
  submitBtn: {
    backgroundColor: colors['1001'],
  },
  disabledSubmitBtn: {
    backgroundColor: colors['1103'],
  },
  activeSubmitBtn: {
    backgroundColor: colors['1001'],
  },
  agreement: {
    marginTop: px2dp(14),
  },
  agreementText: {
    fontSize: sizes.f0,
    color: colors['1103'],
    textAlign: 'center',
  },
  loginView: {
    marginTop: px2dp(140),
  },
  loginText: {
    fontSize: sizes.f1,
    color: colors['1004'],
    textAlign: 'center',
  },
  showPwd: {
    fontFamily: 'iconfont',
    color: colors['1004'],
    fontSize: px2dp(44),
  },
});
