import { StyleSheet } from 'react-native';

import { colors } from '../../themes';

const styles = StyleSheet.create({
  inputRectangle: {
    height: 50,
    flexDirection: 'column',
    borderBottomColor: colors['1104'],
    borderBottomWidth: 1,
  },
  inputValue: {
    paddingLeft: 5,
    paddingBottom: 3,
  },
});

export default styles;
