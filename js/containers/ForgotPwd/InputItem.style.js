import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';

export default {
  inputItem: {
    flexDirection: 'row',
    marginLeft: px2dp(64),
    marginRight: px2dp(64),
    borderBottomWidth: 1,
    borderBottomColor: colors['1104'],
    height: px2dp(104),
    alignItems: 'flex-end',
  },
  textView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
  },
  inputItemText: {
    fontSize: px2dp(sizes.f2 * 2),
    color: colors['1101'],
    width: px2dp(86),
    textAlign: 'left',
  },
  inputItemInput: {
    flex: 1,
    padding: 0,
    marginLeft: px2dp(16),
    fontSize: px2dp(sizes.f2 * 2),
  },
};
