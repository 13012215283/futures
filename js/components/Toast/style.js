import { StyleSheet } from 'react-native';
import color from 'futures/components/themes/colors';
import sizes from 'futures/components/themes/sizes';

export default StyleSheet.create({
  toastContainer: {
    backgroundColor: color.black,
    alignItems: 'center',
  },
  toastText: {
    color: color.white,
    fontSize: sizes.f1,
  },
});
