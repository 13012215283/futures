import { StyleSheet } from 'react-native';

import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';

const { white, black } = colors;
const { f4 } = sizes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    width: '100%',
    height: 45,
    backgroundColor: colors[1001],
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlefont: {
    fontSize: f4,
    color: white,
  },
  inputArea: {
    position: 'absolute',
    width: '100%',
    height: 300,
    paddingLeft: 10,
    paddingRight: 10,
    top: 45,
  },
  inputBlock: {
    width: '100%',
    marginTop: 10,
    marginBottom: 5,
  },
  inputBTitle: {
    height: 25,
  },
  inputBText: {
    color: black,
    fontSize: f4,
  },
  nextBtn: {
    height: px2dp(96),
    marginTop: px2dp(80),
  },
});

export default styles;
