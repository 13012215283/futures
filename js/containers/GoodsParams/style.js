import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  listContainer: {
    flex: 1,
    marginTop: px2dp(20),
    backgroundColor: colors.white,
  },

  itemContainer: {
    marginLeft: px2dp(20),
    marginRight: px2dp(20),
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors['1104'],
  },

  nameTextView: {
    width: px2dp(207),
    borderRightWidth: 1,
    borderColor: colors['1104'],
  },

  nameText: {
    margin: px2dp(20),
    fontSize: sizes.f1,
    color: colors['1102'],
    textAlign: 'left',
    lineHeight: sizes.f1 * 1.5,
  },

  paramsTextView: {
    flex: 1,
  },

  paramsText: {
    margin: px2dp(20),
    fontSize: sizes.f1,
    color: colors['1102'],
    textAlign: 'left',
    lineHeight: sizes.f1 * 1.5,
  },

  itemSeparate: {
    height: 1,
    marginLeft: px2dp(20),
    marginRight: px2dp(20),
    backgroundColor: colors['1104'],
  },

  sectionHeader: {
    marginLeft: px2dp(20),
    marginRight: px2dp(20),
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors['1104'],
    backgroundColor: colors.white,
  },

  sectionHeaderText: {
    margin: px2dp(20),
    fontSize: sizes.f1,
    color: colors['1101'],
    textAlign: 'left',
    lineHeight: sizes.f1 * 1.5,
    fontWeight: 'bold',
  },
});

export default styles;
