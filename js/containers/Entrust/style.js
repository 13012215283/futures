import { StyleSheet } from 'react-native';
import { px2dp } from '../../utils/px2dp';
import { colors, sizes } from '../../components/themes';
import { px2sp } from '../..//utils/px2sp';

const { white } = colors;
const { f1, f2, f4, f5 } = sizes;

const style = StyleSheet.create({
  container: {
    backgroundColor: colors[1105],
  },
  header: {
    height: px2dp(88),
    backgroundColor: colors['1001'],
    flexDirection: 'row',
    alignItems: 'center',
  },
  goBackView: {
    position: 'absolute',
    left: px2dp(32),
  },
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    color: white,
    fontSize: f4,
  },
  contentContainer: {
    backgroundColor: colors[1105],
    marginLeft: px2dp(32),
    marginRight: px2dp(32),
  },
  successInfo: {
    marginTop: px2dp(61),
    marginBottom: px2dp(61),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    fontFamily: 'iconfont',
    color: colors[1001],
    fontSize: px2sp(44),
    marginRight: px2dp(21.1),
  },
  successText: {
    fontSize: f5,
    color: colors[1101],
  },
  orderContainer: {
    backgroundColor: colors.white,
    paddingLeft: px2dp(27),
    paddingRight: px2dp(27),
    borderColor: colors[1104],
    borderWidth: StyleSheet.hairlineWidth,
  },
  productName: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors[1104],
    height: px2dp(100),
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: f1,
    color: colors[1101],
    fontWeight: 'bold',
    marginRight: px2dp(32),
  },
  itemContainer: {
    height: px2dp(88),
    flexDirection: 'row',
    marginTop: px2dp(21),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemType: {
    color: colors[1102],
    fontSize: f2,
  },
  itemInfo: {
    color: colors[1101],
    fontSize: f1,
    fontWeight: 'bold',
  },
});

export default style;
