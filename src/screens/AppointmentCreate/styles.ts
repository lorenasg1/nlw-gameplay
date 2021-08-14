import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { theme } from '../../shared/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
  },
  form: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  select: {
    width: '100%',
    height: 68,
    flexDirection: 'row',
    borderColor: theme.colors.secondary50,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    paddingRight: 24,
    overflow: 'hidden',
  },
  selectBody: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 64,
    height: 68,
    backgroundColor: theme.colors.secondary40,
    borderWidth: 1,
    borderRadius: 8,
    borderBottomColor: theme.colors.secondary50,
  },
  field: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    marginRight: 4,
    fontSize: 15,
    fontFamily: theme.fonts.text500,
    color: theme.colors.highlight,
  },
  charLimit: {
    fontFamily: theme.fonts.text400,
    color: theme.colors.highlight,
    fontSize: 13,
  },
  footer: {
    marginTop: 24,
    marginBottom: 56,
  },
});
