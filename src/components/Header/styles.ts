import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { theme } from '../../shared/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 84,
    paddingTop: getStatusBarHeight(),
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.title700,
    fontSize: 20,
    color: theme.colors.heading,
  },
});
