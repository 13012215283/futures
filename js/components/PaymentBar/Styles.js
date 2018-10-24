import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';

const paymentBarStyle = {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: px2dp(100),
    bottom: 0,
    backgroundColor: colors.white,
  },

  paymentInfo: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  paymentButton: {
    height: px2dp(100),
    width: px2dp(300),
    backgroundColor: colors['1001'],
    justifyContent: 'center',
    alignSelf: 'center',
  },
  paymentButtonText: {
    color: colors.white,
    fontSize: sizes.f4,
    textAlign: 'center',
  },
  totalText: {
    color: colors['1001'],
    fontSize: sizes.f3,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fontSizeF5: {
    fontSize: sizes.f5,
  },
  subText: {
    color: colors['1102'],
    fontSize: sizes.f0,
    textAlign: 'center',
  },

  disabledBackgroundColor: {
    backgroundColor: colors['1103'],
  },
};

export default paymentBarStyle;
