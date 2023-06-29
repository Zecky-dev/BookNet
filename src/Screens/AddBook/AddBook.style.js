import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';

export default StyleSheet.create({
  container: {
    padding: 12,
  },
  label: {
    marginBottom: 4,
    color: colors.black,
  },
  picker: {
    inner: {
      backgroundColor: colors.white,
    },
  },
  rating: {
    label: {
      marginBottom: 8,
      textAlign: 'center',
      fontSize: 18,
      color: colors.black,
    },
  },
  image: {
    width: 100,
    height: 100,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
});
