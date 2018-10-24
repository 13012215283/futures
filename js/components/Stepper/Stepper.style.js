import { px2dp } from '../../utils/px2dp';
import { colors } from '../themes';

export default {
  stepWrap: {
    flexDirection: 'row',
  },
  stepButton: {
    width: px2dp(60),
    height: px2dp(60),
    borderWidth: 1,
    borderColor: colors['1001'],
    justifyContent: 'center',
    backgroundColor: '#rgba(232,59,59,0.2)',
  },
  stepText: {
    textAlign: 'center',
    color: colors['1001'],
    fontSize: px2dp(32),
  },
  inputItem: {
    marginLeft: px2dp(14),
    marginRight: px2dp(14),
  },
  disabledButton: {
    backgroundColor: 'rgba(189,189,189,0.2)',
    borderColor: colors['1103'],
    borderWidth: 1,
  },
  disabledText: {
    color: colors['1102'],
  },
  warningInput: {
    borderColor: '#ff0000',
  },
};
