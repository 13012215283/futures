import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';
import { px2sp } from 'futures/utils/px2sp';

const tailPaymentSuccessStyles = {
  container: {
    flex: 1,
    backgroundColor: colors['1105'],
  },

  iconTitleContent: {
    flexDirection: 'row',
    marginTop: px2dp(51),
    justifyContent: 'center',
  },

  successIcon: {
    fontFamily: 'iconfont',
    color: colors[1001],
    fontSize: px2sp(44),
  },

  titleText: {
    color: colors['1101'],
    fontSize: sizes.f5,
  },

  content: {
    backgroundColor: colors.white,
    marginTop: px2dp(60),
    marginLeft: px2dp(32),
    marginRight: px2dp(32),
    height: px2dp(254),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors['1104'],
  },

  contentText: {
    color: colors['1102'],
    fontSize: sizes.f3,
    textAlign: 'center',
    lineHeight: px2dp(24) + sizes.f3,
  },

  buttonsContainer: {
    marginTop: px2dp(66),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  returnToPosition: {
    height: px2dp(96),
    width: px2dp(280),
    borderRadius: px2dp(8),
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors['1001'],
  },
  deliverySchedule: {
    height: px2dp(96),
    width: px2dp(280),
    borderRadius: px2dp(8),
    justifyContent: 'center',
    backgroundColor: colors['1001'],
  },
  returnToPositionText: {
    fontSize: sizes.f3,
    color: colors['1001'],
    textAlign: 'center',
  },
  deliveryScheduleText: {
    fontSize: sizes.f3,
    color: colors.white,
    textAlign: 'center',
  },
};

export default tailPaymentSuccessStyles;
