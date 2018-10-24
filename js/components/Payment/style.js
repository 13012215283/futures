import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';

const purchasePaymentStyle = {
  headerStyle: {
    height: px2dp(116),
    borderBottomWidth: px2dp(1),
    borderBottomColor: colors[1104],
  },
  headerFont: {
    fontSize: sizes.f2,
    fontWeight: 'bold',
  },
  containerStyle: {
    height: px2dp(88),
    backgroundColor: colors.white,
    paddingLeft: 0,
    paddingRight: 0,
  },
  nameText: {
    fontSize: sizes.f2,
    color: colors[1102],
  },
  valueText: {
    fontSize: sizes.f2,
    color: colors.black,
    fontWeight: 'bold',
  },
};

export default purchasePaymentStyle;
