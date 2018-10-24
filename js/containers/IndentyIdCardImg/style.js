import { StyleSheet, Dimensions } from 'react-native';

import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';

export default StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: px2dp(40),
    paddingLeft: px2dp(30),
    paddingRight: px2dp(30),
    height: Dimensions.get('window').height,
  },
  picRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  singlePic: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: px2dp(40),
  },
  nextBtn: {
    height: px2dp(96),
    width: px2dp(622),
    marginTop: px2dp(60),
    alignSelf: 'center',
  },
  warnTip: {
    width: px2dp(622),
    alignSelf: 'center',
    marginTop: px2dp(10),
  },
  warntext: {
    fontSize: sizes.f1,
    color: colors[1103],
    lineHeight: 20,
  },
});
