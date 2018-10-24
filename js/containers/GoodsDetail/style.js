import { StyleSheet } from 'react-native';
import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  nameText: {
    marginTop: px2dp(20),
    marginLeft: px2dp(28),
    marginRight: px2dp(28),
    fontSize: sizes.f3,
    fontWeight: 'bold',
    color: colors['1101'],
  },

  configurationText: {
    marginTop: px2dp(15),
    marginLeft: px2dp(28),
    marginRight: px2dp(28),
    fontSize: sizes.f3,
    fontWeight: 'bold',
    color: colors['1101'],
  },

  detialsText: {
    marginTop: px2dp(15),
    marginLeft: px2dp(28),
    marginRight: px2dp(28),
    lineHeight: sizes.f2 * 1.5,
    fontSize: sizes.f2,
    color: colors['1102'],
  },

  priceContainer: {
    marginTop: px2dp(20),
    marginLeft: px2dp(28),
    marginRight: px2dp(28),
    flexDirection: 'row',
    alignItems: 'center',
  },

  priceText: {
    marginLeft: 0,
    fontSize: sizes.f5,
    fontWeight: 'bold',
    color: colors['1001'],
  },

  noticeContainer: {
    marginLeft: 10,
    height: px2dp(30),
    backgroundColor: colors['1001'],
    borderRadius: px2dp(4),
    justifyContent: 'center',
  },

  noticeText: {
    fontSize: sizes.f0,
    color: colors.white,
    textAlign: 'center',
    marginLeft: px2dp(8),
    marginRight: px2dp(8),
  },

  separateLine: {
    backgroundColor: colors['1104'],
    height: px2dp(1),
    marginLeft: 0,
    marginRight: 0,
    marginTop: px2dp(20),
  },

  separateView: {
    height: px2dp(26),
    marginLeft: 0,
    marginRight: 0,
    marginTop: px2dp(34),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  separateViewLine: {
    backgroundColor: colors['1104'],
    height: px2dp(1),
    width: px2dp(262),
  },

  commodifyInfoText: {
    fontSize: sizes.f1,
    color: colors['1102'],
    textAlign: 'center',
  },

  imagesContainer: {
    marginTop: px2dp(20),
    marginLeft: 0,
    marginRight: 0,
  },
});
